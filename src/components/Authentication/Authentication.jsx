import React from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { LoginForm, SignupForm } from "../../forms";

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

const Authentication = ({
  dialogOpen,
  authForm,
  closeAuthDialog,
  showLoginForm,
  showSignupForm
}) => {
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
        <CloseIcon />
      </IconButton>
      {authForm === "login" ? (
        <LoginForm onSignupButtonClick={showSignupForm} />
      ) : (
        <SignupForm onLoginButtonClick={showLoginForm} />
      )}
    </Dialog>
  );
};

Authentication.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  authForm: PropTypes.oneOf(["login", "signup"]).isRequired,
  showLoginForm: PropTypes.func.isRequired,
  showSignupForm: PropTypes.func.isRequired,
  closeAuthDialog: PropTypes.func.isRequired
};

export default Authentication;
