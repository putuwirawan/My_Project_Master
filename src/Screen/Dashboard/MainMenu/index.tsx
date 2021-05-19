import React from 'react';
import {FC} from 'react';
// import your screen here.......
import {Tabscreen} from '../TabScreen';
import {ProductStackScreen} from '../Product';

import {CartState, DashboardParam, LoginState} from '../../../Redux/Model';
import {useTheme} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductDetail} from '../Product/Product.detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';
import { RootState } from '../../../Redux/Reducers';
import { useSelector } from 'react-redux';

export const MainMenuScreen: FC = () => {
  const Menu = createStackNavigator<DashboardParam>();
  const {colors} = useTheme();
  const {carts, cartsCount}: CartState = useSelector(
    (state: RootState) => state.cart,
  );

  return (
    <Menu.Navigator initialRouteName="MainMenu" mode="modal">
      <Menu.Screen
        name="MainMenu"
        component={Tabscreen}
        options={{headerShown: false}}
      />
      <Menu.Screen
        name="Product"
        component={ProductStackScreen}
        options={{headerShown: false}}
      />
      <Menu.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Detail Product ',
          headerLeft: () => (
            <Ionicons
              name={'arrow-back-circle-outline'}
              color={colors.text}
              size={25}
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('Home')}
            />
          ),
          headerRight: () => (
            <View>
              <Ionicons
                name={'cart-outline'}
                color={colors.text}
                size={23}
                style={{marginRight: 10}}
                onPress={() => navigation.navigate('Cart',{carts: carts, count: cartsCount})}
              
              />
              <Badge
                value={cartsCount !=0? cartsCount: undefined}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: 0, height:50}}
              />
            </View>
          ),
        })}
      />
    </Menu.Navigator>
  );
};
