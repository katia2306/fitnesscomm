import { Paper, Theme, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Signin, Signup } from "../../pages";

const timeout = 300;

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    maxWidth: "768px",
    textAlign: "center",
    overflow: "hidden"
  },
  formContainer: {
    flex: 1,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 10}px`
  },
  welcomeMessage: {
    flexBasis: "40%",
    padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 3}px`
  }
}));

const Authentication = () => {
  const classes = useStyles();
  const [showSignin, setShowSignin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const toggleSigninForm = () => {
    setShowSignin(!showSignin);
  };

  const toggleSignupForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <React.Fragment>
      <Zoom
        in={showSignin}
        unmountOnExit
        onExited={toggleSignupForm}
        timeout={timeout}
      >
        <Paper className={classes.paper} elevation={4}>
          <Signin handleSignupButton={toggleSigninForm} />
        </Paper>
      </Zoom>

      <Zoom
        in={showSignup}
        unmountOnExit
        onExited={toggleSigninForm}
        timeout={timeout}
      >
        <Paper className={classes.paper} elevation={4}>
          <Signup handleSigninButton={toggleSignupForm} />
        </Paper>
      </Zoom>
    </React.Fragment>
  );
};

export default Authentication;
