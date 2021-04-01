import React from 'react';
import {FC} from 'react';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {DrawerActions} from '@react-navigation/native';
interface DrawerProps {
  onPress?: () => void;
  navigation:any
}

export const DrawerBotton: FC<DrawerProps> = (props) => {
  const {onPress,navigation} = props;

  const {colors} = useTheme();
  return (
    <Icon
      name="list-outline"
      type="ionicon"
      size={30}
      onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      color={colors.text}
    />
  );
};
