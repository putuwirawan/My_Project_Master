import {combineReducers} from 'redux';
import {logingReducer} from './Loging.reducer';
import {themeReducer} from './Theme.reducer';
import {cartReducer} from './Cart.reducer';
export const rootReducer = combineReducers({
  loging: logingReducer,
  theme: themeReducer,
  cart:cartReducer
  // miwah sane liyane
});
export type RootState = ReturnType<typeof rootReducer>;
