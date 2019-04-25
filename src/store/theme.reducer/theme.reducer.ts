import ReduxModel, { ActionPayload } from "../redux.model";
import { initialState, Theme } from "./theme.model";
import { ReduxSelectors } from "../../utils/types.utils";

export enum themeTypes {
  TOGGLE_THEME_REQUEST = "@@THEME/TOGGLE_THEME_REQUEST",
  TOGGLE_THEME_SUCCESS = "@@THEME/TOGGLE_THEME_SUCCESS"
}

export default (
  state: Theme = initialState,
  action: ActionPayload<Theme>
): Theme => {
  const { type, payload } = action;

  switch (type) {
    case themeTypes.TOGGLE_THEME_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const themeActions = {
  toggleThemeRequest: (payload: Theme): ActionPayload<Theme> => ({
    type: themeTypes.TOGGLE_THEME_REQUEST,
    payload
  }),
  toggleThemeSuccess: (payload: Theme): ActionPayload<Theme> => ({
    type: themeTypes.TOGGLE_THEME_SUCCESS,
    payload
  })
};

export const themeSelectors: ReduxSelectors = {
  getTheme: state => state.theme.isThemeDark
};
