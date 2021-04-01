import React, {useState} from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {LogingModel, LoginParam, LoginState} from '../../Redux/Model';
import {useDispatch, useSelector} from 'react-redux';
import {
  apiLogin,
  clearLocalStorage,
  saveLocalStorage,
  Styles,
} from '../../Global';
import {errorLoging, logIn} from '../../Redux/Actions/Loging.action';
import {RootState} from '../../Redux/Reducers';
import {Button as CustomButton, Link} from '../../Componet';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {Image} from 'react-native-elements';
import {Input} from 'react-native-elements';

type Props = StackScreenProps<LoginParam, 'SignUpScreen'>;

export const SignUpScreen: FC<Props> = ({navigation}) => {
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
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [isValidUser, setIsvalidUser] = useState(true);
  const [isValidEmail, setIsvalidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const onlogin = async (username: string, password: string) => {
    const data = await apiLogin(username, password);

    if (data.access_token) {
      const userLogin: LogingModel = {
        userId: '1',
        username: data.username,
        token: data.access_token,
        role: data.roles,
      };
      const saveDataToLocal = await saveLocalStorage(userLogin);

      if (saveDataToLocal) {
        dispatch(logIn(userLogin));
      } else {
        clearLocalStorage();
      }
    }
    if (data.error_description) {
      dispatch(errorLoging({message: data.error_description}));
    } else {
      if (data.error) {
        dispatch(errorLoging(data.error));
      }
    }
  };
  const handleOnRegister = async () => {
    setLoading(true);

    if (
      email == '' ||
      username == '' ||
      password == '' ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidUser
    ) {
      dispatch(errorLoging({message: 'Not valid data request'}));
      setLoading(false);
    } else {
      dispatch(errorLoging(undefined));
      await onlogin(username, password);
      setLoading(true);
    }
  };
  const handleValidUser = (val: string) => {
    if (val.trim().length >= 4) {
      setIsvalidUser(true);
    } else {
      setIsvalidUser(false);
    }
  };
  const handleValidEmail = (val: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === true) {
      setIsvalidEmail(true);
    } else {
      setIsvalidEmail(false);
    }
  };
  const handleValidPassword = (val: string) => {
    if (password === val) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };
  const LoadingIndicator = () => {
    return (
      <ActivityIndicator
        animating={true}
        color="#bc2b78"
        size="large"
        style={Styles.activityIndicator}
      />
    );
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
            flex: 4,
          },
        ]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: colors.background,
            borderTopLeftRadius: width / 4,
            borderTopRightRadius: width / 4,
            justifyContent: 'center',
          }}>
          <ScrollView horizontal={false} centerContent={true}>
            <View style={{flex: 1, width: (width * 3) / 4}}>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                leftIcon={{type: 'ionicon', name: 'mail-outline'}}
                onChangeText={value => setEmail(value)}
                onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
                errorMessage={!isValidEmail ? 'Enter valid Email address' : ''}
              />
              <Input
                placeholder="Phone Number"
                keyboardType="numeric"
                leftIcon={{type: 'ionicon', name: 'call'}}
                onChangeText={value => setPhoneNumber(value)}
              />
              <Input
                placeholder="Username"
                leftIcon={{type: 'ionicon', name: 'person-circle-outline'}}
                onChangeText={value => setUsername(value)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                errorMessage={
                  !isValidUser ? 'Username must be 4 characters long' : ''
                }
              />

              <Input
                placeholder="Password"
                secureTextEntry={securePassword}
                leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
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
                onChangeText={value => setPassword(value)}
              />
              <Input
                placeholder="Re Enter Password"
                secureTextEntry={securePassword}
                leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
                onChangeText={value => handleValidPassword(value)}
                onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
                errorMessage={!isValidPassword ? 'Password not Match' : ''}
              />
            </View>
          </ScrollView>

          <View style={{paddingTop: 5}}>
            {errorLogin ? (
              <Text style={{color: '#A33F3F', fontStyle: 'italic'}}>
                {errorLogin.message}
              </Text>
            ) : null}
            {loading ? LoadingIndicator() : null}
            <CustomButton
              onPress={() => handleOnRegister()}
              title="Register"
              width={150}
              textStyle={[Styles.SubTitleItalic, {textAlign: 'center'}]}
              radius={40}
              iconRight
              iconName="person-circle-outline"
              iconColor={colors.border}
              color={['#4DD081', '#1E703F', '#0F381F']}
            />
            <Text style={{alignContent: 'center'}}>
              Allready Have an Account? Go to{' '}
              {
                <Link
                  text="Login"
                  color="blue"
                  onPress={() => navigation.navigate('SignInScreen')}
                />
              }{' '}
            </Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
