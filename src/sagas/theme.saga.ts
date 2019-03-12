import { put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { Theme, themeActions } from "../store/theme.reducer";

export function* toggleTheme(action: ActionPayload<Theme>) {
  const { isThemeDark } = action.payload;
  localStorage.isThemeDark = isThemeDark;

  yield put(themeActions.toggleThemeSuccess({ isThemeDark }));
}
