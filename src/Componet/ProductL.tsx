import React, {FC, useEffect, useState, ReactNode} from 'react';

import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
// import {Card, Block, Icon} from 'galio-framework';
import {Divider, Image, Icon} from 'react-native-elements';
import {CurrencyFormat, LimitText} from '../Global';
import {getCatalogDetail} from '../Global/API';

import {
  ArticleType,
  ImageType,
  initItemList,
  ItemListType,
  VariantType,
} from '../Redux/Model';
import {AnyIfEmpty} from 'react-redux';
interface DataType {
  articles: ArticleType[];
  itemlists: ItemListType[];
  images: ImageType[];
  variants: VariantType[];
}

export const initImage: ImageType = {
  id: '1',
  path: require('../Assets/Images/logo.png'),
  thumbPath: require('../Assets/Images/logo.png'),
  smallThumbPath: require('../Assets/Images/logo.png'),
  default: false,
};

interface TProps {
  onPress?: () => void;
  backgroundColor?: string;
  priceColor?: string;
  data: any;
  promo?: ReactNode;
  topSpace?: ReactNode;
}

export const ProductL: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, topSpace, priceColor} = props;
  const {name, style} = data;
  const {styleId, variantId} = style[0];
  const [itemLists, setItemLists] = useState<ItemListType>(initItemList);
  const [imageView, setImage] = useState<ImageType>(initImage);

  let {normalPrice, promoPrice, salesPrice} = itemLists;
  // styleId: string, variantId: string
  const getDetail = () => {
    getCatalogDetail({
      styleId: styleId,
      variantId: variantId,
    })
      .then((data: any) => {
        setImage(data.data.images[0]);
        setItemLists(data.data.itemLists[0]);
      })
      .catch(e => alert(e));
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: backgroundColor ? backgroundColor : '#B7D7DC'},
      ]}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../Assets/Images/logo.png')} // nanti di ganti
        />
        <View style={styles.titleContainer}>
          <Text style={{fontSize: 12, paddingHorizontal: 2}}>
            {LimitText(String(name), 35)}
          </Text>
        </View>
        {/* ====Promo discount======= */}
        {promoPrice != null ? (
          <View style={styles.promoContainer}>
            <View style={styles.discountBox}>
              <Text style={styles.promoText}>
                - {(Number(promoPrice) / Number(normalPrice)) * 100} %
              </Text>
            </View>

            <Text
              style={[styles.promoText, {textDecorationLine: 'line-through'}]}>
              {CurrencyFormat(Number(normalPrice))}
            </Text>
          </View>
        ) : null}

        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.textPrice,
              {
                color: priceColor ? priceColor : '#040B12',
                marginVertical: promoPrice != null ? 3 : 7,
              },
            ]}>
            {CurrencyFormat(Number(salesPrice))}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {promo}
          <View style={styles.starContainer}>
            <Icon name="star" type="FontAwesome" color="#EC7C12" size={17} />
            <Text style={{fontSize: 11}}>: 5</Text>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', left: 5, top: 3}}>{topSpace}</View>
    </TouchableOpacity>
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
