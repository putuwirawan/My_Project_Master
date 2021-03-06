import React from 'react';
import {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {FeedScreen} from './Feed.screen';
import {DashboardParam} from '../../../Redux/Model';

export const FeedStackScreen: FC = () => {
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
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'FEED!',
        }}
      />
    </Stack.Navigator>
  );
};
