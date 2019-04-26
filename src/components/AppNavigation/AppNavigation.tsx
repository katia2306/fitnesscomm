import React, { useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Theme } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import useAuthenticationDialog from "../../hooks/useAuthenticationDialog";
import Authentication from "../Authentication";
import ToggleTheme from "../ThemeToggle";
import { userSelectors } from "../../store/user.reducer";
import ReduxModel from "../../store/redux.model";
import AccountMenu from "./AccountMenu";
import { TextLink } from "..";
import { appRoutes } from "../../routes/app.routes";

interface Props {
  isAuthenticated: boolean;
  onDrawerOpen: () => void;
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
  const { isAuthenticated, onDrawerOpen } = props;
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
    <AppBar className={classes.root} color="inherit">
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

const mapStateToProps = (state: ReduxModel) => ({
  isAuthenticated: userSelectors.isUserAuthenticated(state)
});

export default connect(mapStateToProps)(AppNavigation);
