import { IGf } from './util/globalFunctions';

declare module "vue/types/vue" {
    interface Vue { $gf: IGf }
}