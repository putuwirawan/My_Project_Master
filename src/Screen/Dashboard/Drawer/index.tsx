import React from 'react';
import {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import your screen here.......
import {Page1Screen} from '../Page1/Page1.screen';
import {View} from 'react-native';
import {Text} from 'react-native';

import {DrawerContent} from './DrawerContent';

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

export const DashboardStackScreen: FC = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 250,
        marginTop: 50,
        borderTopRightRadius: 10,
        padding: 5,
      }}
      drawerContentOptions={{
        activeTintColor: 'blue',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Page1" component={Page1Screen} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
};
