import React from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';
import { Divider } from 'react-native-elements';

type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => onlogout()} />
      <Divider/>
      <Button title="Product" onPress={() => navigation.navigate('Product')} />
    </View>
  );
};
