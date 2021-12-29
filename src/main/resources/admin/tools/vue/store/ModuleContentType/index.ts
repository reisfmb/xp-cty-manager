import * as xml2jsonConverter from '@reginaldlee/xml-js';
import * as R from 'ramda';
import { getStoreAccessors } from 'vuex-typescript';
import { ActionContext } from 'vuex';
import { IRootState } from '../rootState';
import { IContentType, IState } from './types';

type ModuleContentTypeContext = ActionContext<IState, IRootState>;

const initialStateValues: IState = {
  contentType: null,
};

const getters = {
  getContentTypeByPath: (state: IState) => (path: string[] = []) => {
    if (!state.contentType) { return null; }
    return R.view(R.lensPath(path), state.contentType);
  },

};

const mutations = {
  setContentType(state: IState, contentType: IContentType) {
    state.contentType = contentType;
  },
  resetContentType(state: IState) {
    state.contentType = null;
  },
};

const actions = {
  setContentTypeFromXmlString(context: ModuleContentTypeContext, contentTypeAsXmlString: string) {
    const contentType = xml2jsonConverter.xml2js(contentTypeAsXmlString, { compact: false });
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

const { read, commit, dispatch } = getStoreAccessors<IState, IRootState>('ModuleContentType');

// Getters ( read )
export const getContentTypeByPath = read(ModuleContentType.getters.getContentTypeByPath);

// Mutations ( commit )
export const resetContentType = commit(ModuleContentType.mutations.resetContentType);

// Actions ( dispatch )
export const setContentTypeFromXmlString = dispatch(ModuleContentType.actions.setContentTypeFromXmlString);
