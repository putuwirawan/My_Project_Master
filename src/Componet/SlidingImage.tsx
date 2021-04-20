import React, {useState} from 'react';
import {FC} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
interface TProps {
  images?: string[];
}
const {width} = Dimensions.get('window');
const height = (width * 60) / 100;

export const SlidingImage: FC<TProps> = props => {
  const {images} = props;
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <ImageViewer
        style={styles.image}
        onChange={i => {
          if (i !== undefined) setActive(i);
        }}
        useNativeDriver={true}
        backgroundColor="#626566"
        imageUrls={
          images ? images.map((item, i) => ({url: item})) : [{url: ''}]
        }
      />

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
  pagingActiveText: {fontSize: width / 25, color: '#ED1E25', margin: 3},
});
