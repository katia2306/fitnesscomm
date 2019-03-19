import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  MenuItem,
  Menu
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import indigo from "@material-ui/core/colors/indigo";
import useAuthenticationDialog from "../../hooks/useAuthenticationDialog";
import Authentication from "../Authentication";
import ToggleTheme from "../ThemeToggle";
import { isUserAuthenticated, userActions } from "../../store/user.reducer";
import ReduxModel from "../../store/redux.model";

interface Props {
  email: ReduxModel["user"]["email"];
  isAuthenticated: boolean;
  userLogout: typeof userActions.userLogoutRequest;
}

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    color: "#fff",
    backgroundColor: indigo[400],
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },
  textButton: {
    lineHeight: "normal"
  },
  signupButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

const enterDelay = 500;
const leaveDelay = 200;

const AppNavigation = (props: Props) => {
  const { email, isAuthenticated, userLogout } = props;
  const classes = useStyles();
  const { authDialogState, authDialogActions } = useAuthenticationDialog();

  const [avatarEl, setAvatarEl] = useState<HTMLElement | undefined>(undefined);
  const accountMenuOpen = !!avatarEl;

  const { dialogOpen, authForm } = authDialogState;

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAvatarEl(undefined);
  };

  const handleLogoutClick = () => {
    handleAccountMenuClose();
    userLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="Menu"
          color="inherit"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.title}>
          Fitnesscomm
        </Typography>
        <div className={classes.grow} />
        <Tooltip
          title="Toggle light/dark theme"
          enterDelay={enterDelay}
          leaveDelay={leaveDelay}
          interactive
        >
          <div>
            <ToggleTheme color="inherit" />
          </div>
        </Tooltip>
        {isAuthenticated ? (
          <div>
            <Avatar className={classes.avatar} onClick={handleAccountMenuOpen}>
              {email[0].toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={avatarEl}
              open={accountMenuOpen}
              onClose={handleAccountMenuClose}
            >
              <MenuItem onClick={handleAccountMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button
              color="inherit"
              classes={{ root: classes.textButton }}
              onClick={authDialogActions.showLoginForm}
            >
              Log in
            </Button>
            <Button
              color="inherit"
              classes={{ root: classes.textButton }}
              className={classes.signupButton}
              onClick={authDialogActions.showSignupForm}
            >
              Sign up
            </Button>
          </div>
        )}
      </Toolbar>
      <Authentication
        dialogOpen={dialogOpen}
        authForm={authForm}
        authDialogActions={authDialogActions}
      />
    </AppBar>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  email: state.user.email,
  isAuthenticated: isUserAuthenticated(state)
});

const mapDispatchToProps = {
  userLogout: userActions.userLogoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
