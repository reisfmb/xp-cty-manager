import Vue from 'vue';
import Vuex from 'vuex';

import { IRootState } from './rootState';
import { ModuleFileHandle } from './ModuleFileHandle';
import { ModuleContentType } from './ModuleContentType';

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
  modules: { ModuleFileHandle, ModuleContentType },
});
