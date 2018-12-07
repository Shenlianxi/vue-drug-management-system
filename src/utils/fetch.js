import axios from 'axios';
import { Message, Loading } from 'element-ui';
import { getToken } from 'utils/auth';
import store from '../store';
import qs from 'qs';
// 创建axios实例
const bsUrl = process.env.BASE_API;
// const status = store.getters.status;
const service = axios.create({
  baseURL: bsUrl, // api的base_url
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 5000 // 请求超时时间
});
service.defaults.transformRequest = [function(data) {
  if (data) {
    data = qs.stringify(data);
  }
  return data;
}];
let loadinginstace = null;
// request拦截器
service.interceptors.request.use(config => {
  const notLoading = config.headers.loading;
  if (!notLoading) {
    loadinginstace = Loading.service({ fullscreen: true, text: '处理中' });
    delete config.headers.loading;
  } else {
    if (notLoading.toLowerCase() !== 'true') {
      loadinginstace = Loading.service({ fullscreen: true, text: '处理中', target: notLoading });
      delete config.headers.loading;
    }
  }
  const tokenStr = getToken();
  let token = null;
  if (tokenStr) {
    token = JSON.parse(tokenStr);
  }
  let uid = -1;
  if (token) {
    uid = token.userId;
  }
  if (store.getters.token) {
    config.headers['token'] = token.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers.userId = uid;
  return config;
}, error => {
  // Do something with request error
  loadinginstace.close();
  console.log(error); // for debug
  Promise.reject(error);
});
// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
