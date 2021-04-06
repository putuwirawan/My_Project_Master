import React from 'react';
import {FC,useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, ScrollView} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage, Styles} from '../../../Global';
import {Divider, SearchBar} from 'react-native-elements';

import {Button as CustomButton} from '../../../Componet';

type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const [textSearch,setSearch] = useState<string>('')
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const   updateSearch = (search:string) => {
    setSearch( search );
  };
  return (
    <View style={[Styles.Container]}>
      <View>
        <ScrollView horizontal>
          <CustomButton title="kopi" width={100} />
          <CustomButton title="kopi" width={100} />
          <CustomButton title="kopi" width={100} />
          <CustomButton title="kopi" width={100} />
        </ScrollView>
  

      </View>
      <View>
 
        </View>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => onlogout()} />
      <Divider />
      <Button title="Product" onPress={() => navigation.navigate('Product')} />
    </View>
  );
};
