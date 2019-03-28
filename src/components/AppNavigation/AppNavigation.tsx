import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Theme,
  Link
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import useAuthenticationDialog from "../../hooks/useAuthenticationDialog";
import Authentication from "../Authentication";
import ToggleTheme from "../ThemeToggle";
import { userSelectors } from "../../store/user.reducer";
import ReduxModel from "../../store/redux.model";
import AccountMenu from "./AccountMenu";
import RouterLink from "../RouterLink";

interface Props {
  isAuthenticated: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& $signupButton, & $title": {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {},
  grow: {
    flexGrow: 1
  },
  textButton: {
    lineHeight: "normal"
  },
  signupButton: {}
}));

const AppNavigation = (props: Props) => {
  const { isAuthenticated } = props;
  const classes = useStyles();

  const {
    authDialogState: { dialogOpen, authForm },
    authDialogActions: { closeAuthDialog, showLoginForm, showSignupForm }
  } = useAuthenticationDialog();

  useEffect(() => {
    if (isAuthenticated && dialogOpen) {
      closeAuthDialog();
    }
  }, [closeAuthDialog, dialogOpen, isAuthenticated]);

  return (
    <AppBar position="static" className={classes.root} color="inherit">
      <Toolbar>
        <IconButton aria-label="Menu" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <RouterLink
          to="/"
          component={Link}
          variant="h6"
          underline="none"
          color="textPrimary"
          className={classes.title}
        >
          Fitnesscomm
        </RouterLink>
        <div className={classes.grow} />
        <ToggleTheme />
        {isAuthenticated ? (
          <AccountMenu />
        ) : (
          <div>
            <Button
              classes={{ root: classes.textButton }}
              onClick={showLoginForm}
            >
              Log in
            </Button>
            <Button
              classes={{ root: classes.textButton }}
              className={classes.signupButton}
              onClick={showSignupForm}
            >
              Sign up
            </Button>
          </div>
        )}
      </Toolbar>
      <Authentication
        dialogOpen={dialogOpen}
        authForm={authForm}
        showLoginForm={showLoginForm}
        showSignupForm={showSignupForm}
        closeAuthDialog={closeAuthDialog}
      />
    </AppBar>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  isAuthenticated: userSelectors.isUserAuthenticated(state)
});

export default connect(mapStateToProps)(AppNavigation);
