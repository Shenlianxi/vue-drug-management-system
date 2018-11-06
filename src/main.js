// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './lang';
import store from './store';
import './icons';
import 'assets/theme/cockpit';

Vue.config.productionTip = false;
Vue.use(elementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
