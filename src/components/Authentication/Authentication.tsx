import { Dialog, IconButton, Theme } from "@material-ui/core";
// tslint:disable-next-line: import-blacklist
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { LoginForm, SignupForm } from "../../forms";

interface Props {
  dialogOpen: boolean;
  authForm: string;
  onDialogClose: () => void;
  changeAuthenticationForm: (form: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    textAlign: "center"
  },
  closeButton: {
    marginTop: theme.spacing.unit,
    marginLeft: -theme.spacing.unit,
    marginRight: "auto"
  }
}));

const Authentication = (props: Props) => {
  const {
    dialogOpen,
    authForm,
    onDialogClose,
    changeAuthenticationForm
  } = props;
  const classes = useStyles();
  const matchesMediaQuery = useMediaQuery("(max-width:600px)");

  const setToLoginForm = () => {
    changeAuthenticationForm("login");
  };

  const setToSignupForm = () => {
    changeAuthenticationForm("signup");
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={onDialogClose}
      scroll="body"
      fullScreen={matchesMediaQuery}
      PaperProps={{ elevation: 4, className: classes.root }}
    >
      <IconButton onClick={onDialogClose} className={classes.closeButton}>
        <Close />
      </IconButton>
      {authForm === "login" ? (
        <LoginForm onSignupButtonClick={setToSignupForm} />
      ) : (
        <SignupForm onLoginButtonClick={setToLoginForm} />
      )}
    </Dialog>
  );
};

export default Authentication;
