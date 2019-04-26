import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import Helmet from "react-helmet";
import { CaloriesCalculator } from "../../components";
import { appRoutes } from "../../routes/app.routes";
import ProfilesMainPage from "./ProfilesMainPage";

const useStyles = makeStyles({
  root: {
    position: "relative",
    flex: 1
  }
});

const Profiles = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="column"
      className={classes.root}
      component="section"
    >
      <Helmet title="Profiles" />
      <Route exact path={appRoutes.PROFILES} component={ProfilesMainPage} />
      <Route
        exact
        path={appRoutes.PROFILES_NEW}
        component={CaloriesCalculator}
      />
    </Grid>
  );
};

export default Profiles;
