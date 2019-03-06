import { Button, Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { SignupForm } from "../../forms";

interface Props {
  handleSigninButton: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    flex: 1,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 10}px`
  },
  welcomeMessage: {
    flexBasis: "40%",
    padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 3}px`
  },
  body: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  }
}));

const Signup = (props: Props) => {
  const classes = useStyles();
  const { handleSigninButton } = props;

  return (
    <Grid container alignItems="stretch">
      <Grid item className={classes.welcomeMessage}>
        <Typography component="h1" variant="h4">
          Welcome Back!
        </Typography>
        <Typography variant="body1" className={classes.body}>
          To keep connected with us please login using your account information.
        </Typography>
        <Button variant="outlined" size="large" onClick={handleSigninButton}>
          SIGN IN
        </Button>
      </Grid>

      <Grid item className={classes.formContainer}>
        <Typography component="h1" variant="h4">
          Create Account
        </Typography>

        <SignupForm />
      </Grid>
    </Grid>
  );
};

export default Signup;
