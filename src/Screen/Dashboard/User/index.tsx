import React from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {UserScreen} from './User.screen';
import {DashboardParam} from '../../../Redux/Model';

type Props = StackScreenProps<DashboardParam, 'User'>;

export const UserStackScreen: FC<Props> = () => {
  const Stack = createStackNavigator<Props>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="route"
        component={UserScreen}
        options={{
          title: 'User !',
        }}
      />
    </Stack.Navigator>
  );
};
