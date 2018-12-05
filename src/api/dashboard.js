import fetch from 'utils/fetch';

export function getTotal() {
  return fetch({
    url: '/show/totalinfo',
    method: 'get',
    headers: { loading: 'true' }
  });
}

export function getMaps() {
  return fetch({
    url: '/show/mapdata',
    method: 'get',
    headers: { loading: 'true' }
  });
}
