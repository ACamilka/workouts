import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import UUID from "vue-uuid";
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import store from './store'
import router from './router'

Vue.use(VueAxios, axios);
Vue.use(ElementUI, { locale });
Vue.use(UUID);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
