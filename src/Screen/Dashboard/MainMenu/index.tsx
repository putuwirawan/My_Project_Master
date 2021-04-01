import React from 'react';
import {FC} from 'react';
// import your screen here.......
import {Tabscreen} from '../TabScreen';
import {ProductScreen} from '../Product/Product.screen'


import {DashboardParam} from '../../../Redux/Model';
import {useTheme} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

export const MainMenuScreen: FC = () => {
  const Menu = createStackNavigator<DashboardParam>();
  const {colors} = useTheme();
  return (
    <Menu.Navigator initialRouteName="MainMenu">
      <Menu.Screen name="MainMenu" component={Tabscreen} options={{headerShown:false}} />
      <Menu.Screen name='Product' component={ProductScreen} />
    </Menu.Navigator>
  );
};
