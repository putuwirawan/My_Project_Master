import React, {FC} from 'react';

import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {ButtonBrand} from './BrandButton';
import {catalogType, getCatalog} from '../Global/API';
import {BrandModel} from '../Global/Example/Brand';
import {CategoryModel} from '../Global/Example/Category';

const {width, height} = Dimensions.get('screen');
interface SearchProps {
  data: CategoryModel[];
  onSelec: Function;
}
const itemWide = 50;
export const CategoryList: FC<SearchProps> = props => {
  const {data, onSelec} = props;

  let numCollum = Math.floor(width / (itemWide + 4));

  const formatData = (data: CategoryModel[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({id: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  const renderItem = ({item}: {item: CategoryModel}) => {
    if (item.empty === true) {
      return <View style={[styles.item]} />;
    }

    return (
      <View style={[styles.item]}>
        <TouchableOpacity onPress={() => onSelec(item)}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={
                item.url ? item.url : require('../Assets/Images/love.png')
              }
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 7}}>{item.deskription}</Text>
          </View>
        </TouchableOpacity>
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
        keyExtractor={item => item.id}
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
    width: itemWide,
    marginHorizontal: 2,
    marginVertical: 3,
    padding: 2,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
