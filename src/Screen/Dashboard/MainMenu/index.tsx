import React from 'react';
import {FC} from 'react';
// import your screen here.......
import {Tabscreen} from '../TabScreen';
import {ProductStackScreen} from '../Product';

import {DashboardParam} from '../../../Redux/Model';
import {useTheme} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductDetail} from '../Product/Product.detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';

export const MainMenuScreen: FC = () => {
  const Menu = createStackNavigator<DashboardParam>();
  const {colors} = useTheme();

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

          headerRight: () => (
            <View>
              <Ionicons
                name={'cart-outline'}
                color={colors.text}
                size={23}
                style={{marginRight: 10}}
                onPress={() => navigation.navigate('Cart')}
              />
              <Badge
                value={5}
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
