import { takeLatest } from "redux-saga/effects";
import { themeTypes } from "../store/theme.reducer";
import { userTypes } from "../store/user.reducer";
import * as themeSagas from "./theme.saga";
import * as userSagas from "./user.saga";

export default function* indexSaga() {
  yield takeLatest(themeTypes.TOGGLE_THEME_REQUEST, themeSagas.toggleTheme);

  yield takeLatest(userTypes.USER_LOGIN_REQUEST, userSagas.userLogin);
  yield takeLatest(
    userTypes.FETCH_CURRENT_USER_REQUEST,
    userSagas.fetchCurrentUser
  );
}
