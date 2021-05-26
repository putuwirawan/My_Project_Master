import React, {useEffect, FC, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, ScrollView, StyleSheet, Alert} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage, Styles} from '../../../Global';
import {Divider, Image} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';

import {
  Button as CustomButton,
  ButtonIcon,
  ProductL,
  ProductM,
  ShowMore,
} from '../../../Componet';
import {Block} from 'galio-framework';
import {catalogType, getCatalog} from '../../../Global/API';

const adidasLogo = require('../../../Assets/Images/adidas.png');
const insghtLogo = require('../../../Assets/Images/insight.jpg');
type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const [textSearch, setSearch] = useState<string>('');
  const [datas, setDatas] = useState([]);

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: 0,
    pageSize: 20,
    brands: '',
    filter: textSearch,
  };
  const getDataCatalog = async () => {
    const data = await getCatalog(dataOption);
    if (data.length > 0) {
      setDatas(data);
    } else {
      alert('Data not Found');
    }
  };
  const getDataByBrand = async (brand: string) => {
    dataOption.brands = '';
    dataOption.filter = '';
    const data = await getCatalog(dataOption);

    if (data.length > 0) {
      setDatas(data);

      navigation.navigate('Product', {data: datas, title: brand});
    } else {
      Alert.alert('request data', 'Data not Found');
    }
  };
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  useEffect(() => {
    getDataCatalog();
  }, [textSearch]);
  return (
    <View style={[Styles.Container]}>
      <SafeAreaView style={{paddingVertical: 3, backgroundColor: '#5F6160'}}>
        <ScrollView horizontal>
          <ButtonIcon brandLogo={adidasLogo} backgroundColor="#B7B8B7" />
          <ButtonIcon
            brandLogo={insghtLogo}
            backgroundColor="#EAEBEB"
            onPress={() => {
              getDataByBrand('Insight');
            }}
          />
          <ButtonIcon brandLogo={insghtLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
        </ScrollView>
      </SafeAreaView>
      <Searchbar
        placeholder="search"
        onChangeText={updateSearch}
        value={textSearch}
        iconColor="#A6F5BC"
        style={{
          backgroundColor: '#2C312D',
          height: 45,
          paddingVertical: 5,
          opacity: 5,
        }}
        inputStyle={{
          backgroundColor: '#BBC3BD',
          height: 35,
          fontSize: 15,
          padding: 2,
          marginHorizontal: 5,
          borderRadius: 15,
        }}
      />

      <SafeAreaView>
        <ScrollView>
          <View style={{height: 190}}>
            <Block safe></Block>
          </View>
          <View style={{height: 240, backgroundColor: 'blue'}}>
            <Block safe>
              <ScrollView horizontal>
                {datas.length > 0
                  ? datas.map((item, i) => {
                      return (
                        <ProductL
                          key={i}
                          onPress={() =>
                            navigation.navigate('ProductDetail', {data: item})
                          }
                          data={item}
                          promo={
                            <Image
                              source={require('../../../Assets/Images/freeOngkir.png')}
                              style={{width: 30, height: 25, marginBottom: 5}}
                            />
                          }
                        />
                      );
                    })
                  : null}
                <View style={[styles.item]}>
                  <ShowMore onPress={() => {}} />
                </View>
              </ScrollView>
            </Block>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>Home</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>Home</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>katul</Text>
          </View>
          <View
            style={{height: 100, backgroundColor: 'yellow', marginBottom: 70}}>
            <Button title="Logout" onPress={() => onlogout()} />
            <Divider />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 100,
    height: 210,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
