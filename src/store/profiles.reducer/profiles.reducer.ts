import { createSelector } from "reselect";
import { initialState, Profiles, ProfilesData } from "./profiles.model";
import ReduxModel, { ActionPayload, Action } from "../redux.model";
import { Omit, ReduxSelectors } from "../../utils/types.utils";

export enum profilesTypes {
  CREATE_PROFILE_REQUEST = "@@PROFILES/CREATE_PROFILE_REQUEST",
  CREATE_PROFILE_SUCCESS = "@@PROFILES/CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_FAILURE = "@@PROFILES/CREATE_PROFILE_FAILURE",

  FETCH_PROFILES_REQUEST = "@@PROFILES/FETCH_PROFILES_REQUEST",
  FETCH_PROFILES_SUCCESS = "@@PROFILES/FETCH_PROFILES_SUCCESS",
  FETCH_PROFILES_FAILURE = "@@PROFILES/FETCH_PROFILES_FAILURE",

  CREATE_PROFILES_FORM_RESET = "@@PROFILES/CREATE_PROFILES_FORM_RESET"
}

export default (
  state: Profiles = initialState,
  action: ActionPayload<
    Profiles | Profiles["createProfileError"] | Profiles["data"] | ProfilesData
  >
): Profiles => {
  const { type, payload } = action;

  switch (type) {
    case profilesTypes.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        createProfileError: payload as Profiles["createProfileError"]
      };

    case profilesTypes.FETCH_PROFILES_SUCCESS:
      return { ...state, data: payload as Profiles["data"], loaded: true };

    case profilesTypes.CREATE_PROFILES_FORM_RESET:
      return { ...state, createProfileError: undefined };

    case profilesTypes.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [(payload as ProfilesData).id]: { ...(payload as ProfilesData) }
        }
      };

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

  fetchProfilesRequest: (): Action => ({
    type: profilesTypes.FETCH_PROFILES_REQUEST
  }),
  fetchProfilesSuccess: (
    payload: Profiles["data"]
  ): ActionPayload<Profiles["data"]> => ({
    type: profilesTypes.FETCH_PROFILES_SUCCESS,
    payload
  }),

  createProfilesFormReset: (): Action => ({
    type: profilesTypes.CREATE_PROFILES_FORM_RESET
  })
};

const getProfiles = (state: ReduxModel) => state.profiles.data;

export const profilesSelectors: ReduxSelectors = {
  getProfiles: state => state.profiles.data,
  getProfilesIds: createSelector(
    getProfiles,
    profilesData => Object.keys(profilesData)
  ),
  getProfilesLoaded: state => state.profiles.loaded,
  getProfileById: (state, id) => state.profiles.data[id],
  getCreateProfileError: state => state.profiles.createProfileError
};
