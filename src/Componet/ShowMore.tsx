import React, {FC} from 'react';

import {Text, View,Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

interface TProps {
  onPress:()=>void;
  color?: string;
}

export const ShowMore: FC<TProps> = props => {
  const {onPress, color} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <View style={{alignItems: 'center', width: 100}}>
        <View
          style={{
            borderWidth: 1,
            borderBottomWidth: 0,
            width: 45,
            height:45,
            borderRadius: 45/2,
            backgroundColor: '#000012',
            borderColor: '#E61111',
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Image source={require('../Assets/Images/logo.png')} style={{height:30,width:30}}/>
          {/* <Icon name="logo-youtube" type="ionicon" color="#791190" size={30} /> */}
        </View>

        <View
          style={{
            borderWidth: 2,
            padding: 5,
            borderRadius: 10,
            backgroundColor: '#82EC9E',
            borderColor: '#E61111',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: '#290610',
              fontStyle: 'italic',
             
            }}>
            {` Show More >> `}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
