import React from 'react';
import {FC} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';

import {ImageSource} from 'react-native-vector-icons/Icon';
import {Image} from 'react-native-elements';
import {stringify} from 'qs';
interface SearchProps {
  onPress: () => void;
  height?: number;
  width?: number;
  data: any;

  backgroundColor?: string;
}

export const ButtonBrand: FC<SearchProps> = props => {
  const {onPress, height, width, data, backgroundColor} = props;
  const url = data.url;

  return (
    <TouchableOpacity onPress={onPress} style={{marginHorizontal: 3}}>
      <View
        style={[{
          backgroundColor: backgroundColor ? backgroundColor : 'transparent',
          paddingHorizontal: 5,
          paddingVertical: 3,
          borderRadius: 10,
          opacity:.8
        }]}>
        <Image
          source={url}
          style={{
            borderRadius: 10,
            height: height ? height : 20,
            width: width ? width : 70,
            resizeMode: 'center',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
