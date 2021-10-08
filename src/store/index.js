import Vue from 'vue'
import Vuex from 'vuex'
import list from './list.module'
import details from './details.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    list,
    details
  }
})