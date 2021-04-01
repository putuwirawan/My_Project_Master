import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');
const logoHeight = height * 0.25;
const logoWidth = height * 0.25;
export const baseColor = {
  darkTheme: {bacground: '#000C66'},
  lightTheme: {background: 'red'},
};

export const Styles = StyleSheet.create({
  Container: {flex: 1},
  ContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  bottomSection: {
    paddingTop: 5,
    justifyContent: 'flex-end',
    borderTopWidth: 2,
    borderBottomWidth: 1,
  },
  topSection: {
    paddingBottom: 5,
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderBottomWidth: 2,
  },
  divider: {borderBottomColor: '#78BFDC', borderBottomWidth: 1},
  button: {alignItems: 'flex-end', marginTop: 20, marginHorizontal: 5},
  dashboardLogo: {height: logoHeight, width: logoWidth},
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // kjjkj
  centerLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },

  // FontSize
  TitleHeader: {fontSize: 24, fontWeight: '600'},
  TitleHeaderBold: {fontSize: 24, fontWeight: 'bold', fontStyle: 'normal'},
  TitleHeaderItalic: {fontSize: 24, fontWeight: 'bold', fontStyle: 'italic'},
  Title: {fontSize: 20, fontWeight: '700'},
  TitleBold: {fontSize: 20, fontWeight: 'bold', fontStyle: 'normal'},
  TitleItalic: {fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'},
  SubTitle: {fontSize: 17, fontWeight: '500'},
  SubTitleBold: {fontSize: 17, fontWeight: 'bold', fontStyle: 'normal'},
  SubTitleItalic: {fontSize: 17, fontWeight: 'bold', fontStyle: 'italic'},
  ChildTitle: {fontSize: 14, fontWeight: '500', fontStyle: 'normal'},
  ChildTitleBold: {fontSize: 14, fontWeight: 'bold', fontStyle: 'normal'},
  ChildTitleItalic: {fontSize: 14, fontWeight: 'bold', fontStyle: 'italic'},
  h1: {fontSize: 24, fontWeight: '400', fontStyle: 'normal'},
  h2: {fontSize: 20, fontWeight: '400', fontStyle: 'normal'},
  h3: {fontSize: 17, fontWeight: '500', fontStyle: 'normal'},
  h4: {fontSize: 15, fontWeight: '500', fontStyle: 'normal'},
  h5: {fontSize: 11, fontWeight: '500', fontStyle: 'normal'},
  Price: {fontSize: 12, fontWeight: '400', fontStyle: 'normal'},
  PricePromo: {fontSize: 14, fontWeight: '600', fontStyle: 'italic'},
  StrikeText: {
    textDecorationLine: 'line-through',
    color: '#E74747',
  },
});
