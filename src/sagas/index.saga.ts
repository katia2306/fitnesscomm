import { takeLatest } from "redux-saga/effects";
import { types as themeTypes } from "../store/reducers/theme.reducer";
import { toggleTheme } from "./theme.saga";

export default function* indexSaga() {
  yield takeLatest(themeTypes.TOGGLE_THEME_REQUEST, toggleTheme);
}
