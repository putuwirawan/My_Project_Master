import qs from 'qs';
import {getLocalStorage} from '..';
import {RegisterModel} from '../../Redux/Model';
import {API_host} from './index';

export const apiLogin = async (username: string, password: string) => {
  let data: any = null;
  const URL = `${API_host}auth/login?type=USER`;
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(responJson => {
      data = responJson;
    })

    .catch(e => {
      data = {error: e};
    });
  return data;
};
export const apiRegister = async (regdata: RegisterModel) => {
  let data: any = null;
  const URL = `${API_host}member`;
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(regdata),
  })
    .then(response => response.json())
    .then(responJson => {
      data = responJson;
    })

    .catch(e => {
      data = {error: e};
    });
  return data;
};
export const getUser = async () => {
  let data: any = null;
  const getUserLogin = await getLocalStorage();
  const {access_token, userId, username, cart_token} = getUserLogin;
  const URL = `${API_host}member/${username}`;
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
      data = responJson;
    })

    .catch(e => {
      data = {error: e};
    });
  return data;
};
