import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useAuthenticationDialog from "../../hooks/useAuthenticationDialog";
import Authentication from "../Authentication";
import ToggleTheme from "../ThemeToggle";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  grow: {
    flexGrow: 1
  }
}));

const enterDelay = 500;
const leaveDelay = 200;

const AppNavigation = () => {
  const classes = useStyles();
  const { authDialogState, authDialogActions } = useAuthenticationDialog();

  const { dialogOpen, authForm } = authDialogState;

  return (
    <AppBar position="static">
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
        <Button onClick={authDialogActions.showLoginForm}>Sign in</Button>
        <Button onClick={authDialogActions.showSignupForm}>Sign up</Button>
      </Toolbar>
      <Authentication
        dialogOpen={dialogOpen}
        authForm={authForm}
        authDialogActions={authDialogActions}
      />
    </AppBar>
  );
};

export default AppNavigation;
