import {combineReducers} from 'redux';
import {logingReducer} from './Loging.reducer';
import {themeReducer} from './Theme.reducer';

export const rootReducer = combineReducers({
  loging: logingReducer,
  theme: themeReducer,
  // miwah sane liyane
});
export type RootState = ReturnType<typeof rootReducer>;
