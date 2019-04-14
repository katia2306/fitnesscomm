import { takeLatest } from "redux-saga/effects";
import { themeTypes } from "../store/theme.reducer";
import { userTypes } from "../store/user.reducer";
import { profilesTypes } from "../store/profiles.reducer";
import * as themeSagas from "./theme.saga";
import * as userSagas from "./user.saga";
import * as profilesSagas from "./profiles.saga";

export default function* indexSaga() {
  yield takeLatest(themeTypes.TOGGLE_THEME_REQUEST, themeSagas.toggleTheme);

  yield takeLatest(userTypes.USER_LOGIN_REQUEST, userSagas.userLogin);
  yield takeLatest(
    userTypes.FETCH_CURRENT_USER_REQUEST,
    userSagas.fetchCurrentUser
  );
  yield takeLatest(userTypes.USER_LOGOUT_REQUEST, userSagas.userLogout);
  yield takeLatest(userTypes.USER_SIGNUP_REQUEST, userSagas.userSignup);

  yield takeLatest(
    profilesTypes.CREATE_PROFILE_REQUEST,
    profilesSagas.createProfile
  );
}
