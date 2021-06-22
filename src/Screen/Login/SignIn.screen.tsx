import React, {useState} from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import {LogingModel, LoginParam, LoginState} from '../../Redux/Model';
import {useDispatch, useSelector} from 'react-redux';
import {clearLocalStorage, saveLocalStorage, Styles} from '../../Global';
import {errorLoging, logIn} from '../../Redux/Actions/Loging.action';
import {RootState} from '../../Redux/Reducers';
import {CustomButton, Link} from '../../Componet';

import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {Image, Icon} from 'react-native-elements';

import {Input} from 'react-native-elements';
import {apiLogin} from '../../Global/API';

type Props = StackScreenProps<LoginParam, 'SignInScreen'>;

export const SignInScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const {colors} = useTheme();
  const logo = require('../../Assets/Images/logo.png');
  const title: string = 'Planet Surf';
  const {width} = Dimensions.get('screen');
  const {loginUser, errorLogin, isLogin}: LoginState = useSelector(
    (state: RootState) => state.loging,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const onlogin = async (username: string, password: string) => {
    
    const data = await apiLogin(username, password);
    if (data.data !== undefined) {
      const reqData = data.data;
      const userLogin: LogingModel = {
        userId: '',
        username: username,
        access_token: reqData.access_token,
        refresh_token: reqData.access_token,
        cart_token: '',
        role: '',
      };
      const saveDataToLocal = await saveLocalStorage(userLogin);

      if (saveDataToLocal) {
        dispatch(logIn(userLogin));
      } else {
        clearLocalStorage();
      }
    }
    if (data.message) {
      dispatch(errorLoging({message: data.message}));
    } else {
      if (data.error) {
        dispatch(errorLoging(data.error));
      }
    }
  };

  return (
    <View
      style={[
        Styles.Container,
        Styles.bottomSection,
        {backgroundColor: colors.primary},
      ]}>
      <View style={[{flex: 2}, Styles.center]}>
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
      <Animatable.View
        animation="fadeInUp"
        duration={2000}
        style={[
          {
            flex: 3,
            backgroundColor: colors.background,
            borderTopLeftRadius: width / 3,
            borderTopRightRadius: width / 3,
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{alignItems: 'center', paddingHorizontal: 20, marginTop: 40}}>
          <Input
            placeholder="Username"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            style={{marginBottom: 5}}
            onChangeText={value => setUsername(value)}
          />
          <Input
            placeholder="Password"
            secureTextEntry={securePassword}
            leftIcon={{type: 'font-awesome', name: 'user'}}
            rightIcon={
              securePassword
                ? {
                    type: 'font-awesome',
                    name: 'eye',
                    color: '#cf00ff',
                    onPress: () => setSecurePassword(!securePassword),
                  }
                : {
                    type: 'font-awesome',
                    name: 'eye-slash',
                    color: colors.border,
                    onPress: () => setSecurePassword(!securePassword),
                  }
            }
            style={{marginBottom: 5}}
            onChangeText={value => setPassword(value)}
          />
          {errorLogin ? (
            <Text style={{color: '#A33F3F', fontStyle: 'italic'}}>
              {errorLogin.message}
            </Text>
          ) : null}
          {/* <Button onPress={() => onlogin(username, password)} title="Login" /> */}
          <CustomButton
           onPress={() => onlogin(username, password)}
            radiusType="all"
            height={30}
            title="Login"
            radius={20}
            iconLeft={
              <Icon
                name="person-circle-outline"
                type="ionicon"
                color="#517fa4"
                size={22}
              />
            }
            iconRight={
              <Icon
                name="chevron-forward"
                type="ionicon"
                color="#517fa4"
                size={20}
              />
            }
          />
          <Text style={{alignContent: 'center'}}>
            Don't have an Account? Tray to{' '}
            {
              <Link
                text="Register"
                color="blue"
                onPress={() => navigation.navigate('SignUpScreen')}
              />
            }{' '}
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};
