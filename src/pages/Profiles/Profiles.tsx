import React from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { Theme, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import Helmet from "react-helmet";
import { CaloriesCalculator, ButtonLink } from "../../components";
import { appRoutes } from "../../routes/app.routes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    flex: 1
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  }
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <ButtonLink
      to={appRoutes.PROFILES_NEW}
      fab
      color="primary"
      aria-label="Add"
      className={classes.fab}
    >
      <AddIcon />
    </ButtonLink>
  );
};

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
      <Route exact path={appRoutes.PROFILES} component={MainPage} />
      <Route
        exact
        path={appRoutes.PROFILES_NEW}
        component={CaloriesCalculator}
      />
    </Grid>
  );
};

export default Profiles;
