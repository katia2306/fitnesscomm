import { 
  Button, 
  Link, 
  TextField, 
  Typography,
  Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
  onLoginButtonClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "20px"
  },
  form: {
    alignItems: "center"
  },
  textField: {
    marginBottom: theme.spacing.unit
  },
  birthdayContainer: {
    textAlign: "left"
  },
  signupContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  }
  }));

const SignupForm = (props: Props) => {
  const { onLoginButtonClick } = props;
  const classes = useStyles();

  return (
    <form noValidate>
      <TextField
        id="signup-email" 
        label="Email" 
        type="email" 
        name="email"
        variant="outlined"
        margin="dense"
        className={classes.textField}
        fullWidth />
      <TextField
        id="signup-name" 
        label="Name" 
        type="text" 
        name="name"
        variant="outlined"
        className={classes.textField}
        fullWidth />
        <TextField
          id="signup-lastname" 
          label="Last name" 
          type="text" 
          name="lastname"
          variant="outlined"
          className={classes.textField}
          fullWidth />
      <TextField
        id="signup-password" 
        label="Create a password" 
        type="password"
        name="password"
        variant="outlined"
        className={classes.textField}
        fullWidth />
      <div className={classes.birthdayContainer}>
        <Typography variant="h6" component="span" inline>
          Birthday
        </Typography>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }} />
      </div>

    <Button variant="contained" color="primary" className={classes.button} fullWidth>
      Submit
    </Button>
    <Divider />
    <div className={classes.signupContainer}>
      <Typography variant="body1" component="span" inline>
        Do you already have an account?
      </Typography>
      <Link
        onClick={onLoginButtonClick}
        component="button"
        variant="body1"
        type="button">
        Sign in
      </Link>
    </div>
    </form>
  );
};

export default SignupForm;
