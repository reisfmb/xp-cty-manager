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
};

const mutations = {
  setContentType(state: IState, contentType: IContentType) {
    state.contentType = contentType;
  },
  resetContentType(state: IState) {
    state.contentType = RawSchemas.ContentType;
  },
  setContentTypeByPath(
    state: IState,
    data: { path: (string | number)[]; value: IAllowedValuesToBeAdded }
  ) {
    state.contentType = R.set(
      R.lensPath(data.path),
      data.value,
      state.contentType
    );
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

// Mutations ( commit )
export const resetContentType = commit(
  ModuleContentType.mutations.resetContentType
);
export const setContentTypeByPath = commit(
  ModuleContentType.mutations.setContentTypeByPath
);

// Actions ( dispatch )
export const setContentTypeFromXmlString = dispatch(
  ModuleContentType.actions.setContentTypeFromXmlString
);
