import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../Redux/Actions/Loging.action';
import {LoginState, ThemeState} from '../Redux/Model';
import {RootState} from '../Redux/Reducers';
import {CustomDarkTheme, CustomDefaultTheme, getLocalStorage} from '../Global';

import {NavigationContainer} from '@react-navigation/native';
import {LoginStackScreen} from './Login';
import {DashboardStackScreen} from './Dashboard/Drawer';
import {Tabscreen} from './Dashboard/TabScreen';
import {MainMenuScreen} from './Dashboard/MainMenu';
interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch(); // to Access Action
  const {loginUser, errorLogin, isLogin}: LoginState = useSelector(
    (state: RootState) => state.loging,
  );

  const {isDarkTheme}: ThemeState = useSelector(
    (state: RootState) => state.theme,
  );
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const checkUser = async () => {
    const getUserLogin = await getLocalStorage();

    if (getUserLogin.access_token != null) {
      dispatch(logIn(getUserLogin));
    }
  };
  useEffect(() => {
    checkUser();
    //do nothing
  }, [isDarkTheme, isLogin, loginUser]);
  return (
    <NavigationContainer theme={theme}>
      {isLogin ? <MainMenuScreen /> : <LoginStackScreen />}
    </NavigationContainer>
  );
};

export default Home;
