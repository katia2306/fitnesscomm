import { put } from "redux-saga/effects";
import { themeActions } from "../store/theme.reducer";

export function* toggleTheme(action) {
  const { isThemeDark } = action.payload;
  localStorage.isThemeDark = isThemeDark;

  yield put(themeActions.toggleThemeSuccess({ isThemeDark }));
}
