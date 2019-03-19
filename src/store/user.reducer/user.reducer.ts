import ReduxModel, { ActionPayload, Action } from "../redux.model";
import { initialState, User } from "./user.model";

export enum userTypes {
  USER_LOGIN_REQUEST = "@@USER/USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "@@USER/USER_LOGIN_SUCCESS",
  FETCH_CURRENT_USER_REQUEST = "@@USER/FETCH_CURRENT_USER_REQUEST",
  USER_LOGOUT_REQUEST = "@@USER/USER_LOGOUT_REQUEST",
  USER_LOGOUT_SUCCESS = "@@USER/USER_LOGOUT_SUCCESS"
}

export default (
  state: User = initialState,
  action: ActionPayload<User>
): User => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.USER_LOGIN_SUCCESS:
      return { ...state, ...payload };

    case userTypes.USER_LOGOUT_SUCCESS:
      return { ...initialState };

    default:
      return state;
  }
};

export const userActions = {
  userLoginRequest: (payload: Partial<User>): ActionPayload<Partial<User>> => ({
    type: userTypes.USER_LOGIN_REQUEST,
    payload
  }),
  userLoginSuccess: (payload: User): ActionPayload<User> => ({
    type: userTypes.USER_LOGIN_SUCCESS,
    payload
  }),
  fetchCurrentUserRequest: (): Action => ({
    type: userTypes.FETCH_CURRENT_USER_REQUEST
  }),
  userLogoutRequest: (): Action => ({
    type: userTypes.USER_LOGOUT_REQUEST
  }),
  userLogoutSuccess: (): Action => ({
    type: userTypes.USER_LOGOUT_SUCCESS
  })
};

export const isUserAuthenticated = (state: ReduxModel) => !!state.user.uid;
