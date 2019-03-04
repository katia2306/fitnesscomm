import { Button, FormControl, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  button: {
    marginTop: '20px'
  },
  form: {
    alignItems: 'center'
  }
});

const SignupForm = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.form}>
      <TextField label="Username" type="text" name="username" required={true} />
      <TextField label="Email" type="email" name="email" required={true} />
      <TextField
        label="Password"
        type="password"
        name="password"
        required={true}
      />
      <TextField
        label="Repeat password"
        type="password"
        name="repeat-password"
        required={true}
      />

      <Link href="/forgotpassword">Forgot password</Link>

      <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </FormControl>
  );
};

export default SignupForm;
