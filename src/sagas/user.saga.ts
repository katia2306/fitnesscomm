import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { userActions, User } from "../store/user.reducer";
import firebase, { db } from "../firebase/firebase";
import browserHistory from "../browserHistory";

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
    const user: firebase.User = yield call(onAuthStateChanged);
    const { uid, email, emailVerified, displayName } = user;

    const userRef = db.collection("users").doc(uid);
    const userFetched = yield call([userRef, userRef.get]);

    if (!userFetched.exists || !email || !displayName) {
      throw new Error("User does't exist");
    }

    const userData: User = userFetched.data();
    const { firstname, lastname } = userData;

    const currentUser = {
      uid,
      email,
      emailVerified,
      displayName,
      firstname,
      lastname,
      shortName: displayName[0].toUpperCase()
    };

    yield put(userActions.userLoginSuccess(currentUser));
  } catch (error) {
    yield put(userActions.fetchCurrentUserFailure());
    return error;
  }
  return true;
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

    const error = yield call(fetchCurrentUser);
    if (error instanceof Error) {
      throw error;
    }

    browserHistory.push("/");
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
    browserHistory.push("/");
  } catch {
    yield put(userActions.userLogoutFailure());
  }
}
