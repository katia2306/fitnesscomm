import React from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { LoginForm, SignupForm } from "../../forms";

interface Props {
  dialogOpen: boolean;
  authForm: string;
  showLoginForm: () => void;
  showSignupForm: () => void;
  closeAuthDialog: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
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
    closeAuthDialog,
    showLoginForm,
    showSignupForm
  } = props;
  const classes = useStyles();
  const matchesMediaQuery = useMediaQuery("(max-width:600px)");

  return (
    <Dialog
      open={dialogOpen}
      onClose={closeAuthDialog}
      scroll="body"
      fullScreen={matchesMediaQuery}
      PaperProps={{ elevation: 4, className: classes.root }}
    >
      <IconButton onClick={closeAuthDialog} className={classes.closeButton}>
        <Close />
      </IconButton>
      {authForm === "login" ? (
        <LoginForm onSignupButtonClick={showSignupForm} />
      ) : (
        <SignupForm onLoginButtonClick={showLoginForm} />
      )}
    </Dialog>
  );
};

export default Authentication;
