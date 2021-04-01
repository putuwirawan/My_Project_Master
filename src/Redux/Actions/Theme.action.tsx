import {Dispatch} from 'react';
import {SetTheme, SET_THEME} from '../Model';

export const thougleTheme = (value:boolean) => {
  return async (dispatch: Dispatch<SetTheme>) => {
    dispatch({type: SET_THEME, data:value});
  };
};
