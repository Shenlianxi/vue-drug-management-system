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

export function deleteDrug(data) {
  return fetch({
    url: '/drug/delete/' + data.drugId,
    method: 'delete',
    headers: { loading: 'true' }
  });
}

export function getCategory() {
  return fetch({
    url: '/category',
    method: 'get',
    headers: { loading: 'true' }
  });
}

export function addCategory(data) {
  const param = {
    categoryName: data.name,
    categoryDesc: data.desc
  };
  return fetch({
    url: '/category/add',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function addDrug(data) {
  const param = {
    name: data.name,
    category: data.category,
    price: data.price,
    amount: data.amount,
    resource: data.resource,
    function: data.function,
    icon: data.icon
  };
  return fetch({
    url: '/drug/insert',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}

export function stockManage(data) {
  const param = {
    drugId: data.drugId,
    count: data.count,
    type: data.type
  };
  return fetch({
    url: '/drug/stock',
    method: 'post',
    headers: { loading: 'true' },
    data: param
  });
}
