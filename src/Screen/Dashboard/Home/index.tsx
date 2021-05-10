import React from 'react';
import {FC} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native-elements';
// Screen List
import {HomeScreen} from './Home.screen';
// import {ProductDetail} from '../Product/Product.detail';

import {DashboardParam} from '../../../Redux/Model';
import {Styles} from '../../../Global';

export const HomeStackScreen: FC = () => {
  const Stack = createStackNavigator<DashboardParam>();
  const logo = require('../../../Assets/Images/tulisanPs.png');
  return (
    <Stack.Navigator
      initialRouteName="Home"
      mode="modal"
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
          headerTitle: () => (
            <Image
              source={logo}
              style={{height: 34, width: 300}}
              resizeMode="stretch"
            />
          ),
        }}
      />
      {/* <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({navigation, route}) => ({
          headerShown: true,
        })}
      /> */}
    </Stack.Navigator>
  );
};
