import * as ModuleFileHandle from './ModuleFileHandle/types';
import * as ModuleContentType from './ModuleContentType/types';

export interface IRootState {
  ModuleFileHandleTypes: ModuleFileHandle.IState
  ModuleContentTypeTypes: ModuleContentType.IState
}
