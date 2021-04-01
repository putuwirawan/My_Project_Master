export interface ThemeState {
  isDarkTheme: boolean;
}
export const SET_THEME = 'SET_THEME';

export interface SetTheme {
  type: typeof SET_THEME;
  data:boolean
}
