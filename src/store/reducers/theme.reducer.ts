import { Action } from "../redux.model";

export interface Theme {
  readonly isThemeDark: boolean;
}

export enum types {
  TOGGLE_THEME = "TOGGLE_THEME"
}

const initState: Theme = {
  isThemeDark: localStorage.isThemeDark === "true"
};

export default (state: Theme = initState, action: Action<Theme>): Theme => {
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
  toggleTheme: (): Action<Theme> => ({
    type: types.TOGGLE_THEME
  })
};
