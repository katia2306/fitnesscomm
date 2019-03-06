import { put, select } from "redux-saga/effects";
import {
  actions as themeActions,
  themeSelector
} from "../store/reducers/theme.reducer";

export function* toggleTheme() {
  const isThemeDark = !(yield select(themeSelector));
  yield put(themeActions.toggleThemeSuccess({ isThemeDark }));

  localStorage.isThemeDark = isThemeDark;
}
