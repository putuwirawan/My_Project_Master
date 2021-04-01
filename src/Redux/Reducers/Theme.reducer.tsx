import {SetTheme, ThemeState, SET_THEME} from '../Model';

export const initialState: ThemeState = {
  isDarkTheme: false,
};

export function themeReducer(
  state = initialState,
  action: SetTheme,
): ThemeState {
  switch (action.type) {
    case SET_THEME: {
      return {
        ...state,
        isDarkTheme: action.data,
      };
    }
    default:
      return state;
  }
}
