import { takeLatest } from "redux-saga/effects";
import { themeTypes } from "../store/theme.reducer";
import * as themeSagas from "./theme.saga";

export default function* indexSaga() {
  yield takeLatest(themeTypes.TOGGLE_THEME_REQUEST, themeSagas.toggleTheme);
}
