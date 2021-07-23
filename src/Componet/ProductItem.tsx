import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

interface TProps {
  data: any;
  onSelect: Function;
}
export const ProductItem: FC<TProps> = props => {
  const {data, onSelect} = props;
  // const {name, style} = data;
  //const image = {uri: data.thumbnailUrl};
   const image = require('../Assets/Images/sample-backpak.jpg')
  const [price, setPrice] = useState('0');

  return (
    <View style={styles.content}>
      <Image
        source={image}
        style={{width: 100, height: 100, resizeMode: 'contain'}}
      />
      <Text>{data.name}</Text>
      <Text>{price}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    borderRadius: 10,
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 2,
  },
  image: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 5,
    margin: 3,
  },
  titleContainer: {
    alignItems: 'center',
    width: 120,
    marginVertical: 3,
    borderBottomWidth: 1,
  },
  promoText: {
    color: '#8C2341',
    fontStyle: 'italic',
    fontSize: 10,
    marginHorizontal: 5,
  },
  promoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
  discountBox: {
    backgroundColor: '#F3D0DA',
    borderRadius: 2,
    padding: 1,
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  textPrice: {
    fontSize: 15,
    fontWeight: '700',
  },
  bottomContainer: {
    alignItems: 'center',
    width: 120,
    height: 25,
    marginBottom: 2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  starContainer: {
    width: 50,
    alignItems: 'center',
    flexDirection: 'row',
    right: -50,
    position: 'relative',
  },
});
