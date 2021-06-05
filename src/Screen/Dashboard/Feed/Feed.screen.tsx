import React, {FC} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Dimensions} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';


import {SlideAnimate, AutoScroll} from '../../../Componet';
import Albums from '../../../Global/Example/Albums';

type Props = StackScreenProps<DashboardParam, 'Feed'>;

export const FeedScreen: FC<Props> = ({navigation}) => {
  const images = Albums;
  const {width, height} = Dimensions.get('screen');

  return (
    <View style={{height: '60%', width: '100%'}}>
      <SlideAnimate data={images} imageMode="stretch" auto={true} duration={6000} speedChange={1000}/>
    </View>
  );
};
