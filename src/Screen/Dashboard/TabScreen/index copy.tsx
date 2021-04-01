import React from 'react';
import {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import your screen here.......
import {Page1Screen} from '../Page1/Page1.screen';
import {View} from 'react-native';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

export const Tabscreen: FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName

          if (route.name === 'Page1') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Article') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={String(iconName) } size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Page1"
        component={Page1Screen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Article" component={Article} options={{tabBarBadge: 3 ,tabBarBadgeStyle:{color:'green' ,backgroundColor:'yellow'}}} />
    </Tab.Navigator>
  );
};
