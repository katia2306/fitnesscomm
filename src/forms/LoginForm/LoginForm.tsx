import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Theme
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withSnackbar, withSnackbarProps } from "notistack";
import { userActions, userSelectors } from "../../store/user.reducer";
import useFormData from "../../hooks/useFormData";
import ReduxModel from "../../store/redux.model";

interface Props extends withSnackbarProps {
  onSignupButtonClick: () => void;
  userLogin: typeof userActions.userLoginRequest;
  loginFormReset: typeof userActions.loginFormReset;
  loginError: ReduxModel["user"]["loginError"];
}

const useStyles = makeStyles((theme: Theme) => ({
  loginContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: "center"
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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textAlign: "center"
  },
  signupButton: {
    marginLeft: theme.spacing.unit
  }
}));

const initialFormData = {
  email: "",
  password: "",
  rememberMe: false
};

const LoginForm = (props: Props) => {
  const {
    onSignupButtonClick,
    userLogin,
    loginFormReset,
    loginError,
    enqueueSnackbar
  } = props;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formData,
    formDataActions: { handleInputChange, handleCheckboxChange }
  } = useFormData(initialFormData);
  const { email, password, rememberMe } = formData;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    userLogin(formData);
  };

  useEffect(() => {
    if (loginError) {
      enqueueSnackbar(loginError.message, { variant: "error" });
    }
    setLoading(false);
  }, [enqueueSnackbar, loginError]);

  useEffect(() => {
    return () => {
      loginFormReset();
    };
  }, [loginFormReset]);

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
        onChange={handleInputChange}
        value={email}
      />
      <TextField
        id="login-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
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
        onChange={handleInputChange}
        value={password}
      />
      <div className={classes.rememberMeContainer}>
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
          }
          label="Remember me"
        />
      </div>
      <div className={classes.loginContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
        >
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

const mapStateToProps = (state: ReduxModel) => ({
  loginError: userSelectors.getLoginError(state)
});

const mapDispatchToProps = {
  userLogin: userActions.userLoginRequest,
  loginFormReset: userActions.loginFormReset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LoginForm));
