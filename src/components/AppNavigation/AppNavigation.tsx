import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Authentication from "../Authentication";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
});

const AppNavigation = () => {
  const classes = useStyles();
  const [authForm, setAuthForm] = useState("login");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLoginClick = () => {
    setAuthForm("login");
    setDialogOpen(true);
  };

  const handleSignupClick = () => {
    setAuthForm("signup");
    setDialogOpen(true);
  };

  const handleAuthFormChange = (form: string) => {
    setAuthForm(form);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.grow}>
          Fitnesscomm
        </Typography>
        <Button onClick={handleLoginClick}>Log in</Button>
        <Button onClick={handleSignupClick}>Sign up</Button>
      </Toolbar>
      <Authentication
        dialogOpen={dialogOpen}
        authForm={authForm}
        onDialogClose={handleDialogClose}
        changeAuthenticationForm={handleAuthFormChange}
      />
    </AppBar>
  );
};

export default AppNavigation;
