import { Button, FormControl, Link, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

interface Props {
  onLoginButtonClick: () => void;
}

const useStyles = makeStyles({
  button: {
    marginTop: "20px"
  },
  form: {
    alignItems: "center"
  }
});

const SignupForm = (props: Props) => {
  const { onLoginButtonClick } = props;
  const classes = useStyles();

  return (
    <form noValidate>
      <FormControl className={classes.form}>
        <TextField label="Username" type="text" name="username" required />
        <TextField label="Email" type="email" name="email" required />
        <TextField label="Password" type="password" name="password" required />
        <TextField
          label="Repeat password"
          type="password"
          name="repeat-password"
          required
        />

        <Button variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </FormControl>
      <Link
        onClick={onLoginButtonClick}
        component="button"
        variant="body1"
        type="button"
      >
        Sign in
      </Link>
    </form>
  );
};

export default SignupForm;
