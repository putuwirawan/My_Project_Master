import React, {FC} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

interface ImageType {
  id: string;
  title: string;
  deskription?: string;
  url: string;
}

interface TProps { 
  image?: any;
  imageMode?: 'stretch' | 'cover' | 'contain';
}
export const Kanvas: FC<TProps> = props => {
  const { image, imageMode} = props;
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: image?.url}}
        style={[styles.image, {resizeMode: imageMode ? imageMode : 'stretch'}]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{image.id}</Text>
        <Text style={styles.itemDescription}>{image.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: '100%',
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
  },
});
