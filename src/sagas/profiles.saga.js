import { call, put } from "redux-saga/effects";
import { profilesActions } from "../store/profiles.reducer";
import firebase, { db } from "../firebase/firebase";
import { parseError } from "../utils/firebase.utils";
import browserHistory from "../browserHistory";
import { appRoutes } from "../utils/config.utils";

export function* createProfile(action) {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error("User is not logged in");
    }

    const { uid } = currentUser;
    const profilesRef = db
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .doc();

    const newProfile = {
      id: profilesRef.id,
      ...action.payload,
      createdAt: firebase.firestore.Timestamp.now()
    };

    yield call([profilesRef, profilesRef.set], newProfile);
    yield put(profilesActions.createProfileSuccess(newProfile));
    browserHistory.push(appRoutes.PROFILES);
  } catch (error) {
    yield put(profilesActions.createProfileFailure(parseError(error)));
  }
}

export function* fetchProfiles() {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error("User is not logged in");
    }

    const { uid } = currentUser;
    const profilesRef = db
      .collection("users")
      .doc(uid)
      .collection("profiles");

    const profilesFetched = yield call([profilesRef, profilesRef.get]);
    const profiles = {};

    profilesFetched.forEach(querySnapshot => {
      const profile = querySnapshot.data();
      profiles[querySnapshot.id] = { id: querySnapshot.id, ...profile };
    });
    yield put(profilesActions.fetchProfilesSuccess(profiles));
  } catch (error) {
    yield put(profilesActions.fetchProfilesFailure());
  }
}

export function* deleteProfile(action) {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error("User is not logged in");
    }

    const { uid } = currentUser;
    const { payload } = action;

    const profileRef = db
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .doc(payload);

    yield call([profileRef, profileRef.delete]);
    yield put(profilesActions.deleteProfileSuccess(payload));
  } catch (error) {
    yield put(profilesActions.deleteProfileFailure());
  }
}
