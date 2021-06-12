import React from 'react';
import {FC} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';

import {ImageSource} from 'react-native-vector-icons/Icon';
import {Image} from 'react-native-elements';
interface SearchProps {
  onPress?: () => void;
  height?: number;
  width?: number;
  brandLogo?: ImageSource;
  backgroundColor?: string;
}

export const ButtonIcon: FC<SearchProps> = props => {
  const {onPress, height, width, brandLogo, backgroundColor} = props;
  return (
    <TouchableOpacity onPress={()=>onPress}>
      <View
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#4F5150',
          padding: 3,
          borderRadius: 10,
          marginHorizontal: 2,
        }}>
        {brandLogo ? (
          <Image
            source={brandLogo}
            style={{
              height: height ? height : 40,
              width: width ? width : 45,
              resizeMode: 'stretch',
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
