export const userTypes = {
  USER_LOGIN_REQUEST: "@@USER/USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS: "@@USER/USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE: "@@USER/USER_LOGIN_FAILURE",

  USER_SIGNUP_REQUEST: "@@USER/USER_SIGNUP_REQUEST",
  USER_SIGNUP_SUCCESS: "@@USER/USER_SIGNUP_SUCCESS",
  USER_SIGNUP_FAILURE: "@@USER/USER_SIGNUP_FAILURE",

  FETCH_CURRENT_USER_REQUEST: "@@USER/FETCH_CURRENT_USER_REQUEST",
  FETCH_CURRENT_USER_FAILURE: "@@USER/FETCH_CURRENT_USER_FAILURE",

  USER_LOGOUT_REQUEST: "@@USER/USER_LOGOUT_REQUEST",
  USER_LOGOUT_SUCCESS: "@@USER/USER_LOGOUT_SUCCESS",
  USER_LOGOUT_FAILURE: "@@USER/USER_LOGOUT_FAILURE",

  LOGIN_FORM_RESET: "@@USER/LOGIN_FORM_RESET"
};

const initialState = {
  loaded: false
};

export default (state = initialState, action) => {
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
      return { ...initialState };

    case userTypes.USER_LOGOUT_FAILURE:
    default:
      return state;
  }
};

export const userActions = {
  userLoginRequest: payload => ({
    type: userTypes.USER_LOGIN_REQUEST,
    payload
  }),
  userLoginSuccess: payload => ({
    type: userTypes.USER_LOGIN_SUCCESS,
    payload
  }),

  userLoginFailure: payload => ({
    type: userTypes.USER_LOGIN_FAILURE,
    payload
  }),

  userSignupRequest: payload => ({
    type: userTypes.USER_SIGNUP_REQUEST,
    payload
  }),

  userSignupSuccess: payload => ({
    type: userTypes.USER_SIGNUP_SUCCESS,
    payload
  }),

  userSignupFailure: payload => ({
    type: userTypes.USER_SIGNUP_FAILURE,
    payload
  }),

  fetchCurrentUserRequest: () => ({
    type: userTypes.FETCH_CURRENT_USER_REQUEST
  }),
  fetchCurrentUserFailure: () => ({
    type: userTypes.FETCH_CURRENT_USER_FAILURE
  }),

  userLogoutRequest: () => ({
    type: userTypes.USER_LOGOUT_REQUEST
  }),
  userLogoutSuccess: () => ({
    type: userTypes.USER_LOGOUT_SUCCESS
  }),
  userLogoutFailure: () => ({
    type: userTypes.USER_LOGOUT_FAILURE
  }),

  loginFormReset: () => ({
    type: userTypes.LOGIN_FORM_RESET
  })
};

export const userSelectors = {
  getUser: state => state.user,
  isUserAuthenticated: state => !!state.user.uid,
  isUserLoaded: state => state.user.loaded,
  getLoginError: state => state.user.loginError,
  getSignupError: state => state.user.signupError
};
