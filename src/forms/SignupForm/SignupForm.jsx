import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userActions, userSelectors } from "../../store/user.reducer";
import useFormData from "../../hooks/useFormData";
import { ButtonLink } from "../../components";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 20
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
  },
  passwordContainer: {
    display: "inline"
  },
  passwordInput: {
    width: "40%",
    marginRight: 10,
    marginBottom: theme.spacing.unit
  }
}));

const initialFormData = {
  email: "",
  name: "",
  firstname: "",
  lastname: "",
  password: "",
  repeatPassword: ""
};

const SignupForm = ({ onLoginButtonClick, userSignup }) => {
  const {
    formData,
    formDataActions: { handleInputChange }
  } = useFormData(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    userSignup(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id="signup-email"
        label="Email"
        type="email"
        name="email"
        variant="outlined"
        margin="dense"
        className={classes.textField}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        id="signup-name"
        label="Name"
        type="text"
        name="firstname"
        variant="outlined"
        className={classes.textField}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        id="signup-lastname"
        label="Last name"
        type="text"
        name="lastname"
        variant="outlined"
        className={classes.textField}
        onChange={handleInputChange}
        fullWidth
      />
      <div className={classes.passwordContainer}>
        <TextField
          id="signup-password"
          label="Create a password"
          type={showPassword ? "text" : "password"}
          name="password"
          variant="outlined"
          className={classes.passwordInput}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          id="signup-repeat-password"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          name="repeatPassword"
          variant="outlined"
          className={classes.passwordInput}
          onChange={handleInputChange}
          fullWidth
        />
        <IconButton onClick={togglePasswordVisibility}>
          {showPassword ? (
            <VisibilityOff fontSize="large" />
          ) : (
            <Visibility fontSize="large" />
          )}
        </IconButton>
      </div>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        fullWidth
        type="submit"
      >
        Submit
      </Button>
      <Divider />
      <div className={classes.signupContainer}>
        <Typography variant="body1" component="span" inline>
          Do you already have an account?
        </Typography>
        <ButtonLink button onClick={onLoginButtonClick}>
          Sign in
        </ButtonLink>
      </div>
    </form>
  );
};

SignupForm.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired,
  userSignup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signupError: userSelectors.getSignupError(state)
});

const mapDispatchToProps = {
  userSignup: userActions.userSignupRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
