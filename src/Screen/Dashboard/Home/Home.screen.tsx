import React, {useEffect} from 'react';
import {FC, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, ScrollView} from 'react-native';
import {DashboardParam} from '../../../Redux/Model';
import {useDispatch} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage, Styles} from '../../../Global';
import {Divider, Image} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';

import {
  Button as CustomButton,
  ButtonIcon,
  ProductL,
  ProductM,
} from '../../../Componet';
import {Block} from 'galio-framework';
import {getCatalog} from '../../../Global/API';

const adidasLogo = require('../../../Assets/Images/adidas.png');
const insghtLogo = require('../../../Assets/Images/insight.jpg');
type Props = StackScreenProps<DashboardParam, 'Home'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch(); // to Access Action
  const [textSearch, setSearch] = useState<string>('');
  const [datas, setDatas] = useState([]);
  const getDataCatalog = async () => {
    const data = await getCatalog({flags: 1, sortOrder: 'DESC'});
    setDatas(data);
  };
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  useEffect(() => {
    getDataCatalog();
  }, []);
  return (
    <View style={[Styles.Container]}>
      <SafeAreaView style={{paddingVertical: 3, backgroundColor: '#5F6160'}}>
        <ScrollView horizontal>
          <ButtonIcon brandLogo={adidasLogo} backgroundColor="#B7B8B7" />
          <ButtonIcon brandLogo={insghtLogo} backgroundColor="#EAEBEB" />
          <ButtonIcon brandLogo={insghtLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
          <ButtonIcon brandLogo={insghtLogo} />
          <CustomButton title="kopi" width={100} />
          <CustomButton title="kopi" width={100} />
          <CustomButton title="kopi" width={100} />
        </ScrollView>
      </SafeAreaView>
      <Searchbar
        placeholder="search"
        onChangeText={updateSearch}
        value={textSearch}
        iconColor="#A6F5BC"
        style={{
          backgroundColor: '#2C312D',
          height: 45,
          paddingVertical: 5,
          opacity: 5,
        }}
        inputStyle={{
          backgroundColor: '#BBC3BD',
          height: 35,
          fontSize: 15,
          padding: 2,
          marginHorizontal: 5,
          borderRadius: 15,
        }}
      />

      <SafeAreaView>
        <ScrollView>
          <View style={{height: 190}}>
            <Block safe>
              <ScrollView horizontal>
                {datas.map((item, i) => {
                  return (
                    <ProductM
                      key={i}
                      data={item}
                      promo={
                        <Image
                          source={require('../../../Assets/Images/freeOngkir.png')}
                          style={{width: 30, height: 25, marginBottom: 5}}
                        />
                      }
                    />
                  );
                })}

      
              </ScrollView>
            </Block>
          </View>
          <View style={{height: 240, backgroundColor: 'blue'}}>
            <Block safe>
              <ScrollView horizontal>
              {datas.map((item, i) => {
                  return (
                    <ProductL
                      key={i}
                      onPress={() => navigation.navigate('ProductDetail',{data:item})}
                      data={item}
                      promo={
                        <Image
                          source={require('../../../Assets/Images/freeOngkir.png')}
                          style={{width: 30, height: 25, marginBottom: 5}}
                        />
                      }
                    />
                  );
                })}
                {/* <ProductL
                  onPress={() => navigation.navigate('ProductDetail')}
                  data={{katul: 'ngacuh'}}
                  promo={
                    <Image
                      source={require('../../../Assets/Images/freeOngkir.png')}
                      style={{width: 30, height: 25, marginBottom: 5}}
                    />
                  }
                />
                <ProductL data={{katul: 'ngacuh'}} />
                <ProductL data={{katul: 'ngacuh'}} />
                <ProductL data={{katul: 'ngacuh'}} /> */}
              </ScrollView>
            </Block>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>Home</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>Home</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'blue'}}>
            <Text>katul</Text>
          </View>
          <View
            style={{height: 100, backgroundColor: 'yellow', marginBottom: 70}}>
            <Button title="Logout" onPress={() => onlogout()} />
            <Divider />
            <Button
              title="Product"
              onPress={() => navigation.navigate('Product')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
