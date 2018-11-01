import Vue from 'vue';
import Router from 'vue-router';
import blankLayout from 'views/layout/blank-layout';
import defaultLayout from 'views/layout/default-layout';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);
// 路由设置
export const constantRouterMap = [
  {
    path: '/test',
    component: blankLayout,
    hidden: true,
    children: [{ path: '/', component: _import('layout/default-layout') }]
  },
  {
    path: '/',
    component: blankLayout,
    hidden: true,
    children: [{ path: '/', component: _import('login/index') }]
  },
  {
    path: '/mainpageview',
    component: defaultLayout,
    hidden: true,
    children: [{ path: '/', component: _import('dashboard/recent-news') }]
  }
];
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
