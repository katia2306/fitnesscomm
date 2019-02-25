import { IAction } from '../redux.model';

export enum types {
  TOGGLE_THEME
}

export interface IThemeState {
  isThemeDark: boolean;
}

const initialState: IThemeState = {
  isThemeDark: localStorage.isThemeDark === 'true'
};

export default (state = initialState, action: IAction<IThemeState>) => {
  const { type } = action;

  switch (type) {
    case types.TOGGLE_THEME: {
      const isThemeDark = !state.isThemeDark;
      localStorage.isThemeDark = isThemeDark;
      return { ...state, isThemeDark };
    }

    default:
      return state;
  }
};

export const actions = {
  toggleTheme: (): IAction<IThemeState> => ({
    type: types.TOGGLE_THEME
  })
};
