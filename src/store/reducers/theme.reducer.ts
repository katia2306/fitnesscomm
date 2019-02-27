import { IAction } from '../redux.model';

export interface ITheme {
  readonly isThemeDark: boolean;
}

export enum types {
  TOGGLE_THEME = 'TOGGLE_THEME'
}

const initState: ITheme = {
  isThemeDark: localStorage.isThemeDark === 'true'
};

export default (state: ITheme = initState, action: IAction<ITheme>): ITheme => {
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
  toggleTheme: (): IAction<ITheme> => ({
    type: types.TOGGLE_THEME
  })
};
