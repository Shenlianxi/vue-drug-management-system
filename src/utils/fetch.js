import axios from 'axios';
import {
  Message
} from 'element-ui';
import qs from 'qs';
// 创建axios实例
const bsUrl = process.env.BASE_API;
console.log(bsUrl);
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
// let loadinginstace = null;
// request拦截器
// service.interceptors.request.use(config => {
//   debugger;
//   const notLoading = config.headers.loading;
//   if (!notLoading) {
//     loadinginstace = Loading.service({
//       fullscreen: true,
//       text: '处理中'
//     });
//     delete config.headers.loading;
//   } else {
//     if (notLoading.toLowerCase() !== 'true') {
//       loadinginstace = Loading.service({
//         fullscreen: true,
//         text: '处理中',
//         target: notLoading
//       });
//       delete config.headers.loading;
//     }
//   }
// });

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
