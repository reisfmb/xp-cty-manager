import * as xml2jsonConverter from '@reginaldlee/xml-js';
import { Element } from '@reginaldlee/xml-js';
import * as R from 'ramda';
import { getStoreAccessors } from 'vuex-typescript';
import { ActionContext } from 'vuex';
import RawSchemas from '../../util/rawSchemas';
import xmlBeautifier from '../../util/xmlBeautifier';
import { IRootState } from '../rootState';
import { IContentType, IState, IAllowedValuesToBeAdded } from './types';
import { sanitizeXml } from '../../util/helpers';

type ModuleContentTypeContext = ActionContext<IState, IRootState>;

const initialStateValues: IState = {
  contentTypeAfterLastSave: null,
  contentType: null,
};

const getters = {
  getContentTypeByPath:
    (state: IState) => (path: (string | number)[] = []) => {
      if (!state.contentType) {
        return null;
      }
      return R.view(R.lensPath(path), state.contentType);
    },
  getContentTypeAsXmlString(state: IState): string | null {
    return state.contentType
      ? R.pipe(
        xml2jsonConverter.js2xml,
        sanitizeXml,
        xmlBeautifier,
      )(state.contentType, { fullTagEmptyElement: true })
      : null;
  },
  getContentTypeDisplayName(state: IState): string | null {
    const ctyElements: Array<Element> = R.view(
      R.lensPath(['elements', 0, 'elements']),
      state.contentType,
    );

    const displayNameElement = ctyElements.find(
      (el: Element) => el.name === 'display-name',
    );

    return (
      ((displayNameElement || {}).elements || [{}])[0].text?.toString() || null
    );
  },
  isContentTypeEmpty(state: IState): boolean {
    return state.contentType === null;
  },
  isContentTypeSameAsContentTypeAfterLastSave(state: IState): boolean {
    return R.equals(state.contentType, state.contentTypeAfterLastSave);
  },
};

const mutations = {
  setContentType(state: IState, contentType: IContentType) {
    state.contentType = null;
    setTimeout(() => {
      state.contentType = contentType;
    }, 100);
  },
  setContentTypeAfterLastSave(state: IState) {
    state.contentTypeAfterLastSave = { ...state.contentType };
  },
  setContentTypeByPath(
    state: IState,
    data: {
      path: (string | number)[];
      value: IAllowedValuesToBeAdded;
      action?: 'ADDING-NEW-SCHEMA' | 'DUPLICATING-SCHEMA';
      duplicatedIndex?: number;
    },
  ) {
    if (
      data.action === 'ADDING-NEW-SCHEMA'
      || data.action === 'DUPLICATING-SCHEMA'
    ) {
      // eslint-disable-next-line no-use-before-define
      data.value = renameNameAttributeIfNeeded(
        JSON.stringify(state.contentType),
        data.value,
        data.duplicatedIndex,
      );
    }

    state.contentType = R.set(
      R.lensPath(data.path),
      data.value,
      state.contentType,
    );
  },
  resetContentType(state: IState) {
    state.contentType = RawSchemas.ContentType;
  },
};

const actions = {
  setContentTypeFromXmlString(
    context: ModuleContentTypeContext,
    contentTypeAsXmlString: string,
  ) {
    const contentType = xml2jsonConverter.xml2js(contentTypeAsXmlString, {
      compact: false,
    });
    context.commit('setContentType', contentType);
  },
};

export const ModuleContentType = {
  namespaced: true,
  state: initialStateValues,
  getters,
  mutations,
  actions,
};

const { read, commit, dispatch } = getStoreAccessors<IState, IRootState>(
  'ModuleContentType',
);

// Getters ( read )
export const getContentTypeByPath = read(
  ModuleContentType.getters.getContentTypeByPath,
);
export const getContentTypeAsXmlString = read(
  ModuleContentType.getters.getContentTypeAsXmlString,
);
export const getContentTypeDisplayName = read(
  ModuleContentType.getters.getContentTypeDisplayName,
);
export const isContentTypeEmpty = read(
  ModuleContentType.getters.isContentTypeEmpty,
);
export const isContentTypeSameAsContentTypeAfterLastSave = read(
  ModuleContentType.getters.isContentTypeSameAsContentTypeAfterLastSave,
);

// Mutations ( commit )
export const resetContentType = commit(
  ModuleContentType.mutations.resetContentType,
);
export const setContentTypeByPath = commit(
  ModuleContentType.mutations.setContentTypeByPath,
);
export const setContentTypeAfterLastSave = commit(
  ModuleContentType.mutations.setContentTypeAfterLastSave,
);

// Actions ( dispatch )
export const setContentTypeFromXmlString = dispatch(
  ModuleContentType.actions.setContentTypeFromXmlString,
);

// Helpers

// Will rename name attribute of an element if needed using counters.
function renameNameAttributeIfNeeded(
  ctyAsString: string,
  value: IAllowedValuesToBeAdded,
  duplicatedIndex?: number,
) {
  if (value && Array.isArray(value) && value.length > 0) {
    const idx = duplicatedIndex || value.length - 1;
    let desiredElement = R.view(R.lensIndex(idx), value);
    const schemaAttributeName = (desiredElement.attributes || {}).name?.toString() || '';

    if (
      schemaAttributeName
      && ctyAsString.indexOf(schemaAttributeName) !== -1
      && desiredElement.attributes
    ) {
      const counter = ctyAsString.split(`"name":"${schemaAttributeName}`).length - 1;
      const newName = `${schemaAttributeName}-${counter + 1}`;
      desiredElement = R.set(
        R.lensPath(['attributes', 'name']),
        newName,
        desiredElement,
      );
    }

    value = value.map((el: Element, index: number) => (index === idx ? desiredElement : el));
  }
  return value;
}
