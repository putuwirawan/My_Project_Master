import React, {FC, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, View, Text} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {
  BasePage,
  CategoryList,
  CustomSnackList,
  SnackList,
} from '../../../Componet';
import {catalogType, getCatalog} from '../../../Global/API';
import Categories from '../../../Global/Example/Category';
import Album2 from '../../../Global/Example/Albums2'

type Props = StackScreenProps<DashboardParam, 'Product'>;

export const ProductScreen: FC<Props> = ({navigation, route}) => {
  const {data, title} = route.params;
  const [seachValue, setSeachValue] = useState('');
  const [datas, setDatas] = useState(data);
  const [pageIndex, setPageIndex] = useState(0);

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: pageIndex,
    pageSize: 35,
    brands: '', // title
    filter: seachValue,
  };

  const getDataCatalog = async () => {
    await getCatalog(dataOption)
      .then(res => {
        if (res.length > 0) {
           setDatas(res);
           //setDatas(Album2);
        } else {
          alert('data not found');
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  const updateSearch = (search: string) => {
    setSeachValue(search);
  };
  const HeaderMenu = () => {
    return (
      <CategoryList
        data={Categories}
        onSelec={(data: any) => {
          console.log('brand', title);
          console.log('datane', data);
        }}
      />
    );
  };
  const MainView = () => {
    return (
      <CustomSnackList
        data={datas}
        numCollumn={3}
        onShowMore={() => {
          setPageIndex(pageIndex + 1);
        }}
        onSelec={(res: any) => {       
         navigation.navigate('ProductDetail', {data: res});
        }}
      />

    );
  };

  useEffect(() => {
    getDataCatalog();
  }, [seachValue, pageIndex]);

  return (
    <BasePage
      searchValue={seachValue}
      onRefresh={() => getDataCatalog()}
      onChangeSearch={updateSearch}
      // headerView={<HeaderMenu />}
      child={
        <View>
          <HeaderMenu />
          <MainView />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({});
