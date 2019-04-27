import { call, put } from "redux-saga/effects";
import { ActionPayload } from "../store/redux.model";
import {
  Profiles,
  profilesActions,
  ProfilesData
} from "../store/profiles.reducer";
import firebase, { db } from "../firebase/firebase";
import { parseError } from "../utils/firebase.utils";
import browserHistory from "../browserHistory";
import { appRoutes } from "../routes/app.routes";
import { Omit } from "../utils/types.utils";

export function* createProfile(
  action: ActionPayload<Omit<ProfilesData, "id" | "createdAt">>
) {
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
    const profiles: Profiles["data"] = {};
    profilesFetched.forEach(
      (querySnapshot: firebase.firestore.QueryDocumentSnapshot) => {
        const profile = querySnapshot.data() as ProfilesData;
        profiles[querySnapshot.id] = { id: querySnapshot.id, ...profile };
      }
    );
    yield put(profilesActions.fetchProfilesSuccess(profiles));
  } catch (error) {
    yield put(profilesActions.fetchProfilesFailure());
  }
}

export function* deleteProfile(action: ActionPayload<ProfilesData["id"]>) {
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
