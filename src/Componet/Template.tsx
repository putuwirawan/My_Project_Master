import React,{FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface TProps {
  onPress?: () => void;
  headerView?: React.ReactNode;
  menuNavigate?: React.ReactNode;
  mainDisplay?: React.ReactNode;
 
}

export const Template: FC<TProps> = props => {
  const {onPress, headerView, menuNavigate,mainDisplay} = props;
  return (
    <TouchableOpacity
      onPress={()=>onPress}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Text>Ngacuh</Text>
    </TouchableOpacity>
  );
};