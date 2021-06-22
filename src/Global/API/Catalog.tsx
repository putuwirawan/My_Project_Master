import {API_host} from './index';
export type catalogType = {
  filter?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  pageIndex?: number;
  pageSize?: number;
  divisions?: string;
  groups?: string;
  categories?: string;
  brands?: string;
  colors?: string;
  flags: number;
};

export const getCatalog = async (request: catalogType) => {
  let data: any = null;
  const URL = `${API_host}sales/catalog?filter=${
    request.filter ? request.filter : ''
  }&sortBy=${request.sortBy ? request.sortBy : ''}&sortOrder=${
    request.sortOrder ? request.sortOrder : 'ASC'
  }&pageIndex=${request.pageIndex ? request.pageIndex : 0}&pageSize=${
    request.pageSize ? request.pageSize : 10
  }&divisions=${request.divisions ? request.divisions : ''}&groups=${
    request.groups ? request.groups : ''
  }&categories=${request.categories ? request.categories : ''}&brands=${
    request.brands ? request.brands : ''
  }&colors=${request.colors ? request.colors : ''}&flags=${request.flags}`;

  await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(responJson => {
      if (responJson.data != []) {
        const keydatas = Object.keys(responJson.data);
        const resData = keydatas.map((item, i) => {
          return {name: item, style: responJson.data[item]};
        });
        data = resData;
      } else {
        data = responJson.data;
      }
    })

    .catch(e => {
      alert('Network not Available');
    });
  return data;
};

export const getCatalogDetail = async ({
  styleId,
  variantId,
}: {
  styleId: string;
  variantId: string;
}) => {
  let data: any = null;
  const URL = `${API_host}sales/catalog/details?styleId=${styleId}&variantId=${variantId}`;
  await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(responJson => {
      data = responJson;
     
    })

    .catch(e => {
      alert('Network not Available');
    });
   return data;
};
export const getCatalogArticle = async (variantId: string) => {
  let data: any = null;
  const URL = `${API_host}sales/catalog/articles?variantId=${variantId}`;
  await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(responJson => {
      data = responJson.data;
    })

    .catch(e => {
      alert('Network not Available');
    });
  return data;
};
