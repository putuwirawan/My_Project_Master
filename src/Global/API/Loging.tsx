import qs from 'qs';
import {RegisterModel} from '../../Redux/Model';
import {API_host} from './index';

export const apiLogin = async (username: string, password: string) => {
  let data: any = null;
  const URL = `${API_host}auth/login?type=MEMBER`;
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
