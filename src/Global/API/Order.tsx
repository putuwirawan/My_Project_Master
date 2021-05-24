import {API_host} from '.';
import {getLocalStorage} from '..';
interface orderType {
  docdate: string;
  memberId: string;
  memberToken: string;
  salesDatas: any;
  payments?: any;
}
export const createOrder = async (order: orderType) => {
  let data: any;
  const getUserLogin = await getLocalStorage();
  const {access_token, userId, cart_token} = getUserLogin;
  const URL = `${API_host}sales/order/client`;

  await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then(response => response.json())
    .then(async responJson => {
      data = responJson;
    })

    .catch(e => {
      alert('Network not Available');
    });

  return data;
};
