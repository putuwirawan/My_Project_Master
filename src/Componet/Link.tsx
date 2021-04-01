import React from 'react';
import {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface LinkxProps {
  onPress?: () => void;
  color?: string;
  text?: string;
}

export const Link: FC<LinkxProps> = ({
  onPress,
  color,

  text,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Text
        style={{
          color: color ? color : '#ffff',
          textAlign: 'center',
          fontSize: 13,
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginHorizontal: 10,
        }}>
        {text ? text : ''}
      </Text>
    </TouchableOpacity>
  );
};
