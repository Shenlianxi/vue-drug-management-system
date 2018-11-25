import fetch from 'utils/fetch';
import md5 from 'js-md5';
export function login(data) {
  const param = {
    userName: data.userName,
    password: md5(data.password)
  };
  return fetch({
    url: '/user/login',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}
