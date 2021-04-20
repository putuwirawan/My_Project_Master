import React from 'react';
import {FC} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Block, Button} from 'galio-framework';

import {Image} from 'react-native-elements';
import {CurrencyFormat, LimitText} from '../Global';
import {SlidingImage} from './SlidingImage';
import {SafeAreaView} from 'react-native-safe-area-context';

interface TProps {
  onPress?: () => void;
  backgroundColor?: string;
  priceColor?: string;
  data: any;
  promo?: React.ReactNode;
}

export const ProductD: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, priceColor} = props;
  const {width} = Dimensions.get('screen');
  const {height} = Dimensions.get('screen');
  const images = [
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?sea',
    'https://source.unsplash.com/1024x768/?moon',
    'https://source.unsplash.com/1024x768/?tree', // Network image
  ];
  let promoPrice = 500000;
  let normalPrice = 600000;

  return (
    <View style={{}}>
      <SafeAreaView style={{marginBottom: 50}}>
        <ScrollView>
          <Block card center safe>
            <SlidingImage images={images} />

            <Block width={0.88 * width}>
              <Text style={{fontSize: 14, paddingHorizontal: 2}}>
                {LimitText(
                  'Kopi susu meseduh duaffg dsdsdsdsd ssdsdsdsd sdsdsdsds dsds dsdsdsds sdsdsdsd sdsdsdsds aaasasa dsdsd hh ng cangkir',
                  90,
                )}
              </Text>
            </Block>
            <View
              style={{
                width: 0.88 * width,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 2,
                  justifyContent: 'space-between',
                }}>
                <Block card shadow right>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#F3D0DA',
                      borderRadius: 2,
                      paddingHorizontal: 2,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 14, color: '#691A31'}}>40%</Text>
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
                  {CurrencyFormat(normalPrice)}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: priceColor ? priceColor : '#040B12',
                  }}>
                  {CurrencyFormat(promoPrice)}
                </Text>
              </View>
            </View>
          </Block>
          <View style={{height: 100, backgroundColor: 'green'}}>
            <Text>KATUL</Text>
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
          justifyContent:'space-evenly',
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
