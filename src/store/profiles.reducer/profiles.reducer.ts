import { createSelector } from "reselect";
import { initialState, Profiles, ProfilesData } from "./profiles.model";
import { ActionPayload, Action } from "../redux.model";
import { Omit, ReduxSelectors } from "../../utils/types.utils";

export enum profilesTypes {
  CREATE_PROFILE_REQUEST = "@@PROFILES/CREATE_PROFILE_REQUEST",
  CREATE_PROFILE_SUCCESS = "@@PROFILES/CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_FAILURE = "@@PROFILES/CREATE_PROFILE_FAILURE",

  DELETE_PROFILE_REQUEST = "@@PROFILES/DELETE_PROFILE_REQUEST",
  DELETE_PROFILE_SUCCESS = "@@PROFILES/DELETE_PROFILE_SUCCESS",
  DELETE_PROFILE_FAILURE = "@@PROFILES/DELETE_PROFILE_FAILURE",

  FETCH_PROFILES_REQUEST = "@@PROFILES/FETCH_PROFILES_REQUEST",
  FETCH_PROFILES_SUCCESS = "@@PROFILES/FETCH_PROFILES_SUCCESS",
  FETCH_PROFILES_FAILURE = "@@PROFILES/FETCH_PROFILES_FAILURE",

  CREATE_PROFILES_FORM_RESET = "@@PROFILES/CREATE_PROFILES_FORM_RESET"
}

export default (
  state: Profiles = initialState,
  action: ActionPayload<
    | Profiles
    | Profiles["createProfileError"]
    | Profiles["data"]
    | ProfilesData
    | ProfilesData["id"]
  >
): Profiles => {
  const { type, payload } = action;

  switch (type) {
    case profilesTypes.CREATE_PROFILE_SUCCESS: {
      const profile = payload as ProfilesData;

      return {
        ...state,
        data: {
          ...state.data,
          [profile.id]: profile
        }
      };
    }

    case profilesTypes.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        createProfileError: payload as Profiles["createProfileError"]
      };

    case profilesTypes.DELETE_PROFILE_SUCCESS: {
      const profileId = payload as ProfilesData["id"];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [profileId]: removedData, ...newData } = state.data;

      return {
        ...state,
        data: newData
      };
    }

    case profilesTypes.FETCH_PROFILES_SUCCESS:
      return { ...state, data: payload as Profiles["data"], loaded: true };

    case profilesTypes.CREATE_PROFILES_FORM_RESET:
      return { ...state, createProfileError: undefined };

    default:
      return state;
  }
};

export const profilesActions = {
  createProfileRequest: (
    payload: Omit<ProfilesData, "id" | "createdAt">
  ): ActionPayload<Omit<ProfilesData, "id" | "createdAt">> => ({
    type: profilesTypes.CREATE_PROFILE_REQUEST,
    payload
  }),
  createProfileSuccess: (
    profile: ProfilesData
  ): ActionPayload<ProfilesData> => ({
    type: profilesTypes.CREATE_PROFILE_SUCCESS,
    payload: profile
  }),
  createProfileFailure: (
    payload: Profiles["createProfileError"]
  ): ActionPayload<Profiles["createProfileError"]> => ({
    type: profilesTypes.CREATE_PROFILE_FAILURE,
    payload
  }),
  deleteProfileRequest: (
    payload: ProfilesData["id"]
  ): ActionPayload<ProfilesData["id"]> => ({
    type: profilesTypes.DELETE_PROFILE_REQUEST,
    payload
  }),
  deleteProfileSuccess: (
    payload: ProfilesData["id"]
  ): ActionPayload<ProfilesData["id"]> => ({
    type: profilesTypes.DELETE_PROFILE_SUCCESS,
    payload
  }),
  deleteProfileFailure: (): Action => ({
    type: profilesTypes.DELETE_PROFILE_FAILURE
  }),
  fetchProfilesRequest: (): Action => ({
    type: profilesTypes.FETCH_PROFILES_REQUEST
  }),
  fetchProfilesSuccess: (
    payload: Profiles["data"]
  ): ActionPayload<Profiles["data"]> => ({
    type: profilesTypes.FETCH_PROFILES_SUCCESS,
    payload
  }),
  fetchProfilesFailure: (): Action => ({
    type: profilesTypes.FETCH_PROFILES_FAILURE
  }),
  createProfilesFormReset: (): Action => ({
    type: profilesTypes.CREATE_PROFILES_FORM_RESET
  })
};

export const profilesSelectors: ReduxSelectors = {
  getProfiles: state => state.profiles.data,
  getProfilesLoaded: state => state.profiles.loaded,
  getProfileById: (state, id) => state.profiles.data[id],
  getCreateProfileError: state => state.profiles.createProfileError
};

profilesSelectors.getProfilesIds = createSelector(
  profilesSelectors.getProfiles,
  profilesData => Object.keys(profilesData)
);
