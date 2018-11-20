import axios from 'axios';
import {
  Message
} from 'element-ui';
// import store from '../store';
import qs from 'qs';
// 创建axios实例
const bsUrl = process.env.BASE_API;
// const status = store.getters.status;
const service = axios.create({
  baseURL: bsUrl, // api的base_url
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 50000 // 请求超时时间
});
service.defaults.transformRequest = [function(data) {
  if (data) {
    data = qs.stringify(data);
  }
  return data;
}];
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
