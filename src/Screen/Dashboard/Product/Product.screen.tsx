import React, {FC, useEffect, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';
import {Divider, Image} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Block} from 'galio-framework';
import {ProductL, ShowMore} from '../../../Componet';
import {catalogType, getCatalog} from '../../../Global/API';

type Props = StackScreenProps<DashboardParam, 'Product'>;

export const ProductScreen: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch(); // to Access Action
  const {data, title} = route.params;
  const [datas, setDatas] = useState(data);
  const [pageIndex, setPageIndex] = useState(0);
  const [textSearch, setSearch] = useState<string>('');

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: 0,
    pageSize: 20,
    brands: '',
    filter: textSearch,
  };
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  const numColumns = 3;

  const formatData = (data: any[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  const getDataCatalog = async () => {
    await getCatalog(dataOption)
      .then(res => {
        if (res.length > 0) {
          setDatas(data);
        } else {
          alert('Data not Found');
        }
      })
      .catch(e => {
        alert(e);
      });

  };

  const renderItem = ({item}: {item: any}) => {
    if (item.empty === true) {
      return (
        <View style={[styles.item]}>
          <ShowMore onPress={() => {}} />
        </View>
      );
    }

    return (
      <View style={[styles.item]}>
        <ProductL
          onPress={() => navigation.navigate('ProductDetail', {data: item})}
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
  };

  useEffect(() => {
    getDataCatalog();
  }, [textSearch]);
  return (
    <View>
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
          <View style={{height: 440, backgroundColor: '#3F864E'}}>
            <ScrollView horizontal>
              <FlatList
              initialNumToRender={10}
              windowSize={5}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={50}
                data={formatData(datas, numColumns)}
                renderItem={renderItem}
                keyExtractor={item => item.variantId}
                numColumns={numColumns}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Text>Product</Text>
      <Button title="Logout" onPress={() => onlogout()} />
      <Divider />
      <Button title="Chart" onPress={() => {}} />
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
    width: 136,
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
