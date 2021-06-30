import React, {FC} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getCatalogArticle, getCatalogDetail} from '../Global/API';
import {ProductItem} from './ProductItem';
import {ProductL} from './ProductL';
import {ShowMore} from './ShowMore';

interface TProps {
  data: any;
  onSelec: Function;
  onShowMore: Function;
}

export const SnackList: FC<TProps> = props => {
  const {data, onSelec, onShowMore} = props;
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

  const renderItem = (props: any) => {
    const {item} = props;
    const {name, style} = item;

    if (item.empty === true) {
      return (
        <View style={[styles.item]}>
          <ShowMore
            onPress={() => {
              onShowMore();
            }}
          />
        </View>
      );
    }
    return (
     
      <View style={[styles.item]}>
        <ProductItem data={item} onSelect={(res: any) => onSelec(res)} />
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
        data={formatData(data, numColumns)}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.variantId}
        numColumns={numColumns}
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
