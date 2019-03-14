import { ActionPayload, Action } from "../redux.model";
import { initialState, User, GuestUser } from "./user.model";

export enum userTypes {
  USER_LOGIN_REQUEST = "@@USER/USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "@@USER/USER_LOGIN_SUCCESS",
  FETCH_CURRENT_USER_REQUEST = "@@USER/FETCH_CURRENT_USER_REQUEST"
}

export default (
  state: User = initialState,
  action: ActionPayload<User>
): User => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.USER_LOGIN_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const userActions = {
  userLoginRequest: (payload: GuestUser): ActionPayload<GuestUser> => ({
    type: userTypes.USER_LOGIN_REQUEST,
    payload
  }),
  userLoginSuccess: (payload: User): ActionPayload<User> => ({
    type: userTypes.USER_LOGIN_SUCCESS,
    payload
  }),
  fetchCurrentUserRequest: (): Action => ({
    type: userTypes.FETCH_CURRENT_USER_REQUEST
  })
};
