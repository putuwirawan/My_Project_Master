import React, {useEffect, useState, FC} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Icon, Image, Input} from 'react-native-elements';
import {CurrencyFormat} from '../Global';
import {createCart} from '../Global/API';

interface TProps {
  onChange?: () => void;
  data: any;
  color?: string;
  text?: string;
}

export const Cart: FC<TProps> = props => {
  const { data} = props;
  const [qtyOrder, setQtyOrder] = useState<number>(data.qty);
  const [remark, setRemark] = useState<string>(data.remarks);
  const [updateremark, setUpdateRemark] = useState<string>(data.remarks);
  const updateCart = async () => {
    const newCart = {
      qty: qtyOrder,
      currencyId: '43b11d95-a96c-4f30-8a95-34c33377efba',
      warehouseId: data.warehouseId,
      articleId: data.articleId,
      remarks: updateremark,
    };

    const result = await createCart(newCart);

    if (!result) {
      alert('Failed adding qty');
    }
  };
  useEffect(() => {
    updateCart();
  }, [qtyOrder, updateremark]);

  const handleQtyOrder = async (qty: number) => {
    if (data.latestArticleData.stock < qty) {
      alert(
        `Not Available Stock !  Remaining stock : ${data.latestArticleData.stock} `,
      );
      setQtyOrder(Number(data.latestArticleData.stock));
    } else {
      if (qty <= 0) {
        alert(`Minimum order 1 pcs `);
        setQtyOrder(1);
      } else {
        setQtyOrder(qty);
      }
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#AFD6EC',
          width: '90%',
        }}>
        <Image
          source={{
            uri: 'https://source.unsplash.com/1024x768/?tree',
          }}
          containerStyle={{
            width: 90,
            height: 90,
            marginRight: 5,
          }}
        />
        <View style={{marginRight: 5, width: '50%'}}>
          <Text style={{fontSize: 11}}>{data.articleDescription}</Text>
          <Text
            style={{fontSize: 14, alignItems: 'flex-end', fontWeight: 'bold'}}>
            {CurrencyFormat(Number(data.latestArticleData.salesPrice))}
          </Text>
          <Text style={{fontSize: 10}}>
            stock :{data.latestArticleData.stock}
          </Text>
          <Text style={{fontSize: 10}}>
            weight :{data.latestArticleData.weight} gr
          </Text>
        </View>
      </View>
      <View style={{height: 100, paddingVertical: 2}}>
        <Text
          style={{
            fontStyle: 'italic',
            fontSize: 12,
            color: '#943E3C',
            textAlign: 'left',
          }}>
          Warehouse :{data.warehouseDescription}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Qty order :</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Icon
              name="chevron-down-circle-outline"
              type="ionicon"
              size={20}
              color="#091B25"
              onPress={() => {
                handleQtyOrder(qtyOrder - 1);
              }}
            />
            <TextInput
              keyboardType="numeric"
              style={{
                width: 40,
                height: 35,
                fontSize: 12,
                marginHorizontal: 10,
              }}
              onChangeText={text => {
                let newValue = text.replace(/[^0-9]/g, '');
                setQtyOrder(Number(newValue));
              }}
              onEndEditing={e => handleQtyOrder(Number(e.nativeEvent.text))}
              value={String(qtyOrder)}
            />

            <Icon
              name="chevron-up-circle-outline"
              type="ionicon"
              size={20}
              color="#091B25"
              onPress={() => {
                handleQtyOrder(qtyOrder + 1);
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <Text>Remark :</Text>
          <Input
            placeholder="Catatan"
            inputContainerStyle={{width: 200, height: 30}}
            style={{
              height: 30,
              fontSize: 13,
              marginHorizontal: 5,
              fontStyle: 'italic',
            }}
            onChangeText={text => {
              setRemark(text);
            }}
            onEndEditing={e => {
              setUpdateRemark(e.nativeEvent.text);
            }}
            value={remark}
          />
        </View>
      </View>
    </View>
  );
};
