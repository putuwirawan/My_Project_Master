import {getLocalStorage} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_host} from './index';

type cartType = {
  qty: number;
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
      data =true
    })

    .catch(e => {
      alert('Network not Available');
    });

  return data;
};
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
