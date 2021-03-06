import React  from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, } from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';

import {ProductD} from '../../../Componet';


type Props = StackScreenProps<DashboardParam, 'ProductDetail'>;

export const ProductDetail: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch(); // to Access Action
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const {data} = route.params;
  return (
    <View>
      <ProductD data={data} />
    </View>
  );
};
