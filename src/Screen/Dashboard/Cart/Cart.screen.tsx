import React, {useEffect, useState, FC} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, ScrollView, Alert} from 'react-native';
import {CartState, DashboardParam} from '../../../Redux/Model';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';
import {checkOut, deletedCart} from '../../../Global/API';
import {Cart} from '../../../Componet';
import {Block} from 'galio-framework';
import {CheckBox, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootState} from '../../../Redux/Reducers';

type Props = StackScreenProps<DashboardParam, 'Cart'>;

export const CartScreen: FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch(); // to Access Action
  const onlogout = async () => {
    await clearLocalStorage();
    dispatch(logOut());
  };

  const [cartCheck, setcartCheck] = useState<boolean[]>([]);
  let cartCheckLists: boolean[] = [];
  const {carts, cartsCount}: CartState = useSelector(
    (state: RootState) => state.cart,
  );
  const handleDeletedCart = (item: any, index: number) => {
    //function to make three option alert
    Alert.alert(
      //title
      'Confirm Remove',
      //body
      ' Remove from Cart ?',
      [

        {
          text: 'Yes',
          onPress: async () => {
            let deleted: boolean = await deletedCart(item.id);
            const newChecked = [...cartCheck];
            newChecked.splice(index, 1);
            setcartCheck(newChecked);
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    carts.forEach(element => {
      cartCheckLists.push(true);
    });
    setcartCheck(cartCheckLists);
  }, [cartsCount]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {carts.length > 0 ? (
            carts.map((item: any, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 200,
                    width: '100%',
                    borderWidth: 1,
                    paddingVertical: 5,
                  }}>
                  <Block row fluid left>
                    <Block center width={40}>
                      {/* <CheckBox
                        center
                        checked={cartCheck[index]}
                        onPress={() => {
                          const newChecked = [...cartCheck];
                          newChecked[index] = !newChecked[index];
                          setcartCheck(newChecked);
                        }}
                      /> */}
                      <Icon
                        name="trash"
                        type="ionicon"
                        size={20}
                        color="#943E3C"
                        style={{marginHorizontal: 10}}
                        onPress={() => handleDeletedCart(item, index)}
                      />
                    </Block>

                    <Block center left>
                      <Cart data={item} />
                    </Block>
                  </Block>
                </View>
              );
            })
          ) : (
            <Text>Cart UnAvailable </Text>
          )}
          <Button
            title="Check Out Now"
            onPress={async () => {
              const dataResponse = await checkOut();
              if (dataResponse[1].length > 0) {
                navigation.navigate('CheckOut', {data: dataResponse[1]});
              }
            }}
          />
          {/* <Button title="Logout" onPress={() => onlogout()} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
