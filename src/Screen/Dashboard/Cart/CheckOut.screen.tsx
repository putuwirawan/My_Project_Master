import React, {FC, useEffect, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Icon, Image, Input} from 'react-native-elements';
import {DashboardParam} from '../../../Redux/Model';

import {logOut} from '../../../Redux/Actions/Loging.action';
import {
  clearLocalStorage,
  CurrencyFormat,
  getDockDate,
  getLocalStorage,
  Styles,
} from '../../../Global';
import {getCourier, getUser} from '../../../Global/API';
import {Block} from 'galio-framework';

import {Picker} from '@react-native-picker/picker';
import {createOrder} from '../../../Global/API/Order';

type Props = StackScreenProps<DashboardParam, 'CheckOut'>;
interface Destination {
  recipient?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  subDistrict?: string;
  zip?: string;
  service?: string;
  courierId?: string;
}
interface SalesData {
  originWarehouseId: string;
  destination?: Destination;
}
export const CheckOut: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch(); // to Access Action
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };
  const getCouriers = async () => {
    const courier = await getCourier();
  };
  const {data} = route.params;
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Destination>({});
  const alamats = [
    {
      nama: 'kantor',
      recipient: 'ajus',
      phone: '081338207696',
      address1: 'jl tukad bedulu no 21',

      address2: 'Br. Negara Kaja',
      country: '1',
      state: '1',
      city: '1',
      subDistrict: '1',
      zip: '80117',
    },
    {
      nama: 'rumah',
      recipient: 'Katul',
      phone: '081338207696',
      address1: 'jl katul ngacuh no 1',
      address2: 'Br. Negara Kaja',
      country: '1',
      state: '1',
      city: '1',
      subDistrict: '1',
      zip: '80117',
    },
  ];
  const couriers = [
    {nama: 'JNE', id: '1234'},
    {nama: 'TIKI', id: '1235'},
  ];
  const courierTypes = [
    {nama: 'REG', id: '123'},
    {nama: 'Express', id: '124'},
  ];
  useEffect(() => {
    getCouriers();
  }, []);

  return (
    <Block safe shadow>
      <ScrollView style={{paddingHorizontal: 2}}>
        {data != undefined
          ? data.map((whs: any, index: number) => {
              salesData.push({
                originWarehouseId: whs.id,
                destination: {
                  recipient: alamats[0].recipient,
                  address1: alamats[0].address1,
                  phone: alamats[0].phone,
                  address2: alamats[0].address2,
                  country: alamats[0].country,
                  state: alamats[0].state,
                  city: alamats[0].city,
                  subDistrict: alamats[0].subDistrict,
                  zip: alamats[0].zip,
                  courierId: couriers[0].id,
                  service: courierTypes[0].nama,
                },
              });

              return (
                <View
                  key={index}
                  style={{borderWidth: 1, paddingHorizontal: 5}}>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', color: 'blue'}}>
                    Warehouse : {whs.description}
                  </Text>
                  <View style={{marginBottom: 5}}>
                    {whs.shopcartDetails.map((item: any, i: number) => {
                      return (
                        <View
                          key={i}
                          style={{
                            borderBottomWidth: 0.5,
                            borderColor: 'blue',
                            marginBottom: 5,
                            backgroundColor:'#DDC6C6'
                          }}>
                          <Text
                            style={{
                              color: '#77060E',
                              fontSize: 12,
                              fontWeight: 'bold',
                            }}>
                            {item.articleDescription}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={{
                                uri:
                                  'https://source.unsplash.com/1024x768/?tree',
                              }}
                              containerStyle={{
                                width: 70,
                                height: 80,
                                margin: 5,
                              }}
                            />
                            <View>
                              <Text style={Styles.h5}>
                                Qty Order : {item.qty}
                              </Text>
                              <Text style={Styles.h5}>
                                Price/pcs : {CurrencyFormat(Number(item.price))}
                              </Text>
                              <Text style={Styles.h5}>
                                Gross : {CurrencyFormat(Number(item.gross))}
                              </Text>
                              <Text style={Styles.h5}>
                                Discount :{' '}
                                {CurrencyFormat(Number(item.discount))}
                              </Text>
                              <Text style={Styles.h5}>
                                Net : {CurrencyFormat(Number(item.net))}
                              </Text>
                              <Text style={Styles.h5}>
                                Weight : {item.totalWeight} gr
                              </Text>
                            </View>
                          </View>
                          <Text style={{fontStyle: 'italic'}}>
                            Remark: {item.remarks}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  {/* <Text>Sub Weight : {whs.totalWeight} gr</Text>
                  <Text>
                    Sub Discount : {CurrencyFormat(Number(whs.totalDiscount))}
                  </Text>
                  <Text>
                    Sub Value : {CurrencyFormat(Number(whs.totalNet))}
                  </Text> */}
                  <View style={[Styles.ContentRow, {height: 20}]}>
                    <Text style={{width: 80}}>Destination :</Text>
                    <View
                      style={[Styles.ContentRow, Styles.center, {height: 20}]}>
                      <Picker
                        style={{
                          width: '40%',
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingTop: 5,
                        }}
                        mode="dropdown"
                        selectedValue={alamats[0]}
                        onValueChange={(itemValue, itemIndex) => {
                          salesData[index].destination = {
                            ...salesData[index].destination,
                            recipient: itemValue.recipient,
                            address1: itemValue.address1,
                          };
                        }}>
                        {alamats.map((alamat: any, i: number) => {
                          return (
                            <Picker.Item
                              key={i}
                              label={String(alamat.nama)}
                              value={alamat}
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#0B4770',
                              }}
                            />
                          );
                        })}
                      </Picker>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          width: 150,
                          color: 'blue',
                        }}>
                        Change Destination
                      </Text>
                    </View>
                  </View>
                  <View style={[Styles.ContentRow, {height: 20}]}>
                    <Text style={{width: 80}}>Courier :</Text>
                    <View
                      style={[Styles.ContentRow, Styles.center, {height: 20}]}>
                      <Picker
                        style={{
                          width: '40%',
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingTop: 5,
                        }}
                        mode="dropdown"
                        selectedValue={couriers[0]}
                        onValueChange={(itemValue, itemIndex) => {
                          salesData[index].destination = {
                            ...salesData[index].destination,
                            courierId: itemValue.id,
                          };
                        }}>
                        {couriers.map((courier: any, j: number) => {
                          return (
                            <Picker.Item
                              key={j}
                              label={String(courier.nama)}
                              value={courier}
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#06782E',
                              }}
                            />
                          );
                        })}
                      </Picker>
                      <Text style={{fontStyle: 'italic', width: 150, color:'blue'}}>
                        Change Courier
                      </Text>
                    </View>
                  </View>
                  <View
                      style={[Styles.ContentRow, {height: 20}]}>
                    <Text style={{width: 80}}>Service :</Text>
                    <View
                      style={[Styles.ContentRow, Styles.center, {height: 20}]}>
                      <Picker
                        style={{
                          width: '40%',
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingTop: 5,
                        }}
                        mode="dropdown"
                        selectedValue={courierTypes[0]}
                        onValueChange={(itemValue, itemIndex) => {
                          salesData[index].destination = {
                            ...salesData[index].destination,
                            service: itemValue.nama,
                          };
                        }}>
                        {courierTypes.map((service: any, k: number) => {
                          return (
                            <Picker.Item
                              key={k}
                              label={String(service.nama)}
                              value={service}
                              style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#88296D',
                                fontStyle:'italic'
                              }}
                            />
                          );
                        })}
                      </Picker>
                      <Text style={{fontStyle: 'italic', width: 150,color:'blue'}}>
                        Change Service
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          : null}
        <Text>Check Out Ne ruu</Text>
        {/* <Button title="Logout" onPress={() => console.log(salesData)} /> */}
        <Button
          title="Confirm Order"
          onPress={async () => {
            const date = getDockDate();
            const getUserLogin = await getLocalStorage();
            const {userId, cart_token} = getUserLogin;
            const resul = await createOrder({
              docdate: date,
              memberId: userId,
              memberToken: cart_token,
              salesDatas: salesData,
            });
            console.log('date', resul);
          }}
        />
      </ScrollView>
    </Block>
  );
};
