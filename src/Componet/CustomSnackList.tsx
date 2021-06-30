import React, {FC, useEffect, useState} from 'react';
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
import Albums2 from '../Global/Example/Albums2';
interface TProps {
  data: any;
  numCollumn: number;
  onSelec: Function;
  onShowMore: Function;
}

export const CustomSnackList: FC<TProps> = props => {
  const {data, onSelec, onShowMore, numCollumn} = props;
  const numColumns = numCollumn;
  const [datas, setDatas] = useState([]);
  const [row, setRow] = useState(0);
  const [datalop, setdatalop] = useState([]);

  const formatData = () => {
    let newData = data;
    newData.push({id: `showMore`, empty: false});

    const numberOfFullRows = Math.floor(newData.length / numColumns);
    let numberOfElementsLastRow =
      newData.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      newData.push({id: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return {resData: newData, numRow: numberOfFullRows + 1};
  };

  const renderItem = (datarender: any[]) => {
    let myloop: any[] = [];
    for (let i = 0; i < row; i++) {
      let myData = datarender.slice(i * numCollumn, (i + 1) * numCollumn);
      myloop.push(myData);
    }

    return (
      <View>
        {myloop.map((item, i) => {
          return (
            <ScrollView
              key={i}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {item.map((childItem: any, k: number) => {
                if (childItem.id === 'showMore') {
                  return (
                    <View style={[styles.item]} key={k}>
                      <ShowMore
                        onPress={() => {
                          onShowMore();
                        }}
                      />
                    </View>
                  );
                }
                if (childItem.empty === true) {
                  return (
                    <View
                      style={[styles.item, {borderWidth: 0}]}
                      key={k}></View>
                  );
                }
                return (
                  <TouchableOpacity style={[styles.item]} key={k}>
                    <ProductItem
                      data={childItem}
                      onSelect={() => onSelec(childItem)}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          );
        })}
      </View>
    );
  };
  useEffect(() => {
    const newdata = formatData();
    const {resData, numRow} = newdata;
    setDatas(resData);
    setRow(numRow);
  }, []);

  return <ScrollView>{renderItem(datas)}</ScrollView>;
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
