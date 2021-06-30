import React, {FC} from 'react';

import {View, ScrollView, Dimensions, StyleSheet, FlatList} from 'react-native';
import {ButtonBrand} from './BrandButton';
import {catalogType, getCatalog} from '../Global/API';
import {BrandModel} from '../Global/Example/Brand';

const {width, height} = Dimensions.get('screen');
interface SearchProps {
  data: any;
  onSelec: Function;
}
const brandWide = 70;
export const BrandList: FC<SearchProps> = props => {
  const {data, onSelec} = props;

  let numCollum = Math.floor(width / (brandWide + 20));

  // let dataOption: catalogType = {
  //   flags: 1,
  //   sortOrder: 'DESC',
  //   pageIndex: 0,
  //   pageSize: 20,
  //   brands: '',
  //   filter: '',
  // };

  // const getDataByBrand = async (brand: string) => {
  //   dataOption.brands = '';
  //   dataOption.filter = '';
  //   await getCatalog(dataOption)
  //     .then(res => {
  //       onSelec(res, brand);
  //     })
  //     .catch(e => alert(e));
  // };

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

  const renderItem = ({item}: {item: any}) => {
    if (item.empty === true) {
      return <View style={[styles.item]} />;
    }

    return (
      <View style={[styles.item]}>
        <ButtonBrand
          width={brandWide}
          data={item}        
          onPress={() =>  onSelec(item)}
        />
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <FlatList
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={50}
      data={formatData(data, numCollum)}
      renderItem={renderItem}
      keyExtractor={item => item.code}
      numColumns={numCollum}
    />
  </ScrollView>

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
    width: brandWide + 20,
    marginVertical:3
 
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
