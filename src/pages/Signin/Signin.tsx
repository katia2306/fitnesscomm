import { Button, Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { SigninForm } from "../../forms";

interface Props {
  handleSignupButton: () => void;
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

const Signin = (props: Props) => {
  const classes = useStyles();
  const { handleSignupButton } = props;

  return (
    <Grid container alignItems="stretch">
      <Grid item className={classes.formContainer}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>

        <Typography component="h1" variant="h5">
          to Fitnesscomm
        </Typography>

        <SigninForm />
      </Grid>

      <Grid item className={classes.welcomeMessage}>
        <Typography component="h1" variant="h4">
          Hello, Friend!
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Don't have an account?
          <br />
          Click the sign up button below and join us.
        </Typography>
        <Button variant="outlined" size="large" onClick={handleSignupButton}>
          SIGN UP
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signin;
