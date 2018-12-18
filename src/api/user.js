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

export function changePwd(data) {
  const param = {
    oldPwd: md5(data.oldPwd),
    newPwd: md5(data.newPwd)
  };
  return fetch({
    url: '/user/changePassword',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function getUser() {
  return fetch({
    url: '/user/getUser',
    method: 'get',
    headers: { loading: 'true' }
  });
}

export function saveProfile(data) {
  const param = {
    nickName: data.nickName,
    position: data.position,
    job: data.job,
    age: data.age
  };
  return fetch({
    url: '/user/saveProfile',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function addUser(data) {
  const param = {
    userName: data.userName,
    password: md5(data.password),
    userRole: data.userRole
  };
  return fetch({
    url: '/user/add',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function delUser(data) {
  return fetch({
    url: '/user/delUser/' + data.userId,
    method: 'delete',
    headers: { loading: 'true' }
  });
}

export function getUserList() {
  return fetch({
    url: '/user/allUser',
    method: 'get',
    headers: { loading: 'true' }
  });
}
