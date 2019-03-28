import React, { FormEvent } from "react";
import {
  Button,
  Link,
  TextField,
  Typography,
  Divider,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { userActions, userSelectors } from "../../store/user.reducer";
import useFormData from "../../hooks/useFormData";
import ReduxModel from "../../store/redux.model";
import { withSnackbar, withSnackbarProps } from "notistack";

interface Props {
  onLoginButtonClick: () => void;
  userSignup: typeof userActions.userSignupRequest;
}

const useStyles = makeStyles((theme: Theme) => ({
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

const initialFormData = {
  email: "",
  name: "",
  firstname: "",
  lastname: "",
  password: ""
};

const SignupForm = (props: Props) => {
  const { onLoginButtonClick, userSignup } = props;
  const {
    formData,
    formDataActions: { handleTextFieldChange }
  } = useFormData(initialFormData);
  const classes = useStyles();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userSignup(formData);
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
        onChange={handleTextFieldChange}
        fullWidth
      />
      <TextField
        id="signup-name"
        label="Name"
        type="text"
        name="firstname"
        variant="outlined"
        className={classes.textField}
        onChange={handleTextFieldChange}
        fullWidth
      />
      <TextField
        id="signup-lastname"
        label="Last name"
        type="text"
        name="lastname"
        variant="outlined"
        className={classes.textField}
        onChange={handleTextFieldChange}
        fullWidth
      />
      <TextField
        id="signup-password"
        label="Create a password"
        type="password"
        name="password"
        variant="outlined"
        className={classes.textField}
        onChange={handleTextFieldChange}
        fullWidth
      />

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
        <Link
          onClick={onLoginButtonClick}
          component="button"
          variant="body1"
          type="button"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  signupError: userSelectors.getSignupError(state)
});

const mapDispatchToProps = {
  userSignup: userActions.userSignupRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
