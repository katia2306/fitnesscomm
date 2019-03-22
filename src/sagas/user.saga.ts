import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { userActions, User } from "../store/user.reducer";
import firebase from "../firebase/firebase";

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("There is no current user logged in"));
      }
    });
  });
};

export function* fetchCurrentUser() {
  try {
    const user: firebase.User = yield call(onAuthStateChanged);

    const currentUser = {
      uid: user.uid,
      email: user.email || "",
      emailVerified: user.emailVerified
    };

    yield put(userActions.userLoginSuccess(currentUser));
  } catch {
    yield put(userActions.fetchCurrentUserFailure());
  }
}

export function* userLogin(action: ActionPayload<User>) {
  const { email, password = "", rememberMe } = action.payload;
  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  try {
    const auth = firebase.auth();

    yield call([auth, auth.setPersistence], persistence);
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield call(fetchCurrentUser);
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
  } catch (error) {
    console.log(error);
  }
}
