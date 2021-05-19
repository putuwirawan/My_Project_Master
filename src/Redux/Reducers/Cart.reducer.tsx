import {ADD_CART, CartAction, CartState} from '../Model';

export const initialState: CartState = {
  carts: [],
  cartsCount: 0,
};

export function cartReducer(
  state = initialState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case ADD_CART: {
      return {
        carts: action.data,
        cartsCount: action.count,
      };
    }

    default:
      return state;
  }
}
