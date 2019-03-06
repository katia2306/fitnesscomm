import ReduxModel, { Action, ActionPayload } from "../redux.model";

export interface Theme {
  readonly isThemeDark: boolean;
}

export enum types {
  TOGGLE_THEME_REQUEST = "@@THEME/TOGGLE_THEME_REQUEST",
  TOGGLE_THEME_SUCCESS = "@@THEME/TOGGLE_THEME_SUCCESS"
}

const initState: Theme = {
  isThemeDark: localStorage.isThemeDark === "true"
};

export default (
  state: Theme = initState,
  action: ActionPayload<Theme>
): Theme => {
  const { type } = action;

  switch (type) {
    case types.TOGGLE_THEME_SUCCESS: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};

export const actions = {
  toggleThemeRequest: (): Action => ({
    type: types.TOGGLE_THEME_REQUEST
  }),
  toggleThemeSuccess: (payload: Theme): ActionPayload<Theme> => ({
    type: types.TOGGLE_THEME_SUCCESS,
    payload
  })
};

export const themeSelector = (state: ReduxModel) => state.theme.isThemeDark;
