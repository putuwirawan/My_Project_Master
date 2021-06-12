import React, {FC, useEffect, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Dimensions, ScrollView, Image} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';

import {
  SlideAnimate,
  AutoScroll,
  BasePage,
  ProductL,
  ShowMore,
  ButtonIcon,
} from '../../../Componet';
import Albums from '../../../Global/Example/Albums';
import {catalogType, getCatalog} from '../../../Global/API';

type Props = StackScreenProps<DashboardParam, 'Feed'>;
const adidasLogo = require('../../../Assets/Images/adidas.png');
const insghtLogo = require('../../../Assets/Images/insight.jpg');
export const FeedScreen: FC<Props> = ({navigation}) => {
  const images = Albums;
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
      <View style={{marginVertical:5}}>
        <ScrollView horizontal>
        <ButtonIcon brandLogo={adidasLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
        </ScrollView>
      </View>
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
          <View>
            <ShowMore onPress={() => {}} />
          </View>
        </ScrollView>
        <Text>Produck Terbaru :</Text>
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
