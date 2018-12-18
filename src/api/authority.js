import fetch from 'utils/fetch';

export function getAllAuthority() {
  return fetch({
    url: '/authority/getAll',
    method: 'get',
    headers: { loading: 'true' }
  });
}

export function getRoleAuthority(data) {
  const param = {
    roleId: data.roleId
  };
  return fetch({
    url: '/authority/getPriority',
    method: 'get',
    headers: { loading: 'true' },
    params: param
  });
}

export function modifyRoleAuth(data) {
  const param = {
    roleId: data.roleId,
    authIds: data.authIds
  };
  return fetch({
    url: '/authority/modify',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}
