import React from "react";
import { Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { makeStyles } from "@material-ui/styles";
import UserRoute from "./UserRoute";
import { appRoutes } from "./app.routes";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit * 7,
    "@media (min-width:600px)": {
      padding: theme.spacing.unit * 2
    }
  }
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
