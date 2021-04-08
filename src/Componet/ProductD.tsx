import React from 'react';
import {FC} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Card, Block} from 'galio-framework';
import {Image} from 'react-native-elements';
import {CurrencyFormat, LimitText} from '../Global';
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
  let _image =
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300';
  let promoPrice = 500000;
  let normalPrice = 600000;
  return (
    <Block fluid safe width={width}>
      <Block card center>
        <Image
          source={{uri: _image}}
          style={{
            width: 0.9 * width,
            height: 0.6 * width,
            margin: 2,
            resizeMode: 'stretch',
          }}
        />
        <Block width={0.88 * width} >
          <Text style={{fontSize: 14, paddingHorizontal: 2}}>
            {LimitText(
              'Kopi susu meseduh duaffg dsdsdsdsd ssdsdsdsd sdsdsdsds dsds dsdsdsds sdsdsdsd sdsdsdsds aaasasa dsdsd hh ng cangkir',
              90,
            )}
          </Text>
        </Block>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 2,
            justifyContent: 'space-between',
          }}>
          <Block card shadow right>
            <View
              style={{backgroundColor: '#F3D0DA', borderRadius: 2, padding: 1}}>
              <Text style={{fontSize: 11, color: '#691A31'}}>40%</Text>
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
              fontWeight: '700',
              color: priceColor ? priceColor : '#040B12',
            }}>
            {CurrencyFormat(promoPrice)}
          </Text>
        </View>
      </Block>
    </Block>
  );
};
