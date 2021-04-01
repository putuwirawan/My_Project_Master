import React from 'react';
import {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Styles} from '../Global';
import {useTheme} from '@react-navigation/native';

interface ButtonxProps {
  onPress?: () => void;
  color?: string[];
  width?: number;
  hight?: number;
  iconName?: string;
  title?: string;
  iconSize?: number;
  radius?: number;
  iconRight?: boolean;
  iconLeft?: boolean;
  iconType?: string;
  iconBackgroundColor?: string;
  textStyle?: any;
  iconColor?: string;
}
export const Button: FC<ButtonxProps> = props => {
  const {
    onPress,
    color,
    width,
    hight,
    iconName,
    iconType,
    title,
    iconSize,
    radius,
    iconRight,
    iconLeft,
    iconColor,
    iconBackgroundColor,
    textStyle,
  } = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 4}}
        colors={color ? color : [colors.primary, '#80C0AB']}
        style={[
          Styles.ContentRow,
          width ? {width: width} : null,
          hight ? {height: hight} : null,
          radius ? {borderRadius: radius} : null,
          {padding: 5},
        ]}>
        {iconLeft ? (
          <View
            style={[
              Styles.center,
              Styles.icon,
              iconBackgroundColor
                ? {backgroundColor: iconBackgroundColor}
                : null,
            ]}>
            <Icon
              name={iconName ? iconName : 'home-outline'}
              type={iconType ? iconType : 'ionicon'}
              color={iconColor ? iconColor : colors.border}
              size={iconSize ? iconSize : 25}
            />
          </View>
        ) : null}

        <View style={{flex: 5, paddingLeft: 10}}>
          <Text style={[{color: colors.text}, textStyle ? textStyle : null]}>
            {title}
          </Text>
        </View>
        {iconRight ? (
          <View
            style={[
              Styles.center,
              Styles.icon,
              iconBackgroundColor
                ? {backgroundColor: iconBackgroundColor}
                : null,
            ]}>
            <Icon
              name={iconName ? iconName : 'chevron-forward-outline'}
              type={iconType ? iconType : 'ionicon'}
              color={iconColor ? iconColor : colors.border}
              size={iconSize ? iconSize : 25}
            />
          </View>
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  );
};
