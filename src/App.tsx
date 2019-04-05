import React, { Fragment } from "react";
import { connect } from "react-redux";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Button, Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { AppNavigation } from "./components";
import ReduxModel from "./store/redux.model";
import { themeSelectors } from "./store/theme.reducer";
import { darkTheme, lightTheme } from "./themes";
import { userSelectors } from "./store/user.reducer";
import { setAPIUrl } from "./utils/api.utils";
import UserRoute from "./routes/UserRoute";
import { Home, Profile } from "./pages";

setAPIUrl();

interface Props {
  userLoaded: ReduxModel["user"]["loaded"];
  isThemeDark: ReduxModel["theme"]["isThemeDark"];
}

const useStyles = makeStyles({
  root: {
    padding: "16px",
    "@media (min-width:600px)": {
      padding: "24px"
    }
  }
});

const App = (props: Props) => {
  const { isThemeDark, userLoaded } = props;
  const classes = useStyles();

  const theme = isThemeDark ? darkTheme : lightTheme;

  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  const AppContent = (
    <Fragment>
      <CssBaseline />
      <AppNavigation />
      <Grid
        container
        justify="center"
        className={classes.root}
        component="main"
        spacing={8}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <UserRoute exact path="/profile" component={Profile} />
          <Route component={undefined} />
        </Switch>
      </Grid>
    </Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
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
