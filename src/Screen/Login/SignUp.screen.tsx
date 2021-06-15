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
import {clearLocalStorage, saveLocalStorage, Styles} from '../../Global';
import {errorLoging, logIn} from '../../Redux/Actions/Loging.action';
import {RootState} from '../../Redux/Reducers';
import {CustomButton, Link} from '../../Componet';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {Icon, Image} from 'react-native-elements';
import {Input} from 'react-native-elements';
import {apiLogin, apiRegister} from '../../Global/API';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsvalidUser] = useState(true);
  const [isValidUser, setIsValidLastName] = useState(true);
  const [isValidEmail, setIsvalidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidRePassword, setIsValidRePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const onlogin = async (username: string, password: string) => {
    const data = await apiLogin(username, password);
    if (data.data !== undefined) {
      const reqData = data.data;
      const userLogin: LogingModel = {
        userId: '1',
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
  const handleOnRegister = async () => {
    setLoading(true);

    if (
      firstName.trimEnd() == '' ||
      lastName.trimEnd() == '' ||
      email == '' ||
      username.trimEnd() == '' ||
      password == '' ||
      !isValidFirstName ||
      !isValidLastName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidUser
    ) {
      dispatch(errorLoging({message: 'Not valid data request'}));
      setLoading(false);
    } else {
      const regUser = await apiRegister({
        code: 'MEMBER',
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        password: password,
        type: 'silver',
      });
      if (regUser.data !== undefined) {
        dispatch(errorLoging(undefined));
        // await onlogin(username, password);
        alert('Success to Register User');
        setLoading(false);
        navigation.navigate('SignInScreen');
      } else {
        dispatch(errorLoging({message: 'Not valid data request'}));
        setLoading(false);
      }
    }
  };
  const handleValidUser = (val: string) => {
    if (val.trim().length >= 3) {
      setIsvalidUser(true);
    } else {
      setIsvalidUser(false);
    }
  };
  const handleValidFirstName = (val: string) => {
    if (val.trim().length >= 3) {
      setIsValidFirstName(true);
    } else {
      setIsValidFirstName(false);
    }
  };
  const handleValidLastName = (val: string) => {
    if (val.trim().length >= 3) {
      setIsValidLastName(true);
    } else {
      setIsValidLastName(false);
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
    if (val.trim().length >= 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };
  const handleValidRePassword = (val: string) => {
    if (password === val) {
      setIsValidRePassword(true);
    } else {
      setIsValidRePassword(false);
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
          <ScrollView
            horizontal={false}
            centerContent={true}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, width: (width * 3) / 4}}>
              <Input
                placeholder="First Name"
                leftIcon={{type: 'ionicon', name: 'person-outline'}}
                onChangeText={value => setFirstName(value)}
                onEndEditing={e => handleValidFirstName(e.nativeEvent.text)}
                errorMessage={
                  !isValidUser ? 'First Name must be 3 characters long' : ''
                }
              />
              <Input
                placeholder="Last Name"
                leftIcon={{type: 'ionicon', name: 'person-add-outline'}}
                onChangeText={value => setLastName(value)}
                onEndEditing={e => handleValidLastName(e.nativeEvent.text)}
                errorMessage={
                  !isValidUser ? 'Last Name must be 3 characters long' : ''
                }
              />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                leftIcon={{type: 'ionicon', name: 'mail-outline'}}
                onChangeText={value => setEmail(value)}
                onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
                errorMessage={!isValidEmail ? 'Enter valid Email address' : ''}
              />
              {/* <Input
                placeholder="Phone Number"
                keyboardType="numeric"
                leftIcon={{type: 'ionicon', name: 'call'}}
                onChangeText={value => setPhoneNumber(value)}
              /> */}
              <Input
                placeholder="Username"
                leftIcon={{type: 'ionicon', name: 'person-circle-outline'}}
                onChangeText={value => setUsername(value)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                errorMessage={
                  !isValidUser ? 'Username must be 3 characters long' : ''
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
                onChangeText={value => handleValidPassword(value)}
                onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
                errorMessage={
                  !isValidPassword ? 'Username must be 6 characters long' : ''
                }
              />
              <Input
                placeholder="Re Enter Password"
                secureTextEntry={securePassword}
                leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
                onChangeText={value => handleValidRePassword(value)}
                onEndEditing={e => handleValidRePassword(e.nativeEvent.text)}
                errorMessage={!isValidRePassword ? 'Password not Match' : ''}
              />
            </View>
          </ScrollView>

          <View style={{paddingTop: 5, alignItems:'center'}} >
            {errorLogin ? (
              <Text style={{color: '#A33F3F', fontStyle: 'italic'}}>
                {errorLogin.message}
              </Text>
            ) : null}
            {loading ? LoadingIndicator() : null}
          

            <CustomButton
              color={['#4DD081', '#1E703F', '#0F381F']}
              onPress={() => handleOnRegister()}
              title="Register"
              width={150}
              radiusType="all"
              height={30}
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
                  color="#F2F1F3"
                  size={20}
                />
              }
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
