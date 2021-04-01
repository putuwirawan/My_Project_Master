import React from 'react';
import {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen} from './Cart.screen';
import {DashboardParam} from '../../../Redux/Model';

export const Page1StackScreen: FC = () => {
  const Stack = createStackNavigator<DashboardParam>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Page1"
        component={CartScreen}
        options={{
          title: 'PAGE !',
        }}
      />
    </Stack.Navigator>
  );
};
