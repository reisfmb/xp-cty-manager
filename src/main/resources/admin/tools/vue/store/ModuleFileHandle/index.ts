import { getStoreAccessors } from "vuex-typescript";
import { ModuleContentType } from "../ModuleContentType";
// import { ActionContext } from 'vuex';
import { IRootState } from "../rootState";
import { IState } from "./types";

// type ModuleFileHandleContext = ActionContext<IState, IRootState>;

const initialStateValues: IState = {
  dirHandle: null,
  fileHandle: null,
};

const getters = {
  getFileHandle(state: IState) {
    return state.fileHandle;
  },
};

const mutations = {
  setFileHandle(state: IState, fileHandle: FileSystemFileHandle) {
    state.fileHandle = fileHandle;
  },
  resetFileHandle(state: IState) {
    state.fileHandle = null;
  },
};

const actions = {};

export const ModuleFileHandle = {
  namespaced: true,
  state: initialStateValues,
  getters,
  mutations,
  actions,
};

const { read, commit } = getStoreAccessors<IState, IRootState>(
  "ModuleFileHandle"
);

// Getters ( read )
export const getFileHandle = read(ModuleFileHandle.getters.getFileHandle);

// Mutations ( commit )
export const setFileHandle = commit(ModuleFileHandle.mutations.setFileHandle);
export const resetFileHandle = commit(
  ModuleFileHandle.mutations.resetFileHandle
);

// Actions ( dispatch )
