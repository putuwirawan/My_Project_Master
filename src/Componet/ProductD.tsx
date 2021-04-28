import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Block, Button} from 'galio-framework';
import {innerJoin, where} from 'json-function';
import {Image} from 'react-native-elements';
import {CurrencyFormat, LimitText} from '../Global';
import {SlidingImage} from './SlidingImage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArticleType,
  ImageType,
  ItemListType,
  VariantType,
  initItemList,
} from '../Redux/Model';
import {getCatalogArticle, getCatalogDetail} from '../Global/API';
interface DataType {
  articles: ArticleType[];
  itemLists: ItemListType[];
  images: ImageType[];
  variants: VariantType[];
}
interface TProps {
  onPress?: () => void;
  backgroundColor?: string;
  priceColor?: string;
  data: any;
  promo?: React.ReactNode;
}
const initDataDetail: DataType = {
  articles: [],
  itemLists: [],
  images: [],
  variants: [],
};

export const ProductD: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, priceColor} = props;
  const {name, style} = data;
  const {width} = Dimensions.get('screen');
  const {height} = Dimensions.get('screen');

  const [detailData, setDetailData] = useState<DataType>(initDataDetail);
  const [itemListView, setItemListView] = useState<ItemListType>(initItemList);
  const [articleIndex, setArticleIndex] = useState<number>(0);
  const [locationIndex, setLocationIndex] = useState<number>(0);
  const {articles, itemLists, variants} = detailData;
  let {articleId, code, normalPrice, promoPrice, salesPrice} = itemListView;
  const images = [
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?sea',
    'https://source.unsplash.com/1024x768/?moon',
    'https://source.unsplash.com/1024x768/?tree', // Network image
  ];

  const getDetail = async (styleId: string, variantId: string) => {
    const reqData = await getCatalogDetail({
      styleId: styleId,
      variantId: variantId,
    });
    let {data, header} = reqData;

    setDetailData(data);
    setItemListView(data.itemLists[0]);
  };
  const changeItemlist = async (i: number) => {
    setItemListView(itemLists[i]);
  };
  useEffect(() => {
    getDetail(style[0].styleId, style[0].variantId);
  }, []);

  return (
    <View style={{}}>
      <SafeAreaView style={{marginBottom: 50}}>
        <ScrollView>
          <Block card center safe>
            <SlidingImage images={images} />

            <Block width={0.88 * width}>
              <Text style={{fontSize: 14, paddingHorizontal: 2}}>
                {LimitText(String(name), 90)}
              </Text>
            </Block>
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
                <Block card fluid>
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
                </Block>
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
              height: 120,

              marginVertical: 5,
              paddingHorizontal: 10,
            }}>
            <SafeAreaView>
              <ScrollView horizontal>
                {variants.map((variant: VariantType, i: number) => {
                  return (
                    <TouchableOpacity key={i} style={{marginHorizontal: 5}}>
                      <View>
                        <Image
                          source={{
                            uri: 'https://source.unsplash.com/1024x768/?sea',
                          }}
                          style={{width: 50, height: 50}}
                        />
                        <Text style={{fontSize: 9, alignSelf: 'center'}}>
                          {String(variant.colorDescription)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </SafeAreaView>
            <View>
              <Text>Stock : {itemListView.stock}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Size : </Text>
              {articles.map((article, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{marginHorizontal: 5}}
                    onPress={() => changeItemlist(i)}>
                    <View
                      style={{
                        backgroundColor: '#A4CDC9',
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}>
                      <Text style={{fontSize: 12, fontStyle: 'italic'}}>
                        {article.sizeDescription}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{height: 100, backgroundColor: 'navy'}}>
            <Text>KATUL</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>KATUL</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'orange'}}>
            <Text>KATUL</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 50,
          paddingHorizontal: 5,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <Button
          onlyIcon
          color="info"
          icon="logo-whatsapp"
          iconFamily="ionicon"
          iconSize={14}></Button>
        <Button
          color="success"
          icon="cart"
          iconFamily="ionicon"
          iconSize={14}
          round>
          Add to Cart
        </Button>
        <Button
          color="#C74A30"
          icon="receipt-outline"
          iconFamily="ionicon"
          iconSize={14}
          round>
          Pay Now
        </Button>
      </View>
    </View>
  );
};
