import Vue from 'vue';
import Router from 'vue-router';
import blankLayout from 'views/layout/blank-layout';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);
// 路由设置
export const constantRouterMap = [
  {
    path: '/12',
    component: blankLayout,
    hidden: true,
    meta: {
      title: '12页面...'
    },
    children: [{ path: '/', component: _import('test-main/2') }]
  },
  {
    path: '1',
    component: blankLayout,
    hidden: true,
    meta: {
      title: '首页'
    },
    children: [{ path: '/', component: _import('test-main/index') }]
  }
];
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
