import ReduxModel, { ActionPayload, Action } from "../redux.model";
import { initialState, User } from "./user.model";

export enum userTypes {
  USER_LOGIN_REQUEST = "@@USER/USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "@@USER/USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE = "@@USER/USER_LOGIN_FAILURE",

  USER_SIGNUP_REQUEST = "@@USER/USER_SIGNUP_REQUEST",
  USER_SIGNUP_SUCCESS = "@@USER/USER_SIGNUP_SUCCESS",
  USER_SIGNUP_FAILURE = "@@USER/USER_SIGNUP_FAILURE",

  FETCH_CURRENT_USER_REQUEST = "@@USER/FETCH_CURRENT_USER_REQUEST",
  FETCH_CURRENT_USER_FAILURE = "@@USER/FETCH_CURRENT_USER_FAILURE",

  USER_LOGOUT_REQUEST = "@@USER/USER_LOGOUT_REQUEST",
  USER_LOGOUT_SUCCESS = "@@USER/USER_LOGOUT_SUCCESS",
  USER_LOGOUT_FAILURE = "@@USER/USER_LOGOUT_FAILURE",

  LOGIN_FORM_RESET = "@@USER/LOGIN_FORM_RESET"
}

export default (
  state: User = initialState,
  action: ActionPayload<User>
): User => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.USER_LOGIN_SUCCESS:
      return { ...state, ...payload, loaded: true, loginError: undefined };

    case userTypes.USER_LOGIN_FAILURE:
      return { ...state, ...payload };

    case userTypes.USER_SIGNUP_SUCCESS:
      return { ...state, ...payload, loaded: true, loginError: undefined };

    case userTypes.USER_SIGNUP_FAILURE:
      return { ...state, ...payload };

    case userTypes.LOGIN_FORM_RESET:
      return { ...state, loginError: undefined };

    case userTypes.FETCH_CURRENT_USER_FAILURE:
      return { ...state, loaded: true };

    case userTypes.USER_LOGOUT_SUCCESS:
      return { ...initialState, loaded: true };

    case userTypes.USER_LOGOUT_FAILURE:
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

  userLoginFailure: (payload: Partial<User>): ActionPayload<Partial<User>> => ({
    type: userTypes.USER_LOGIN_FAILURE,
    payload
  }),

  userSignupRequest: (
    payload: Partial<User>
  ): ActionPayload<Partial<User>> => ({
    type: userTypes.USER_SIGNUP_REQUEST,
    payload
  }),

  userSignupSuccess: (
    payload: Partial<User>
  ): ActionPayload<Partial<User>> => ({
    type: userTypes.USER_SIGNUP_SUCCESS,
    payload
  }),

  userSignupFailure: (
    payload: Partial<User>
  ): ActionPayload<Partial<User>> => ({
    type: userTypes.USER_SIGNUP_FAILURE,
    payload
  }),

  fetchCurrentUserRequest: (): Action => ({
    type: userTypes.FETCH_CURRENT_USER_REQUEST
  }),
  fetchCurrentUserFailure: (): Action => ({
    type: userTypes.FETCH_CURRENT_USER_FAILURE
  }),

  userLogoutRequest: (): Action => ({
    type: userTypes.USER_LOGOUT_REQUEST
  }),
  userLogoutSuccess: (): Action => ({
    type: userTypes.USER_LOGOUT_SUCCESS
  }),
  userLogoutFailure: (): Action => ({
    type: userTypes.USER_LOGOUT_FAILURE
  }),

  loginFormReset: (): Action => ({
    type: userTypes.LOGIN_FORM_RESET
  })
};

export const userSelectors = {
  isUserAuthenticated: (state: ReduxModel) => !!state.user.uid,
  getEmail: (state: ReduxModel) => state.user.email,
  isUserLoaded: (state: ReduxModel) => state.user.loaded,
  getLoginError: (state: ReduxModel) => state.user.loginError,
  getSignupError: (state: ReduxModel) => state.user.signupError
};
