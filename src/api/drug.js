import fetch from 'utils/fetch';
export function getAllDrug(data) {
  return fetch({
    url: '/drug/allInfo',
    method: 'get',
    headers: { loading: 'true' }
  });
}
