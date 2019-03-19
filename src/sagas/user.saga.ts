/* eslint-disable no-console */
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
        reject(new Error("No user :("));
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
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
