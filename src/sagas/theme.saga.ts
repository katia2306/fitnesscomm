import { put, select } from "redux-saga/effects";
import { getTheme, themeActions } from "../store/theme.reducer";

export function* toggleTheme() {
  const isThemeDark = !(yield select(getTheme));
  yield put(themeActions.toggleThemeSuccess({ isThemeDark }));

  localStorage.isThemeDark = isThemeDark;
}
