import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  RefreshControl,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import {Block, Button} from 'galio-framework';
import {Button, Image} from 'react-native-elements';
import {CurrencyFormat, LimitText, Styles} from '../Global';
import {SlidingImage} from './SlidingImage';
import {SafeAreaView} from 'react-native-safe-area-context';
// import ImageResizer from 'react-native-image-resizer';
import {
  ArticleType,
  ItemListType,
  VariantType,
  initItemList,
  LoginState,
} from '../Redux/Model';
import {createCart, getCatalogDetail} from '../Global/API';

import {Block} from 'galio-framework';
import {orderBy} from 'json-function';
import {RootState} from '../Redux/Reducers';
import {useSelector} from 'react-redux';
import Albums, {AlbumModel} from '../Global/Example/Albums';
import {SlideAnimate} from '.';
interface DataType {
  name: string;
  style: any;
}
interface TProps {
  onPress?: () => void;
  backgroundColor?: string;
  priceColor?: string;
  data: DataType;
  promo?: React.ReactNode;
}
const {width, height} = Dimensions.get('screen');
export const ProductD: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, priceColor} = props;
  const {name, style} = data;
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [slectedVariant, setSelectedVariant] = useState<number>(0);
  const [slectedarticle, setSelectedArticle] = useState<number>(0);
  const [slectedStore, setSelectedStore] = useState<number>(0);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [itemLists, setItemLists] = useState<ItemListType[]>([initItemList]);
  const [normalPrice, setNormalPrice] = useState<number>(0);
  const [promoPrice, setPromoPrice] = useState<number>(0);
  const [salesPrice, setSalesPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [qtyOrder, setQtyOrder] = useState<number>(0);
  const [isvalidQty, setisvalidQty] = useState<boolean>(true);
  const [images, setImages] = useState<AlbumModel[]>(Albums);
  const imagess = [
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    'https://www.dailycameranews.com/wp-content/uploads/2018/08/nikon-z7-sample-image-6.jpg',
    'https://buzz16.com/wp-content/uploads/2017/04/Reflection-Photography-Examples-13.jpeg',
    'https://static.photocrowd.com/upl/63/cms.ze5PXRQBqmpzLEf40OrA-collection_cover.jpeg',
    'https://kbob.github.io/images/sample-4.jpg',
    'https://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg',
    'https://www.watermark-image.com/watermarking-examples/pixabay.com-en-desert-flower-landscape-mountains-82403.jpg', // Network image
  ];

  const getDataDetail = async (styleId: string, variantId: string) => {
    await getCatalogDetail({styleId: styleId, variantId: variantId})
      .then(async response => {
        let newArticle: any = orderBy(response.data.articles, 'sizeCode');
        let newImages: string[] = [];
        if (response.data.images.length > 0) {
          await response.data.images.map((item: any, j: number) => {
            newImages.push(item.path);
          });
          // setImages(newImages);
        }

        setArticles(newArticle);
        setItemLists(response.data.itemLists);
      })
      .catch(e => {
        alert('Network not Available');
      });
  };
  let changePrice = async () => {
    setSalesPrice(Number(itemLists[slectedStore].salesPrice));
    if (itemLists[slectedStore].normalPrice != null) {
      setNormalPrice(Number(itemLists[slectedStore].normalPrice?.price));
    }
    if (itemLists[slectedStore].promoPrice != null) {
      setPromoPrice(Number(itemLists[slectedStore].promoPrice?.price));
    }
    setStock(Number(itemLists[slectedStore].stock));
  };
  const onRefreshPage = () => {
    setRefreshing(true);
    getDataDetail(
      style[slectedVariant].styleId,
      style[slectedVariant].variantId,
    ).then(() => {
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getDataDetail(
      style[slectedVariant].styleId,
      style[slectedVariant].variantId,
    );
  }, [slectedVariant]);
  useEffect(() => {
    changePrice();
  }, [itemLists, slectedStore]);
  return (
    <View style={{height, width}}>
      <SafeAreaView style={{marginBottom: 50, opacity: showModal ? 0.5 : 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshPage} />
          }>
          <View style={styles.container}>
            <View style={styles.imageDiv}>
              <SlidingImage images={imagess} imageWidth={width - 12} />
            </View>
            <View style={styles.titleDiv}>
              <Text style={{fontSize: 17, paddingHorizontal: 2}}>
                {LimitText(String(name), 90)}
              </Text>
            </View>
            <View style={styles.priceDiv}>
              <View style={styles.discountDiv}>
                <View>
                  <View style={styles.discountBox}>
                    <Text style={{fontSize: 17, color: '#691A31'}}>44%</Text>
                  </View>
                </View>
                <Text style={styles.textDiscount}>
                  {CurrencyFormat(600000)}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.textPrice}>
                  {CurrencyFormat(Number(salesPrice))}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 150,

                marginVertical: 5,
                paddingHorizontal: 10,
              }}>
              <View style={styles.varianDiv}>
                {data.style.map((item: VariantType, index: number) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.thumImageDiv,
                        {
                          borderWidth: slectedVariant === index ? 1 : 0,
                          opacity: slectedVariant === index ? 1 : 0.6,
                        },
                      ]}>
                      <Image
                        source={{
                          // uri: item.imageThumbPath,
                          uri: 'https://source.unsplash.com/1024x768/?tree',
                        }}
                        containerStyle={styles.imageThum}
                        onPress={() => {
                          setSelectedVariant(index);
                        }}
                      />
                      <Text style={{fontSize: 11, textAlign: 'center'}}>
                        {item.variantCode.split(`${item.styleCode}-`)}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View>
                <Text>Stock : {stock}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Size : </Text>
                {articles.map((article, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{marginHorizontal: 5}}
                      onPress={() => setSelectedArticle(i)}>
                      <View
                        style={{
                          backgroundColor:
                            slectedarticle == i ? '#509EBF' : '#A4CDC9',
                          borderRadius: 5,
                          paddingHorizontal: 5,
                        }}>
                        <Text style={styles.description}>
                          {article.sizeDescription}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={[Styles.ContentRow, Styles.center]}>
                <Text>Store Location :</Text>
                <Picker
                  style={styles.piker}
                  mode="dropdown"
                  selectedValue={slectedStore}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedStore(itemIndex);
                  }}>
                  {itemLists.length > 0
                    ? itemLists.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.description}
                            value={item.warehouseId}
                            style={styles.pikerItem}
                          />
                        );
                      })
                    : null}
                </Picker>
              </View>
            </View>
            <View style={{height: 200, width: '100%', backgroundColor: 'red'}}>
              <Text>Kopi</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.bottomContent]}>
        <Button
          onPress={() => {
            setShowModal(true);
          }}
          title=" Add to Cart"
          icon={{name: 'cart', type: 'ionicon', size: 22, color: '#9AF9D0'}}
          buttonStyle={[styles.button, {backgroundColor: '#09A64D'}]}
        />

        <Button
          onPress={() => {}}
          title="Pay Now"
          icon={{
            name: 'receipt-outline',
            type: 'ionicon',
            size: 22,
            color: '#89ED15',
          }}
          buttonStyle={[styles.button, {backgroundColor: '#DE9413'}]}
        />
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
       >
        <View style={{backgroundColor: '#97B4FA', height: '60%', padding: 5}}>
          <Block center fluid card>
            <Image
              source={{
                uri: 'https://source.unsplash.com/1024x768/?tree',
              }}
              containerStyle={{
                width: 120,
                height: 120,
              }}
            />
            <Text style={{fontSize: 11}}>{name}</Text>
          </Block>
          <View style={{marginVertical: 10}}>
            <Text>Available Stock: {stock} </Text>
            <Text>
              Produck Name :{' '}
              {articles.length > 0
                ? articles[slectedarticle].articleDescription
                : ''}{' '}
            </Text>
            <Text>
              Size :{' '}
              {articles.length > 0
                ? articles[slectedarticle].sizeDescription
                : ''}{' '}
            </Text>
            <Text>
              Store Location :{' '}
              {itemLists.length > 0 ? itemLists[slectedStore].description : ''}{' '}
            </Text>
            <Text>Price : {CurrencyFormat(salesPrice)} </Text>
          </View>
          <View
            style={[
              Styles.ContentRow,
              {
                justifyContent: 'space-between',
                position: 'absolute',
                bottom:10,
                width: '100%',
                paddingHorizontal: 10,
              },
            ]}>
            <Button
              title="Add Now"
              buttonStyle={{
                backgroundColor: '#41AA1E',
                borderRadius: 20,
                height: 30,
                borderWidth:2,
                borderColor:'red'
              }}
              icon={{name: 'cart', type: 'ionicon', size: 20, color: '#6C1A74'}}
              onPress={async () => {
                const newCart = {
                  qty: 1,
                  currencyId: '43b11d95-a96c-4f30-8a95-34c33377efba',
                  warehouseId: itemLists[slectedStore].warehouseId,
                  articleId: itemLists[slectedStore].articleId,
                  remarks: '',
                };
                if (stock <= 0) {
                  alert('Out of Stock');
                } else {
                  const result = await createCart(newCart);
                  if (result) {
                    alert('Success adding Cart');
                    setShowModal(false);
                  } else {
                    alert('Failed adding Cart');
                    setShowModal(false);
                  }
                }
              }}
            />

            <Button
              onPress={() => setShowModal(false)}
              title="Cancel"
              buttonStyle={{
                backgroundColor: '#B8402B',
                borderRadius: 20,
                height: 30,
              }}
              icon={{
                name: 'close-circle-outline',
                type: 'ionicon',
                size: 20,
                color: '#E8E8E8',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    marginHorizontal: 5,
  },
  bottomContent: {
    position: 'absolute',
    top: height - 130,
    height: 50,
    width: width,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    padding: 3,
    elevation: 1,
  },
  priceDiv: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#4C25E6',
  },
  discountDiv: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
  discountBox: {
    height: 38,
    width: 40,
    backgroundColor: '#F3D0DA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 138,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#03421F',

    elevation: 5,
    opacity: 0.8,
  },
  description: {fontSize: 12, fontStyle: 'italic'},
  imageDiv: {
    height: 230,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1111',
  },
  titleDiv: {width: '100%', padding: 10},
  piker: {
    width: '60%',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
  },
  pikerItem: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A3946',
  },
  thumImageDiv: {
    borderColor: 'blue',
    marginLeft: 5,
    alignItems: 'center',
  },
  imageThum: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textDiscount: {
    textDecorationLine: 'line-through',
    color: '#E45454',
    fontStyle: 'italic',
    fontSize: 15,
    textShadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    marginLeft: 10,
  },
  textPrice: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
  },
  varianDiv: {flexDirection: 'row'},
});
