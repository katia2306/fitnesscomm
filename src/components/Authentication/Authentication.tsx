import { Dialog, IconButton } from "@material-ui/core";
// tslint:disable-next-line: import-blacklist
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { LoginForm, SignupForm } from "../../forms";

interface Props {
  dialogOpen: boolean;
  authForm: string;
  authDialogActions: {
    showLoginForm: () => void;
    showSignupForm: () => void;
    closeAuthDialog: () => void;
  };
}

const useStyles = makeStyles(theme => ({
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
  const { dialogOpen, authForm, authDialogActions } = props;
  const classes = useStyles();
  const matchesMediaQuery = useMediaQuery("(max-width:600px)");

  return (
    <Dialog
      open={dialogOpen}
      onClose={authDialogActions.closeAuthDialog}
      scroll="body"
      fullScreen={matchesMediaQuery}
      PaperProps={{ elevation: 4, className: classes.root }}
    >
      <IconButton
        onClick={authDialogActions.closeAuthDialog}
        className={classes.closeButton}
      >
        <Close />
      </IconButton>
      {authForm === "login" ? (
        <LoginForm onSignupButtonClick={authDialogActions.showSignupForm} />
      ) : (
        <SignupForm onLoginButtonClick={authDialogActions.showLoginForm} />
      )}
    </Dialog>
  );
};

export default Authentication;
