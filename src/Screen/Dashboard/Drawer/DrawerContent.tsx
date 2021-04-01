import React, {useContext, useEffect} from 'react';
import {FC} from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Divider} from 'react-native-elements';
import {Avatar, Icon} from 'react-native-elements';

import {Styles} from '../../../Global';

import {dashboarScreen} from '../../ScreenList';
interface DrawerContentProps {
  navigation?: any;
}

const listDrawer = [
  {name: 'Page1', icon: 'home-outline', deskription: 'Page 1 gen'},
];

type elementProps = {
  key: number;
  onPress: () => void;
  icon?: string;
  title: string;
};
const DrawerElement = (x: elementProps) => {
  const {title, icon, onPress} = x;
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.drawerConten}>
          <View style={[{flexDirection: 'row', flex: 1}]}>
            {icon ? (
              <View style={[styles.drawerIcon]}>
                <Icon name={icon} type="ionicon" size={20} />
              </View>
            ) : null}

            <View style={styles.drawerText}>
              <Text style={Styles.ChildTitleItalic}>{title}</Text>
            </View>
            <View style={[styles.drawerIcon, {alignItems: 'flex-end'}]}>
              <Icon name="chevron-forward-outline" type="ionicon" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
export const DrawerContent: FC<DrawerContentProps> = props => {
  const {navigation} = props;
  return (
    <View style={[Styles.Container]}>
      {/* Drawer Header */}
      <View style={[styles.drawerHeader]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 2, backgroundColor: '#3B3C3E',alignItems:'center', justifyContent:'center'}}>
          <Avatar
            rounded
            size="large"
            title="US"
            activeOpacity={0.7}
            source={{
              uri:
                'https://th.bing.com/th/id/OIP.O9QGKTfehvwFJHXkYVE4tQHaEK?w=295&h=180&c=7&o=5&dpr=1.25&pid=1.7',
            }}
          />
          </View>
          <View style={{flex: 3, alignItems:'center', justifyContent:'flex-end'}}>
            <Text>WAWAN</Text>
            <Divider />
            <Text>wawan@ajus.com</Text>
          </View>
        </View>
      </View>
      {/* Drawer Item menu */}
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        {dashboarScreen.map((item, index) => {
          return (
            <DrawerElement
              key={index}
              icon={item.icon}
              title={item.deskription}
              onPress={() => navigation.navigate(item.name)}
            />
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {height: 100, borderWidth: 1, borderRadius: 5},
  drawerConten: {
    justifyContent: 'center',
    marginBottom: 2,
    paddingHorizontal: 5,
    height: 25,
  },
  drawerText: {
    flex: 3,
    paddingLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  drawerIcon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
