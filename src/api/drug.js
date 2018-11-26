import fetch from 'utils/fetch';
export function getAllDrug() {
  return fetch({
    url: '/drug/allInfo',
    method: 'get',
    headers: { loading: 'true' }
  });
}

export function queryDetail(data) {
  const param = {
    drugId: data.drugId
  };
  return fetch({
    url: '/drug/query',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function updateDrug(data) {
  const param = {
    drugId: data.drugId,
    drugCategory: data.drugCategory,
    drugPrice: data.drugPrice,
    drugResource: data.drugResource,
    drugFunction: data.drugFunction,
    drugIcon: data.drugIcon
  };
  return fetch({
    url: '/drug/update',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

