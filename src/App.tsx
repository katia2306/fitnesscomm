import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { AppNavigation } from "./components";
import { Home } from "./pages";
import ReduxModel from "./store/redux.model";
import { themeSelectors } from "./store/theme.reducer";
import { darkTheme, lightTheme } from "./themes";
import { userSelectors } from "./store/user.reducer";

interface Props {
  loaded: ReduxModel["user"]["loaded"];
  isThemeDark: ReduxModel["theme"]["isThemeDark"];
}

const AppContent = (
  <Fragment>
    <CssBaseline />
    <AppNavigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={undefined} />
    </Switch>
  </Fragment>
);

const App = (props: Props) => {
  const { isThemeDark, loaded } = props;
  const theme = isThemeDark ? darkTheme : lightTheme;

  if (!loaded) {
    return <div>Loading...</div>;
  }

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
  loaded: userSelectors.isUserLoaded(state)
});

export default connect(mapStateToProps)(App);
