import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity} from 'react-native';
import {Styles} from '../Global';
import {useTheme} from '@react-navigation/native';
interface ButtonxProps {
  onPress: () => void;
  color?: string[];
  width?: number;
  height?: number;
  radius?: number;
  radiusType?:
    | 'topLeft'
    | 'topRight'
    | 'left'
    | 'right'
    | 'crosTopBottom'
    | 'crosBottomTop'
    | 'none'
    | 'all';
  title: string;
  iconRight?: React.ReactElement;
  iconLeft?: React.ReactElement;
  textStyle?: any;
}
export const CustomButton: FC<ButtonxProps> = props => {
  const {
    onPress,
    color,
    width,
    height,
    title,
    iconRight,
    iconLeft,
    textStyle,
    radius,
    radiusType,
  } = props;
  const {colors} = useTheme();
  let borderType = undefined;
  switch (radiusType) {
    case 'all':
      borderType = {borderRadius: radius ? radius : 10};
      break;
    case 'topLeft':
      borderType = {borderTopLeftRadius: radius ? radius : 10};
      break;
    case 'topRight':
      borderType = {borderTopRightRadius: radius ? radius : 10};
      break;
    case 'right':
      borderType = {
        borderTopRightRadius: radius ? radius : 10,
        borderBottomRightRadius: radius ? radius : 10,
      };
      break;
    case 'left':
      borderType = {
        borderTopLeftRadius: radius ? radius : 10,
        borderBottomLeftRadius: radius ? radius : 10,
      };
      break;
    case 'crosBottomTop':
      borderType = {
        borderTopLeftRadius: radius ? radius : 10,
        borderBottomRightRadius: radius ? radius : 10,
      };
      break;
    case 'crosTopBottom':
      borderType = {
        borderBottomLeftRadius: radius ? radius : 10,
        borderTopRightRadius: radius ? radius : 10,
      };
      break;
    default:
      borderType = undefined;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{marginVertical: 3, marginHorizontal: 5}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 2, y: 3}}
        colors={color ? color : ['#2DAA31', '#E7F9E8', '#49CF4D']}
        style={[
          Styles.ContentRow,
          {
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          },
          borderType,
          width ? {width: width} : undefined,
          height ? {height: height} : undefined,
        ]}>
        {iconLeft ? iconLeft : null}

        <View style={{marginHorizontal: 10}}>
          <Text
            style={[
              {color: colors.text},
              textStyle ? textStyle : {fontSize: 15, fontWeight: 'bold'},
            ]}>
            {title}
          </Text>
        </View>
        {iconRight ? iconRight : null}
      </LinearGradient>
    </TouchableOpacity>
  );
};
