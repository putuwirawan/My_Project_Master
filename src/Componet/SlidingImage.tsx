import React, {useState, FC, useRef} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  ScrollViewPropsAndroid,
  FlatList,
  Animated,
} from 'react-native';
import Albums, {AlbumModel} from '../Global/Example/Albums';
import ImageViewer from 'react-native-image-zoom-viewer';
import {event} from 'react-native-reanimated';
interface TProps {
  images: string[];
  imageWidth: number;
}
const {width, height} = Dimensions.get('screen');

export const SlidingImage: FC<TProps> = props => {
  const {images, imageWidth} = props;
  let scrollref: any = useRef(new Animated.ValueXY());
  const [active, setActive] = useState(0);
  const [imageList, setImageList] = useState(images);

  const setSelectedIndex = (event: any) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contenOfset = event.nativeEvent.contentOffset.x;
    const newSelected = Math.floor(contenOfset / viewSize);
    setActive(newSelected);
    scrollref.current.scrollToOffset({
      animated: true,
      offset: newSelected * viewSize,
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollref}
        data={imageList}
        pagingEnabled
        initialNumToRender={7}
        scrollEventThrottle={7}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => {
          return (
            <View>
              <Image
                source={{uri: item}}
                style={[styles.image, {width: imageWidth}]}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => String(index)}
        onMomentumScrollEnd={event => {
          setSelectedIndex(event);
        }}
      />

      <View style={styles.pagination}>
        {imageList?.map((_, i) => {
          return (
            <View
              key={i}
              style={active === i ? styles.circleActive : styles.circleBlank}
            />
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {height: height, width: 0.9 * width},
  image: {height: '100%', resizeMode: 'stretch', borderTopLeftRadius:30,borderTopRightRadius:30},
  pagination: {
    position: 'absolute',
    bottom: 15,
    height: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBlank: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 5,
    opacity: 1,
    marginHorizontal: 2,
    borderColor: '#878D8E',
  },
  circleActive: {
    height: 10,
    width: 10,
    borderWidth: 2,
    borderRadius: 5,
    opacity: 1,
    marginHorizontal: 2,
    borderColor: '#2C2FD4',
    backgroundColor: '#D42C2C',
  },
});
