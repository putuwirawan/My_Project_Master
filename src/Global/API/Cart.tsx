import {getLocalStorage} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_host} from './index';

type cartType = {
  qty: number;
  remarks?: string;
  currencyId: string;
  warehouseId: string;
  articleId: string;
};

export const createCart = async (cart: cartType) => {
  let data: boolean = false;
  const getUserLogin = await getLocalStorage();
  const {access_token, userId, cart_token} = getUserLogin;
  const URL = `${API_host}sales/shopcart`;

  await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      memberId: userId,
      memberToken: cart_token,
      shopcartDetails: [cart],
    }),
  })
    .then(response => response.json())
    .then(async responJson => {
      if (responJson.data.memberToken !== undefined) {
        await AsyncStorage.setItem('cart_token', responJson.data.memberToken);
      }
      if (responJson.data.memberId !== undefined) {
        await AsyncStorage.setItem('userId', responJson.data.memberId);
      }
      data = true;
    })

    .catch(e => {
      alert('Network not Available');
    });

  return data;
};
export const getCart = async () => {
  let data: any = null;
  const getUserLogin = await getLocalStorage();
  const {access_token, userId, cart_token} = getUserLogin;
  const URL = `${API_host}sales/shopcart?memberId=${userId}&memberToken=${cart_token}`;

  if (cart_token != null && userId != null) {
    await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
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
  }

  return data;
};
export const deletedCart = async (cartId: string) => {
  let data: boolean = false;
  const getUserLogin = await getLocalStorage();
  const {access_token, userId, cart_token} = getUserLogin;
  const URL = `${API_host}sales/shopcart/${cart_token}/${cartId}`;

  await fetch(URL, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(responJson => {
      data = responJson.data.deleted;
    })

    .catch(e => {
      alert('Network not Available');
    });
  return data;
};
