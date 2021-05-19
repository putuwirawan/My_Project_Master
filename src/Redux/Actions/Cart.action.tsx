import {Dispatch} from 'react';
import {CartModel, AddCart, ADD_CART} from '../Model';

export const addCart = (carts: CartModel[]) => {
  return async (dispatch: Dispatch<AddCart>) => {
    dispatch({type: ADD_CART, data: carts, count: carts.length});
  };
};
