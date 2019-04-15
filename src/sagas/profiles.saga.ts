import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import { Profiles, profilesActions } from "../store/profiles.reducer";
import firebase, { db } from "../firebase/firebase";
import { parseError } from "../utils/firebase.utils";

export function* createProfile(action: ActionPayload<Profiles>) {
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

    yield call([profilesRef, profilesRef.set], {
      ...action.payload,
      createdAt: firebase.firestore.Timestamp.now()
    });
    yield put(profilesActions.createProfileSuccess());
  } catch (error) {
    yield put(profilesActions.createProfileFailure(parseError(error)));
  }
}
