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
  numCollumn?: number;
  onSelec?: Function;
  onShowMore?: Function;
}

export const RowView: FC<TProps> = props => {
  const {data, onSelec, onShowMore, numCollumn} = props;
  const numColumns = numCollumn ? numCollumn : 3;





  return (
 <View>
     <Text>kopi</Text>
 </View>
  );
};
