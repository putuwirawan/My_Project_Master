import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import Home from './Screen/Home';

import { Dimensions } from 'react-native';
import { LocalNotification } from './Global';
const {width,height}=Dimensions.get('screen')
const App = () => {
  

  useEffect(() => {
    LocalNotification({message:'kopi jani gae', title:'susu', bigText:'kopi susu meseduh'})


  }, []);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
