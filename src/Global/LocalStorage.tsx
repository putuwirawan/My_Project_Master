import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogingModel} from '../Redux/Model';

export const saveLocalStorage = async (user: LogingModel) => {
  let success: boolean = true;
  try {
    await AsyncStorage.setItem('userId', String(user.userId));
    await AsyncStorage.setItem('username', String(user.username));
    await AsyncStorage.setItem('token', String(user.token));
    await AsyncStorage.setItem('role', String(user.role));
  } catch (e) {
    success = false;
  }
  return success;
};
export const clearLocalStorage = async () => {
  let success: boolean = true;
  try {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('token');
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
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    data = {userId: userId, username: username, token: token, role: role};
  } catch (e) {
    data = {error: e};
  }
  return data;
};
