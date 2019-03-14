import React, { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
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
import { userActions } from "../../store/user.reducer";

interface Props {
  handleLoginRequest: typeof userActions.userLoginRequest;
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

const initialFormData = {
  email: "",
  password: "",
  rememberMe: false
};

const LoginForm = (props: Props) => {
  const { handleLoginRequest, onSignupButtonClick } = props;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginRequest(formData);
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
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
        onChange={handleTextFieldChange}
        value={formData.email}
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
        onChange={handleTextFieldChange}
        value={formData.password}
      />
      <div className={classes.rememberMeContainer}>
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
              color="primary"
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

const mapDispatchToProps = {
  handleLoginRequest: userActions.userLoginRequest
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginForm);
