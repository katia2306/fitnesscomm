import { call, put } from "redux-saga/effects";
import { userActions } from "../store/user.reducer";
import firebase, { db } from "../firebase/firebase";
import browserHistory from "../browserHistory";
import { appRoutes } from "../routes/app.routes";
import userAPI from "../api/user.api";

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No current user logged in"));
      }
    });
  });
};

export function* fetchCurrentUser() {
  try {
    const user = yield call(onAuthStateChanged);
    const { uid, email, emailVerified, displayName } = user;

    const userRef = db.collection("users").doc(uid);
    const userFetched = yield call([userRef, userRef.get]);

    if (!userFetched.exists) {
      throw new Error("User is disabled or not found");
    }

    const userData = userFetched.data();
    const { firstname, lastname } = userData;

    const currentUser = {
      uid,
      email: email || "",
      emailVerified,
      displayName: displayName || "",
      firstname,
      lastname,
      shortName: email ? email[0] : "F"
    };

    yield put(userActions.userLoginSuccess(currentUser));
  } catch (error) {
    yield put(userActions.fetchCurrentUserFailure());
  }
}

export function* userLogin(action) {
  const { email, password = "", rememberMe } = action.payload;
  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  try {
    const auth = firebase.auth();

    yield call([auth, auth.setPersistence], persistence);
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield call(fetchCurrentUser);

    browserHistory.push(appRoutes.HOME);
  } catch (error) {
    const loginError = {
      code: error.code,
      message: error.message
    };
    yield put(userActions.userLoginFailure({ loginError }));
  }
}

export function* userLogout() {
  try {
    const auth = firebase.auth();

    yield call([auth, auth.signOut]);
    yield put(userActions.userLogoutSuccess());
    browserHistory.push(appRoutes.HOME);
  } catch {
    yield put(userActions.userLogoutFailure());
  }
}

export function* userSignup(action) {
  const { payload } = action;

  try {
    yield call(userAPI.signupUser, payload);
    yield put(userActions.userLoginRequest(payload));
    yield put(userActions.userSignupSuccess(payload));
  } catch (error) {
    const signupError = {
      code: error.code,
      message: error.message
    };
    yield put(userActions.userSignupFailure({ signupError }));
  }
}
