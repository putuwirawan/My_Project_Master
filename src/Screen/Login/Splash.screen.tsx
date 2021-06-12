import React, {FC} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Dimensions, Button} from 'react-native';
import {LoginParam, ThemeState} from '../../Redux/Model';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/Reducers';

import {CustomButton} from '../../Componet';
import {Styles} from '../../Global';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {Image} from 'react-native-elements';

type Props = StackScreenProps<LoginParam, 'SplashScreen'>;

export const SplashScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const logo = require('../../Assets/Images/logo.png');
  const title: string = 'Planet Surf';
  const {width} = Dimensions.get('screen');
  const {colors} = useTheme();
  const {isDarkTheme}: ThemeState = useSelector(
    (state: RootState) => state.theme,
  );

  return (
    <View
      style={[
        Styles.Container,
        Styles.bottomSection,
        {backgroundColor: colors.primary},
      ]}>
      <View style={[{flex: 3}, Styles.center]}>
        <View style={{marginBottom: 20}}>
          <Image
            source={logo}
            style={{height: 110, width: 100}}
            resizeMode="stretch"
          />
        </View>
        <Text
          style={[Styles.TitleHeaderBold, {color: '#B4C2B9', fontSize: 37}]}>
          {title}
        </Text>
      </View>
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: width / 2,
          },
        ]}>
        <Animatable.View
          animation="slideInRight"
          duration={2000}
          style={{alignItems: 'flex-end', paddingRight: 5, marginTop: 40}}>
          <Text
            style={[
              Styles.SubTitleItalic,
              {color: colors.text, marginBottom: 20},
            ]}>
            Stay Connected With EveryOne !
          </Text>
          <Button title='Login' onPress={()=>navigation.navigate('SignInScreen')}/>
          {/* <CustomButton
            onPress={() =>{ 
alert('katulahne')
console.log('KOPI')
              // navigation.navigate('SignInScreen')
            }}
            title="Login"
            width={150}
            textStyle={[Styles.SubTitleItalic, {textAlign: 'center'}]}
            radius={40}
            iconRight
            iconColor={colors.border}
            color={['#4DD081', '#1E703F', '#0F381F']}
          /> */}
        </Animatable.View>
      </View>
    </View>
  );
};
