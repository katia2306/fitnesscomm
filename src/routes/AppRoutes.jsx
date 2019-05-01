import React from "react";
import { Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { makeStyles } from "@material-ui/styles";
import UserRoute from "./UserRoute";
import { appRoutes } from "../utils/config.utils";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit,
    "@media (min-width:600px)": {
      padding: theme.spacing.unit * 2
    }
  },
  toolbar: theme.mixins.toolbar
}));

const loadableOptions = {
  fallback: <div>Loading...</div>
};

const Home = loadable(() => import("../pages/Home"), loadableOptions);
const Profile = loadable(() => import("../pages/Profile"), loadableOptions);
const Profiles = loadable(() => import("../pages/Profiles"), loadableOptions);

const AppRoutes = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
      component="main"
      spacing={8}
    >
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path={appRoutes.HOME} component={Home} />
        <UserRoute path={appRoutes.USER_PROFILE} component={Profile} />
        <UserRoute path={appRoutes.PROFILES} component={Profiles} />
        <Route exact component={undefined} />
      </Switch>
    </Grid>
  );
};

export default AppRoutes;
