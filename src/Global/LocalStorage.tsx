import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogingModel} from '../Redux/Model';

export const saveLocalStorage = async (user: LogingModel) => {
  let success: boolean = true;

  try {
    await AsyncStorage.setItem('userId', String(user.userId));
    await AsyncStorage.setItem('username', String(user.username));
    await AsyncStorage.setItem('access_token', String(user.access_token));
    await AsyncStorage.setItem('refresh_token', String(user.refresh_token));
    await AsyncStorage.setItem('cart_token', String(user.cart_token));
    await AsyncStorage.setItem('role', String(user.role));
  } catch (e) {
    success = false;
  }
  return success;
};
export const clearLocalStorage = async () => {
  let success: boolean = true;
  try {
    // await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    // await AsyncStorage.removeItem('cart_token');
    await AsyncStorage.removeItem('role');
  } catch (e) {
    success = false;
  }
  return success;
};
export const getLocalStorage = async () => {
  let data: any = null;
  try {
    const userId = await AsyncStorage.getItem('userId');
    const username = await AsyncStorage.getItem('username');
    const access_token = await AsyncStorage.getItem('access_token');
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    const cart_token = await AsyncStorage.getItem('cart_token');
    const role = await AsyncStorage.getItem('role');
    data = {
      userId: userId,
      username: username,
      access_token: access_token,
      refresh_token: refresh_token,
      cart_token: cart_token,
      role: role,
    };
  } catch (e) {
    data = {error: e};
  }
  return data;
};
