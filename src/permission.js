import router from './router';
import store from './store';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken, setToken } from '@/utils/auth';

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  if (to.query.token) {
    const tokenData = {};
    tokenData.token = to.query.token;
    if (to.fullPath.indexOf('portaldetail') !== -1 && to.fullPath.indexOf('token') !== -1) {
      const localToken = JSON.parse(sessionStorage.getItem('biToken'));
      if (!localToken && localToken && localToken !== 'null') {
        const tokenTempData = {};
        tokenTempData.token = to.query.token;
        sessionStorage.setItem('biToken', JSON.stringify(to.query.token));
        setToken(tokenTempData);
      } else {
        setToken(tokenData);
        sessionStorage.setItem('biToken', JSON.stringify(to.query.token));
      }
    } else {
      if (tokenData.token !== 'null') {
        setToken(tokenData);
      }
    }
  }
  nProgress.start();
  if (getToken()) {
    if (to.path === '/login' || to.path === '/') {
      next('/login');
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          next();
        }).catch(() => {
          next('/login');
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      nProgress.done();
    }
  }
});

router.afterEach(() => {
  nProgress.done(); // 结束Progress
});
