import React from 'react';
import {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from './Home.screen';
import {DashboardParam} from '../../../Redux/Model';

export const HomeStackScreen: FC = () => {
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
        name="Home"
        component={HomeScreen}
        options={{
          title: 'HOME !',
        }}
      />
    </Stack.Navigator>
  );
};
