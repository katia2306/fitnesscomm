import { initialState, Profiles, ProfilesData } from "./profiles.model";
import { ActionPayload, Action } from "../redux.model";

export enum profilesTypes {
  CREATE_PROFILE_REQUEST = "@@PROFILES/CREATE_PROFILE_REQUEST",
  CREATE_PROFILE_SUCCESS = "@@PROFILES/CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_FAILURE = "@@PROFILES/CREATE_PROFILE_FAILURE"
}

export default (
  state: Profiles = initialState,
  action: ActionPayload<Profiles | Profiles["createProfileError"]>
): Profiles => {
  const { type, payload } = action;

  switch (type) {
    case profilesTypes.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        createProfileError: payload as Profiles["createProfileError"]
      };

    case profilesTypes.CREATE_PROFILE_SUCCESS:
    default:
      return state;
  }
};

export const profilesActions = {
  createProfileRequest: (
    payload: ProfilesData
  ): ActionPayload<ProfilesData> => ({
    type: profilesTypes.CREATE_PROFILE_REQUEST,
    payload
  }),
  createProfileSuccess: (): Action => ({
    type: profilesTypes.CREATE_PROFILE_SUCCESS
  }),
  createProfileFailure: (
    payload: Profiles["createProfileError"]
  ): ActionPayload<Profiles["createProfileError"]> => ({
    type: profilesTypes.CREATE_PROFILE_FAILURE,
    payload
  })
};
