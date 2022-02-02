import { IGf } from './util/globalFunctions';

declare module 'vue/types/vue' {
    // eslint-disable-next-line no-unused-vars
    interface Vue { $gf: IGf }
}
