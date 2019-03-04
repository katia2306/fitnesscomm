import { Button, TextField, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing.unit * 2}px`
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
}));

const SigninForm = () => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField
        id="signin-email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="dense"
        variant="outlined"
        fullWidth
      />

      <TextField
        id="signin-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="dense"
        variant="outlined"
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        SIGN IN
      </Button>
    </form>
  );
};

export default SigninForm;
