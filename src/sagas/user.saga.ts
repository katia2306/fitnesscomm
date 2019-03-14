/* eslint-disable no-console */
import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { userActions, GuestUser } from "../store/user.reducer";
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

export function* userLogin(action: ActionPayload<GuestUser>) {
  const { email, password = "" } = action.payload;
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    fetchCurrentUser();
  } catch (error) {
    console.log(error);
  }
}
