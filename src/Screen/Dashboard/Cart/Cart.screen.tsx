import React from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';

type Props = StackScreenProps<DashboardParam, 'Cart'>;

export const CartScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  return (
    <View>
      <Text> Cart Screen</Text>
      <Button title="Logout" onPress={() => onlogout()} />
    </View>
  );
};
