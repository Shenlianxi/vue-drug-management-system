import fetch from 'utils/fetch';

export function getRoleList() {
  return fetch({
    url: '/role/getList',
    method: 'get',
    headers: { loading: 'true' }
  });
}
