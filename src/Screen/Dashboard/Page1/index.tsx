import React from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Page1Screen} from './Page1.screen';
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
        name='Page1'
        component={Page1Screen}
        options={{
          title: 'PAGE !',
        }}
      />
    </Stack.Navigator>
  );
};
