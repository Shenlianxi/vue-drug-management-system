import fetch from 'utils/fetch';

export function login(data) {
  const param = {
    userName: data.userName,
    password: data.password
  };
  return fetch({
    url: '/user/login',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}
