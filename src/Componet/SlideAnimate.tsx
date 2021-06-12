import React, {createRef, FC, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  Button,
} from 'react-native';
import {Icon} from 'react-native-elements';

import useInterval from '../Global/UseInterval';
import {themeReducer} from '../Redux/Reducers/Theme.reducer';
import {Kanvas} from './Kanvas';

const {width, height} = Dimensions.get('screen');
interface TProps {
  data?: any;
  auto?: boolean;
  imageMode?: 'stretch' | 'cover' | 'contain';
  duration?: number;
  speedChange?: number;
}

export const SlideAnimate: FC<TProps> = (props )=>{

  const {data, imageMode, auto, duration, speedChange} = props;
  const animationRef = useRef(new Animated.Value(0));
  const [curentImage, setCurentImage] = useState(0);
  const [autoScroll, setAutoScroll] = useState(auto ? auto : false);
  if (autoScroll)
    {useInterval(() => handleAnimation(), duration ? duration : 4000)};

  const handleAnimation = () => {
    let newCurentImage = curentImage + 1;
    let newDuration = speedChange ? speedChange : 500;
    if (newCurentImage >= data.length) {
      newCurentImage = 0;
      newDuration = 0;
    }

    Animated.timing(animationRef.current, {
      toValue: -(newCurentImage * width),
      duration: newDuration,
      useNativeDriver: true,
    }).start();
    setCurentImage(newCurentImage);
  };
  const handleAnimationBack = () => {
    let newCurentImage = curentImage - 1;
    let newDuration = speedChange ? speedChange : 500;
    if (newCurentImage < 0) {
      newCurentImage = data.length - 1;
      newDuration = 0;
    }

    Animated.timing(animationRef.current, {
      toValue: -(newCurentImage * width),
      duration: newDuration,
      useNativeDriver: true,
    }).start();
    setCurentImage(newCurentImage);
  };
  return (
    <React.Fragment>
      <View>
        <Animated.View
          style={[
            styles.imageContainer,
            {transform: [{translateX: animationRef.current}]},
          ]}>
          {data.map((item: any, i: number) => (
            <View key={i}>
              <Kanvas
                image={item}
                imageMode={imageMode ? imageMode : 'stretch'}
              />
            </View>
          ))}
        </Animated.View>
        <View style={styles.circleDiv}>
          {!autoScroll ? (
            <View style={{marginRight: 15}}>
              <Icon
                reverse
                name="play-back-outline"
                type="ionicon"
                onPress={() => handleAnimationBack()}
                size={10}
                color='#9811CD'
              />
            </View>
          ) : null}

          {data.map((_: any, index: number) => {
            return (
              <View
                key={index}
                style={
                  curentImage === index
                    ? styles.circleActive
                    : styles.circleWhite
                }
              />
            );
          })}
          {!autoScroll ? (
            <View style={{marginLeft: 15}}>
              <Icon
                reverse
                name="play-forward-outline"
                type="ionicon"
                onPress={() => handleAnimation()}
                size={10}
                color='#9811CD'
              />
            </View>
          ) : null}
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  FlatList: {flexGrow: 0},
  imageContainer: {
    height: 300,

    flexDirection: 'row',
  },
  image: {height: '100%', width: width, borderRadius: 20},
  circleDiv: {
    position: 'absolute',
    bottom: 20,
    height: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleWhite: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#A2B3AE',
    opacity: 0.5,
  },
  circleActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    backgroundColor: '#849EEB',
  },
});
