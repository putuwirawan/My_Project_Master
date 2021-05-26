import React, {FC} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

interface TProps {
  onPress?: () => void;
  color?: string;
}

export const ShowMore: FC<TProps> = props => {
  const {onPress, color} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <View
        style={{
          borderWidth: 2,
          padding: 5,
          borderRadius: 10,
          backgroundColor: '#82EC9E',
          borderColor: '#E61111',
        }}>
        <Icon name="logo-youtube" type="ionicon" color="#791190" size={40} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#290610',
            fontStyle: 'italic',
          }}>
          Show More
        </Text>
      </View>
    </TouchableOpacity>
  );
};
