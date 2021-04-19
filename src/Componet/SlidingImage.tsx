import React, {useState} from 'react';
import {FC} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface TProps {
  images?: string[];
}
const {width} = Dimensions.get('window');
const height = (width * 60) / 100;

export const SlidingImage: FC<TProps> = props => {
  const {images} = props;
  const [active, setActive] = useState(0);

  const onChange = ({nativeEvent}: any) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={onChange}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {images
          ? images.map((item, i) => {
              return (
                <Image key={i} source={{uri: item}} style={styles.image} />
              );
            })
          : null}
      </ScrollView>
      <View style={[styles.pagination]}>
        {images
          ? images.map((i, x) => (
              <Text
                key={x}
                style={
                  x == active ? styles.pagingActiveText : styles.pagingText
                }>
                ⬤
              </Text>
            ))
          : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {height: height, width: 0.9 * width, margin: 2},
  scroll: {height: height, width: 0.9 * width},
  image: {height: height, width: 0.9 * width, resizeMode: 'cover'},
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: {fontSize: width / 25, color: '#9C9C9C', margin: 3},
  pagingActiveText: {fontSize: width / 25, color: '#DFE453', margin: 3},
});
