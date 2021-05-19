import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Button, ScrollView} from 'react-native';
import {CartModel, CartState, DashboardParam} from '../../../Redux/Model';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../Redux/Actions/Loging.action';
import {clearLocalStorage} from '../../../Global';
import {deletedCart, getCart} from '../../../Global/API';
import {Cart} from '../../../Componet';
import {Block} from 'galio-framework';
import {CheckBox, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addCart} from '../../../Redux/Actions/Cart.action';
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

  const getDataCart = async () => {
    const cartss = await getCart();
    if (cartss !== null) {
      const newCarts: CartModel[] = cartss.shopcartDetails;
      dispatch(addCart(newCarts));

      if (cartCheck == []) {
        carts.forEach(element => {
          cartCheckLists.push(false);
        });

        setcartCheck(cartCheckLists);
      }
    }
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
                    <Block center>
                      <CheckBox
                        center
                        checked={cartCheck[index]}
                        onPress={() => {
                          const newChecked = [...cartCheck];
                          newChecked[index] = !newChecked[index];
                          setcartCheck(newChecked);
                        }}
                      />
                      <Icon
                        name="trash"
                        type="ionicon"
                        size={20}
                        color="#943E3C"
                        onPress={async () => {
                          let deleted: boolean = await deletedCart(item.id);
                          const newChecked = [...cartCheck];
                          newChecked.splice(index, 1);             
                          setcartCheck(newChecked);
                        }}
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

          <Button title="Logout" onPress={() => onlogout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
