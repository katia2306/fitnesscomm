import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { userActions, User } from "../store/user.reducer";
import firebase from "../firebase/firebase";
import browserHistory from "../browserHistory";
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
    const user: firebase.User = yield call(onAuthStateChanged);
    const { uid, email, emailVerified, displayName } = user;

    const userFetched = yield call(userAPI.getUser);
    const { firstname, lastname } = userFetched;

    // if (false) {
    //   throw new Error("User is disabled or not found");
    // }

    const currentUser = {
      uid,
      email: email || "",
      emailVerified,
      displayName: displayName || "",
      firstname,
      lastname,
      shortName: firstname && firstname[0] ? firstname[0].toUpperCase() : "F"
    };

    yield put(userActions.userLoginSuccess(currentUser));
  } catch (error) {
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
