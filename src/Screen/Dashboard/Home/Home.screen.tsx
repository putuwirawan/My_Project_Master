import React, {useEffect, FC, useState, useRef} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
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
import Brands, {BrandModel} from '../../../Global/Example/Brand';

type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const [seachValue, setSeachValue] = useState('');
  const [datas, setDatas] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: 0,
    pageSize: 10,
    brands: '',
    filter: seachValue,
  };

  const getDataCatalog = async () => {
    await getCatalog(dataOption)
      .then(res => {
        if (res !== null) setDatas(res);
      })
      .catch(e => {
        alert(e);
      });
  };

  const HeaderMenu = () => {
    return (
      <BrandList
        data={Brands}
        onSelec={(brand: BrandModel) => {
          dataOption.brands = ''; //brand.deskription;
          dataOption.filter = '';
          dataOption.pageSize = 35;
          getCatalog(dataOption)
            .then(res => {
              if (res != null) {
                if (res.length > 0) {
                  navigation.navigate('Product', {
                    data: res,
                    title: brand.deskription,
                  });
                } else Alert.alert('', 'Not Available Product');
              }
            })
            .catch(e => {
              alert(e);
            });
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
          {datas.length > 0 ? (
            datas.map((item, index) => (
              <View key={index} style={[styles.item]}>
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
            ))
          ) : (
            <View style={[styles.item]}>
              <Image
                source={require('../../../Assets/Images/EmptyIcon.png')}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <Text>Data Not Available</Text>
            </View>
          )}
          {datas.length > 0 ? (
            <View style={[styles.item]}>
              <ShowMore
                onPress={async () => {
                  dataOption.pageSize = 35;
                  dataOption.filter = '';
                  await getCatalog(dataOption)
                    .then(res => {
                      if (res.length > 0) {
                        navigation.navigate('Product', {
                          data: res,
                          title: 'Planet Surf',
                        });
                      } else {
                        alert('data not found');
                      }
                    })
                    .catch(e => {
                      alert(e);
                    });
                }}
              />
            </View>
          ) : null}
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
