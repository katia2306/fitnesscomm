import { useReducer } from "react";

interface AuthenticationDialog {
  dialogOpen: boolean;
  authForm: "login" | "signup";
}

enum types {
  SHOW_LOGIN_FORM = "SHOW_LOGIN_FORM",
  SHOW_SIGNUP_FORM = "SHOW_SIGNUP_FORM",
  CLOSE_AUTH_DIALOG = "CLOSE_AUTH_DIALOG"
}

interface Action {
  type: types;
}

const reducer = (
  state: AuthenticationDialog,
  payload: Action
): AuthenticationDialog => {
  const { type } = payload;

  switch (type) {
    case "SHOW_LOGIN_FORM":
      return { dialogOpen: true, authForm: "login" };

    case "SHOW_SIGNUP_FORM":
      return { dialogOpen: true, authForm: "signup" };

    case "CLOSE_AUTH_DIALOG":
      return { ...state, dialogOpen: false };

    default:
      return state;
  }
};

const initialState: AuthenticationDialog = {
  dialogOpen: false,
  authForm: "login"
};

const useAuthenticationDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showLoginForm = () => {
    dispatch({ type: types.SHOW_LOGIN_FORM });
  };

  const showSignupForm = () => {
    dispatch({ type: types.SHOW_SIGNUP_FORM });
  };

  const closeAuthDialog = () => {
    dispatch({ type: types.CLOSE_AUTH_DIALOG });
  };

  return {
    authDialogState: state,
    authDialogActions: { showLoginForm, showSignupForm, closeAuthDialog }
  };
};

export default useAuthenticationDialog;
