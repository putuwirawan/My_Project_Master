import React, {FC} from 'react';

import {View, ScrollView} from 'react-native';
import {ButtonBrand} from './BrandButton';
import {catalogType, getCatalog} from '../Global/API';
import {BrandModel} from '../Global/Example/Brand';

interface SearchProps {
  data: any;
  onSelec: Function;
}

export const BrandList: FC<SearchProps> = props => {
  const {data, onSelec} = props;

  let dataOption: catalogType = {
    flags: 1,
    sortOrder: 'DESC',
    pageIndex: 0,
    pageSize: 20,
    brands: '',
    filter: '',
  };

  const getDataByBrand = async (brand: string) => {
    dataOption.brands = '';
    dataOption.filter = '';
    await getCatalog(dataOption)
      .then(res => {
       onSelec(res,brand)         
      })
      .catch(e => alert(e));
  };
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{margin: 3, padding: 3}}>
        {data.map((brand: BrandModel, index: number) => {
          return (
            <ButtonBrand
              key={index}
              data={brand}
              backgroundColor="blue"
              onPress={() => getDataByBrand(brand.deskription)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
