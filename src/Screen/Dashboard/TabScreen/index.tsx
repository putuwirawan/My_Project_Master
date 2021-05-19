import React, {FC} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
// import your screen here.......
import {Page1StackScreen} from '../Page1';
import {HomeStackScreen} from '../Home';
import {UserStackScreen} from '../User';
import {FeedStackScreen} from '../Feed';
import {CartStackScreen} from '../Cart';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {CartState, DashboardParam} from '../../../Redux/Model';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../Redux/Reducers';

export const Tabscreen: FC = () => {
  const dispatch = useDispatch(); // to Access Action
  const Tab = createMaterialBottomTabNavigator<DashboardParam>();
  const {colors} = useTheme();
  const {carts, cartsCount}: CartState = useSelector(
    (state: RootState) => state.cart,
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#191B1A"
      barStyle={{backgroundColor: '#1F6E49'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStackScreen}
        options={{
          title: 'Feed',
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? 'ribbon' : 'ribbon-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        initialParams={{carts: carts, count: cartsCount}}
        component={CartStackScreen}
        options={{
          tabBarBadge: cartsCount > 0 ? cartsCount : undefined,
          title: 'Troli',
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          title: 'Akun',
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
