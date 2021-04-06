import React from 'react';
import {FC} from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {ProductScreen} from './Product.screen';
import {DashboardParam} from '../../../Redux/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

export const ProductStackScreen: FC = () => {
  const Stack = createStackNavigator<DashboardParam>();
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({navigation, route}) => ({
          title: 'Product !',
          headerRight: () => (
            <Ionicons
              name={'cart-outline'}
              color={colors.text}
              size={23}
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('Cart')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
