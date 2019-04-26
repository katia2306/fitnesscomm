import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Button, Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { AppNavigation, AppDrawer } from "./components";
import ReduxModel from "./store/redux.model";
import { themeSelectors } from "./store/theme.reducer";
import { darkTheme, lightTheme } from "./themes";
import { userSelectors } from "./store/user.reducer";
import { setAPIUrl } from "./utils/api.utils";
import UserRoute from "./routes/UserRoute";
import { Home, Profile, Profiles } from "./pages";
import { appRoutes } from "./routes/app.routes";

setAPIUrl();

interface Props {
  userLoaded: ReduxModel["user"]["loaded"];
  isThemeDark: ReduxModel["theme"]["isThemeDark"];
}

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: 8,
    marginTop: 56,
    "@media (min-width:600px)": {
      padding: 16
    }
  }
});

const App = (props: Props) => {
  const { isThemeDark, userLoaded } = props;
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = isThemeDark ? darkTheme : lightTheme;

  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const AppContent = (
    <Fragment>
      <CssBaseline />
      <AppNavigation onDrawerOpen={handleDrawerOpen} />
      <AppDrawer drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />
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
    </Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        action={[
          <Button key={0} color="inherit" size="small">
            {"Dismiss"}
          </Button>
        ]}
      >
        {AppContent}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  isThemeDark: themeSelectors.getTheme(state),
  userLoaded: userSelectors.isUserLoaded(state)
});

export default connect(mapStateToProps)(App);
