import React, { useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useAuthenticationDialog from "../../hooks/useAuthenticationDialog";
import Authentication from "../Authentication";
import ToggleTheme from "../ThemeToggle";
import { userSelectors } from "../../store/user.reducer";
import AccountMenu from "./AccountMenu";
import { TextLink } from "..";
import { appRoutes } from "../../utils/config.utils";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    "& $signupButton, & $title": {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
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

const AppNavigation = ({ isAuthenticated, onDrawerOpen }) => {
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
    <AppBar className={classes.root} position="fixed" color="inherit">
      <Toolbar>
        <IconButton
          aria-label="Menu"
          className={classes.menuButton}
          onClick={onDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <TextLink to={appRoutes.HOME} variant="h6" className={classes.title}>
          Fitnesscomm
        </TextLink>
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

AppNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: userSelectors.isUserAuthenticated(state)
});

export default connect(mapStateToProps)(AppNavigation);
