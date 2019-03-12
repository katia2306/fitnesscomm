import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { FormEvent, useState } from "react";

interface Props {
  onSignupButtonClick: () => void;
}

const useStyles = makeStyles(theme => ({
  loginContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  rememberMeContainer: {
    textAlign: "left",
    marginTop: theme.spacing.unit - 4
  },
  forgotPassword: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  signupContainer: {
    display: "inline-flex",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  signupButton: {
    marginLeft: theme.spacing.unit
  }
}));

const LoginForm = (props: Props) => {
  const { onSignupButtonClick } = props;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id="login-email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="login-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        margin="dense"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <div className={classes.rememberMeContainer}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={toggleRememberMe}
              color="primary"
            />
          }
          label="Remember me"
        />
      </div>
      <div className={classes.loginContainer}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          Log in
        </Button>
        <Link
          className={classes.forgotPassword}
          component="button"
          variant="body2"
          type="button"
        >
          Forgot password?
        </Link>
      </div>
      <Divider />
      <div className={classes.signupContainer}>
        <Typography variant="body1" component="span" inline>
          Don&apos;t have an account?
        </Typography>
        <Link
          onClick={onSignupButtonClick}
          component="button"
          variant="body1"
          type="button"
          className={classes.signupButton}
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
