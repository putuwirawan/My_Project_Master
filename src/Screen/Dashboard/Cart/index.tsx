import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen} from './Cart.screen';
import {CartState, DashboardParam} from '../../../Redux/Model';
import {RootState} from '../../../Redux/Reducers';
import {useSelector} from 'react-redux';

export const CartStackScreen: FC = () => {
  const Stack = createStackNavigator<DashboardParam>();
  const {carts, cartsCount}: CartState = useSelector(
    (state: RootState) => state.cart,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{carts: carts, count: cartsCount}}
        options={{
          title: 'TROLI',
        }}
      />
    </Stack.Navigator>
  );
};
