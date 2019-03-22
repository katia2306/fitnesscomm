import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Theme
} from "@material-ui/core";
import { Menu as MenuIcon, AccountBox, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
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
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type],
    marginLeft: theme.spacing.unit * 2,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },
  textButton: {
    lineHeight: "normal"
  },
  signupButton: {},
  accountMenu: {
    maxWidth: "300px",
    width: "300px",
    paddingTop: 0
  },
  accountMenuHeader: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    "&, &:hover, &:focus": {
      backgroundColor: `${theme.palette.action.hover} !important`
    }
  },
  menuAvatar: {
    width: "45px",
    height: "45px",
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type]
  }
}));

const enterDelay = 500;
const leaveDelay = 200;

const AppNavigation = (props: Props) => {
  const { email, isAuthenticated, userLogout } = props;
  const classes = useStyles();

  const {
    authDialogState: { dialogOpen, authForm },
    authDialogActions: { closeAuthDialog, showLoginForm, showSignupForm }
  } = useAuthenticationDialog();

  const [avatarEl, setAvatarEl] = useState<HTMLElement | undefined>(undefined);
  const accountMenuOpen = !!avatarEl;

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
        <Typography variant="h6" className={classes.title}>
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
            <ToggleTheme />
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
              MenuListProps={{ className: classes.accountMenu }}
              PaperProps={{ component: "nav" }}
            >
              <MenuItem className={classes.accountMenuHeader} selected>
                <ListItemAvatar>
                  <Avatar className={classes.menuAvatar}>
                    {email[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={email}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </MenuItem>
            </Menu>
          </div>
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
