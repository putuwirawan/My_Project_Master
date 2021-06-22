import React, {FC, useEffect, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Dimensions, ScrollView, Image, Alert} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';

import {
  SlideAnimate,
  AutoScroll,
  BasePage,
  ProductL,
  ShowMore,
  ButtonIcon,
} from '../../../Componet';
import Albums from '../../../Global/Example/Albums';
import {catalogType, getCatalog} from '../../../Global/API';

type Props = StackScreenProps<DashboardParam, 'Feed'>;
const adidasLogo = require('../../../Assets/Images/adidas.png');
const insghtLogo = require('../../../Assets/Images/insight.jpg');
export const FeedScreen: FC<Props> = ({navigation}) => {

  return (
  <View>
    <Text>Feed</Text>
  </View>
  );
};
