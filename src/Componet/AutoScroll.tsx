import React, {FC, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import {Kanvas} from '.';

import useInterval from '../Global/UseInterval';

const {width, height} = Dimensions.get('screen');

interface TProps {
  data: any;
  autoScroll?: boolean;
  imageMode?: 'stretch' | 'cover' | 'contain';
  duration?: number;
}

export const AutoScroll: FC<TProps> = props => {
  const {data, imageMode, autoScroll, duration} = props;

  let scrollref: any = useRef(new Animated.ValueXY());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageList, setImageList] = useState(data);
  const [auto, setAuto] = useState<boolean>(autoScroll ? autoScroll : false);

  if (auto) {
    useInterval(() => handleAnimation(), duration ? duration : 4000);
  }

  const handleSelectedIndex = (event: any) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    let selectedImage = Math.floor(contentOffset / viewSize);

    setSelectedIndex(selectedImage);
  };
  const handleAnimation = () => {
    let newCurentImage = selectedIndex + 1;
    if (newCurentImage >= imageList.length) {
      newCurentImage = 0;
    }
    scrollref.current.scrollToOffset({
      animated: true,
      offset: newCurentImage * width
    });

    setSelectedIndex(newCurentImage);
  };

  if (data.length) {
    return (
      <View style={[styles.container]}>
        <FlatList
          ref={scrollref}
          horizontal
          pagingEnabled
          scrollEnabled
          decelerationRate="fast"
          snapToAlignment="center"
          scrollEventThrottle={15}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => {
            return (
              <Kanvas
                image={item}
                imageMode={imageMode ? imageMode : 'stretch'}
              />
            );
          }}
          onMomentumScrollEnd={event => {
            if (selectedIndex + 1 === imageList.length) {
              setSelectedIndex(0);
              scrollref.current.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }
            handleSelectedIndex(event);
          }}
        />
        <View style={styles.circleDiv}>
          {imageList.map((_: any, index: number) => {
            return (
              <View
                key={index}
                style={
                  selectedIndex === index
                    ? styles.circleActive
                    : styles.circleWhite
                }
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={[styles.container]}>
        <Text>No Image</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', flexGrow: 0},
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    height: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleWhite: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    margin: 5,
    opacity: 0.5,
  },
  circleActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    margin: 5,
    backgroundColor: '#849EEB',
  },
});
