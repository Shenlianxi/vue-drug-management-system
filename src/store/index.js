import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import global from './modules/global';
import user from './modules/user';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    global,
    user
  },
  getters
});

export default store;
