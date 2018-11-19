import fetch from 'utils/fetch';

export function testApi() {
  return fetch({
    url: '/buyer/product/list',
    method: 'get',
    headers: { loading: 'true' }
  });
}
