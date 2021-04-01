import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const CustomDefaultTheme = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#333333',
    primary: '#4c966d',
    border: '#5A88AE',
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333333',
    text: '#ffffff',
    primary: '#5da07b',
    border: '#B3C8D9',
  },
};
