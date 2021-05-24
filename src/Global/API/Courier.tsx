import { API_host } from ".";
import { getLocalStorage } from "..";

export const getCourier = async () => {
    let data: any = null;
    const getUserLogin = await getLocalStorage();
    const {access_token, userId, cart_token} = getUserLogin;
    const URL = `${API_host}master/courier?sortOrder=ASC`;
  
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