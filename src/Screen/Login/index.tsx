import React,{FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from './SignIn.screen';
import {SignUpScreen} from './SignUp.screen';
import {SplashScreen} from './Splash.screen';

export const LoginStackScreen: FC = () => {
  const LoginStack = createStackNavigator();
  return (
    <LoginStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <LoginStack.Screen name="SplashScreen" component={SplashScreen} />
      <LoginStack.Screen name="SignInScreen" component={SignInScreen} />
      <LoginStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </LoginStack.Navigator>
  );
};
