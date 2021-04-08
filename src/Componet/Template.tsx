import React from 'react';
import {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface TProps {
  onPress?: () => void;
  color?: string;
  text?: string;
}

export const Link: FC<TProps> = props => {
  const {onPress, color, text} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Text>Ngacuh</Text>
    </TouchableOpacity>
  );
};
