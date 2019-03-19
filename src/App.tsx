import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppNavigation } from "./components";
import { Home } from "./pages";
import ReduxModel from "./store/redux.model";
import { getTheme } from "./store/theme.reducer";
import { darkTheme, lightTheme } from "./themes";

interface Props {
  isThemeDark: ReduxModel["theme"]["isThemeDark"];
}

const App = (props: Props) => {
  const { isThemeDark } = props;
  const theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNavigation />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  isThemeDark: getTheme(state)
});

export default connect(mapStateToProps)(App);
