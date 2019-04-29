import { createSelector } from "reselect";

export const profilesTypes = {
  CREATE_PROFILE_REQUEST: "@@PROFILES/CREATE_PROFILE_REQUEST",
  CREATE_PROFILE_SUCCESS: "@@PROFILES/CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_FAILURE: "@@PROFILES/CREATE_PROFILE_FAILURE",

  DELETE_PROFILE_REQUEST: "@@PROFILES/DELETE_PROFILE_REQUEST",
  DELETE_PROFILE_SUCCESS: "@@PROFILES/DELETE_PROFILE_SUCCESS",
  DELETE_PROFILE_FAILURE: "@@PROFILES/DELETE_PROFILE_FAILURE",

  FETCH_PROFILES_REQUEST: "@@PROFILES/FETCH_PROFILES_REQUEST",
  FETCH_PROFILES_SUCCESS: "@@PROFILES/FETCH_PROFILES_SUCCESS",
  FETCH_PROFILES_FAILURE: "@@PROFILES/FETCH_PROFILES_FAILURE",

  CREATE_PROFILES_FORM_RESET: "@@PROFILES/CREATE_PROFILES_FORM_RESET"
};

const initialState = {
  data: {},
  loaded: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case profilesTypes.CREATE_PROFILE_SUCCESS: {
      const profile = payload;

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
        createProfileError: payload
      };

    case profilesTypes.DELETE_PROFILE_SUCCESS: {
      const profileId = payload;
      const { [profileId]: removedData, ...newData } = state.data;

      return {
        ...state,
        data: newData
      };
    }

    case profilesTypes.FETCH_PROFILES_SUCCESS:
      return { ...state, data: payload, loaded: true };

    case profilesTypes.CREATE_PROFILES_FORM_RESET:
      return { ...state, createProfileError: undefined };

    default:
      return state;
  }
};

export const profilesActions = {
  createProfileRequest: payload => ({
    type: profilesTypes.CREATE_PROFILE_REQUEST,
    payload
  }),
  createProfileSuccess: profile => ({
    type: profilesTypes.CREATE_PROFILE_SUCCESS,
    payload: profile
  }),
  createProfileFailure: payload => ({
    type: profilesTypes.CREATE_PROFILE_FAILURE,
    payload
  }),
  deleteProfileRequest: payload => ({
    type: profilesTypes.DELETE_PROFILE_REQUEST,
    payload
  }),
  deleteProfileSuccess: payload => ({
    type: profilesTypes.DELETE_PROFILE_SUCCESS,
    payload
  }),
  deleteProfileFailure: () => ({
    type: profilesTypes.DELETE_PROFILE_FAILURE
  }),
  fetchProfilesRequest: () => ({
    type: profilesTypes.FETCH_PROFILES_REQUEST
  }),
  fetchProfilesSuccess: payload => ({
    type: profilesTypes.FETCH_PROFILES_SUCCESS,
    payload
  }),
  fetchProfilesFailure: () => ({
    type: profilesTypes.FETCH_PROFILES_FAILURE
  }),
  createProfilesFormReset: () => ({
    type: profilesTypes.CREATE_PROFILES_FORM_RESET
  })
};

export const profilesSelectors = {
  getProfilesIds: createSelector(
    state => state.profiles.data,
    profilesData => Object.keys(profilesData)
  ),
  getProfilesLoaded: state => state.profiles.loaded,
  getProfileById: (state, id) => state.profiles.data[id],
  getCreateProfileError: state => state.profiles.createProfileError
};
