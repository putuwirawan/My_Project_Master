import React from 'react';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Card, Block, Icon} from 'galio-framework';
import {Divider, Image} from 'react-native-elements';
import {CurrencyFormat, LimitText} from '../Global';

interface TProps {
  onPress?: () => void;
  backgroundColor?: string;
  priceColor?: string;
  data: any;
  promo?: React.ReactNode;
}

export const ProductL: FC<TProps> = props => {
  const {onPress, backgroundColor, data, promo, priceColor} = props;
  let _image =
    'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300';
  let promoPrice = 500000;
  let normalPrice = 600000;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 2,
        marginLeft: 3,
        backgroundColor: backgroundColor ? backgroundColor : '#69A9E1',
        borderRadius: 5,
      }}>
      <Block card center>
        <Image
          source={{uri: _image}}
          style={{width: 120, height: 110, margin: 2, resizeMode: 'stretch'}}
        />
        <View
          style={{
            alignItems: 'center',
            width: 120,
            marginBottom: 2,
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 12, paddingHorizontal: 2}}>
            {LimitText('Kopi susu meseduh duaffghh ng cangkir', 35)}
          </Text>
        </View>

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
        <Block row space="around" fluid width={100}>

          <Text style={{fontSize:11}}>Stock : 5</Text>
          <Text style={{fontSize: 11}}>Terjual: 5</Text>
        </Block>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: '700',
              color: priceColor ? priceColor : '#040B12',
            }}>
            {CurrencyFormat(promoPrice)}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            width: 120,
            height:25,
            marginBottom: 2,
            flexDirection: 'row',justifyContent:'space-between'
          }}>
          {promo ? promo : null}
          <Block row width={50} center>
            <Icon name="star" family="FontAwesome" color="#EC7C12" size={17} />
            <Text style={{fontSize: 11}}>: 5</Text>
          </Block>
        </View>
      </Block>
    </TouchableOpacity>
  );
};
