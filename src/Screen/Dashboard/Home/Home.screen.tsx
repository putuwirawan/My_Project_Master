import React, {useEffect, FC, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';

import {Image} from 'react-native-elements';

import {
  AutoScroll,
  BasePage,
  BrandList,
  ProductL,
  ShowMore,
} from '../../../Componet';

import {catalogType, getCatalog} from '../../../Global/API';
import Albums from '../../../Global/Example/Albums';
import Brands from '../../../Global/Example/Brand';

type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const [seachValue, setSeachValue] = useState('');
  const [datas, setDatas] = useState([]);

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: 0,
    pageSize: 20,
    brands: '',
    filter: seachValue,
  };

  const getDataCatalog = async () => {
    await getCatalog(dataOption)
      .then(res => {
        if (res.length > 0) {
          setDatas(res);
        } else {
          alert('data not found');
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  const HeaderMenu = () => {
    return (
      <BrandList
        data={Brands}
        onSelec={(data: any, title: string) => {
          navigation.navigate('Product', {data: data, title: title});
        }}
      />
    );
  };
  const MainPage = () => {
    return (
      <View>
        <View style={{height: 190, backgroundColor: '#191919'}}>
          <AutoScroll
            data={Albums}
            imageMode="stretch"
            autoScroll={true}
            duration={6000}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datas.length > 0
            ? datas.map((item, i) => {
                return (
                  <View key={i} style={[styles.item]}>
                    <ProductL
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
                  </View>
                );
              })
            : null}
          <View>
            <ShowMore onPress={() => {}} />
          </View>
        </ScrollView>
        <Text>Produck Terbaru :</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datas.length > 0
            ? datas.map((item, i) => {
                return (
                  <View key={i} style={[styles.item]}>
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
                  </View>
                );
              })
            : null}
          <View>
            <ShowMore onPress={() => {}} />
          </View>
        </ScrollView>
      </View>
    );
  };
  // ==========================================================
  useEffect(() => {
    getDataCatalog();
  }, [seachValue]);
  return (
    <BasePage
      searchValue={seachValue}
      onRefresh={() => getDataCatalog()}
      onChangeSearch={value => {
        setSeachValue(value);
      }}
      headerView={<HeaderMenu />}
      child={<MainPage />}
    />
  );
};

const styles = StyleSheet.create({

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 134,
    height: 210,
    borderWidth: 1,
    borderRadius: 5,
  },

});
