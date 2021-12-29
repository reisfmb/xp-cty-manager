import Vue from 'vue';
import vuetify from './plugins/vuetify';
import store from './store/index';
import App from './App.vue';
import * as gf from './util/globalFunctions';

Vue.config.productionTip = false;
Vue.prototype.$gf = gf;

new Vue({
  render: (h) => h(App),
  vuetify,
  store,
}).$mount('#app');
