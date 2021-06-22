import { getLocalStorage } from '..';
import {API_host} from './index';

export const getMch= async () => {

    let data: any = null;
    const getUserLogin = await getLocalStorage();
    const {access_token, userId, cart_token} = getUserLogin;
  const URL = `${API_host}master/mchconfig?sortOrder=ASC`

  await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',     
      'Content-type': 'application/json',
    },

  }).then(response => response.json())
  .then(responJson => {
      console.log(responJson.data)
    data = responJson.data;
  })

  .catch(e => {
    alert('Network not Available');
  });

}