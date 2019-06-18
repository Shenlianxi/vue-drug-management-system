import fetch from 'utils/fetch';

export function getTotal() {
  return fetch({
    url: '/show/totalinfo',
    method: 'get',
    headers: { loading: 'true' }
  });
}
// 解放党四级分数

export function getMaps() {
  return fetch({
    url: '/show/mapdata',
    method: 'get',
    headers: { loading: 'true' }
  });
}
