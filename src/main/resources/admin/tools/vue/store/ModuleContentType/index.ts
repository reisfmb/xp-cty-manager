import xmlBeautifier from "../../util/xmlBeautifier";
import * as xml2jsonConverter from "@reginaldlee/xml-js";
import * as R from "ramda";
import RawSchemas from "../../util/rawSchemas";
import { getStoreAccessors } from "vuex-typescript";
import { ActionContext } from "vuex";
import { IRootState } from "../rootState";
import { IContentType, IState, IAllowedValuesToBeAdded } from "./types";

type ModuleContentTypeContext = ActionContext<IState, IRootState>;

const initialStateValues: IState = {
  contentTypeAfterLastSave: null,
  contentType: null,
};

const getters = {
  getContentTypeByPath:
    (state: IState) =>
    (path: (string | number)[] = []) => {
      if (!state.contentType) {
        return null;
      }
      return R.view(R.lensPath(path), state.contentType);
    },
  getContentTypeAsXmlString(state: IState): string | null {
    return state.contentType
      ? xmlBeautifier(xml2jsonConverter.js2xml(state.contentType))
      : null;
  },
  getContentTypeDisplayName(state: IState): string | null {
    const ctyElements: Array<xml2jsonConverter.Element> = R.view(
      R.lensPath(["elements", 0, "elements"]),
      state.contentType
    );

    const displayNameElement = ctyElements.find(
      (el: xml2jsonConverter.Element) => {
        return el.name === "display-name";
      }
    );

    return (
      ((displayNameElement || {}).elements || [{}])[0].text?.toString() || null
    );
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
      action?: "ADDING-NEW-SCHEMA";
    }
  ) {
    if (data.action === "ADDING-NEW-SCHEMA") {
      data.value = renameNameAttributeIfNeeded(
        JSON.stringify(state.contentType),
        data.value
      );
    }

    state.contentType = R.set(
      R.lensPath(data.path),
      data.value,
      state.contentType
    );
  },
  resetContentType(state: IState) {
    state.contentType = RawSchemas.ContentType;
  },
};

const actions = {
  setContentTypeFromXmlString(
    context: ModuleContentTypeContext,
    contentTypeAsXmlString: string
  ) {
    const contentType = xml2jsonConverter.xml2js(contentTypeAsXmlString, {
      compact: false,
    });
    context.commit("setContentType", contentType);
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
  "ModuleContentType"
);

// Getters ( read )
export const getContentTypeByPath = read(
  ModuleContentType.getters.getContentTypeByPath
);
export const getContentTypeAsXmlString = read(
  ModuleContentType.getters.getContentTypeAsXmlString
);
export const getContentTypeDisplayName = read(
  ModuleContentType.getters.getContentTypeDisplayName
);
export const isContentTypeSameAsContentTypeAfterLastSave = read(
  ModuleContentType.getters.isContentTypeSameAsContentTypeAfterLastSave
);

// Mutations ( commit )
export const resetContentType = commit(
  ModuleContentType.mutations.resetContentType
);
export const setContentTypeByPath = commit(
  ModuleContentType.mutations.setContentTypeByPath
);
export const setContentTypeAfterLastSave = commit(
  ModuleContentType.mutations.setContentTypeAfterLastSave
);

// Actions ( dispatch )
export const setContentTypeFromXmlString = dispatch(
  ModuleContentType.actions.setContentTypeFromXmlString
);

// Helpers

// Will rename name attribute of an element if needed using counters.
function renameNameAttributeIfNeeded(
  ctyAsString: string,
  value: IAllowedValuesToBeAdded
) {
  if (value && Array.isArray(value) && value.length > 0) {
    const lastIndex = value.length - 1;
    let lastElement = R.view(R.lensIndex(lastIndex), value);
    const schemaAttributeName =
      (lastElement.attributes || {}).name?.toString() || "";

    if (
      schemaAttributeName &&
      ctyAsString.indexOf(schemaAttributeName) !== -1 &&
      lastElement.attributes
    ) {
      const counter =
        ctyAsString.split(`"name":"${schemaAttributeName}`).length - 1;
      const newName = `${schemaAttributeName}-${counter + 1}`;
      lastElement = R.set(
        R.lensPath(["attributes", "name"]),
        newName,
        lastElement
      );
    }

    value = value.map((el: xml2jsonConverter.Element, index: number) =>
      index === lastIndex ? lastElement : el
    );
  }
  return value;
}
