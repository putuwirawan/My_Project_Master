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

export const ProductD: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, priceColor} = props;
  const {name, style} = data;
  const {width} = Dimensions.get('screen');
  const {height} = Dimensions.get('screen');
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
  const [images, setImages] = useState<string[]>([]);
  const imagess = [
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?sea',
    'https://source.unsplash.com/1024x768/?moon',
    'https://source.unsplash.com/1024x768/?tree', // Network image
  ];
  const {loginUser, errorLogin, isLogin}: LoginState = useSelector(
    (state: RootState) => state.loging,
  );
  const handleQtyOrder = (qty: string) => {
    if (stock < Number(qty)) {
      setisvalidQty(false);
    } else {
      setisvalidQty(true);
    }
  };
  let getDataDetail = async (styleId: string, variantId: string) => {
    await getCatalogDetail({styleId: styleId, variantId: variantId})
      .then(async response => {
        let newArticle: any = orderBy(response.data.articles, 'sizeCode');
        let newImages: string[] = [];
        if (response.data.images.length > 0) {
          await response.data.images.map((item: any, j: number) => {
            newImages.push(item.path);
          });
          setImages(newImages);
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
    <View>
      <SafeAreaView style={{marginBottom: 50, opacity: showModal ? 0.5 : 1}}>
        <ScrollView>
          <Block center fluid card>
            <SlidingImage images={imagess} />

            <View style={{width: '80%'}}>
              <Text style={{fontSize: 14, paddingHorizontal: 2}}>
                {LimitText(String(name), 90)}
              </Text>
            </View>
            <View
              style={{
                width: 0.88 * width,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 2,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#F3D0DA',
                      borderRadius: 5,

                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 11, color: '#691A31'}}>44%</Text>
                  </View>
                </View>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    color: '#8C2341',
                    fontStyle: 'italic',
                    fontSize: 13,
                    marginLeft: 10,
                  }}>
                  {CurrencyFormat(600000)}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: priceColor ? priceColor : '#040B12',
                  }}>
                  {CurrencyFormat(Number(salesPrice))}
                </Text>
              </View>
            </View>
          </Block>

          <View
            style={{
              height: 150,

              marginVertical: 5,
              paddingHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              {data.style.map((item: VariantType, index: number) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderWidth: slectedVariant == index ? 1 : 0,
                      borderColor: 'blue',
                      marginLeft: 5,
                      alignItems: 'center',
                      opacity: slectedVariant == index ? 1 : 0.8,
                    }}>
                    <Image
                      source={{
                        uri: 'https://source.unsplash.com/1024x768/?tree',
                      }}
                      containerStyle={{
                        width: 50,
                        height: 50,
                      }}
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
                style={{
                  width: '60%',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingTop: 5,
                }}
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
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#1A3946',
                          }}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>
          </View>
          <View style={{height: 100, backgroundColor: 'grey'}}></View>
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.bottomContent]}>
        <Button
          onPress={() => {
            setShowModal(true);
          }}
          title=" Add to Cart"
          icon={{name: 'cart', type: 'ionicon', size: 14}}
        />

        <Button
          onPress={() => {}}
          title="Pay Now"
          icon={{name: 'receipt-outline', type: 'ionicon', size: 14}}
        />
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        style={{height: '70%', backgroundColor: 'yellow'}}>
        <View style={{backgroundColor: '#E5EEEE', height: '50%', padding: 5}}>
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
            {/* <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  marginHorizontal: 10,
                  backgroundColor: 'yellow',
                }}>
                <TouchableOpacity>
                  <Icon
                    name="remove-circle-outline"
                    type="ionIcon"
                    size={25}
                    onPress={() => {}}
                  />
                </TouchableOpacity>

                <Input
                  keyboardType="numeric"
                  inputContainerStyle={{
                    width: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  placeholder="qty order"
                  onChangeText={text => {
                    let newValue = text.replace(/[^0-9]/g, '');
                    setQtyOrder(Number(newValue));
                  }}
                  onEndEditing={e => handleQtyOrder(e.nativeEvent.text)}
                  errorMessage={!isvalidQty ? 'Not Available' : ''}
                  value={String(qtyOrder)}
                />
                <TouchableOpacity>
                  <Icon
                    name="add-circle-outline"
                    type="ionicon"
                    size={25}
                    onPress={() => {}}
                  />
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
          <View
            style={[
              Styles.ContentRow,
              {
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
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
              }}
              icon={{name: 'cart', type: 'ionicon', size: 20, color: '#6C1A74'}}
              onPress={async () => {
                const newCart = {
                  qty: 1,
                  currencyId: '43b11d95-a96c-4f30-8a95-34c33377efba',
                  warehouseId: itemLists[slectedStore].warehouseId,
                  articleId: itemLists[slectedStore].articleId,
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
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  description: {fontSize: 12, fontStyle: 'italic'},
});
