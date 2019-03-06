import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import ToggleTheme from "./components/ThemeToggle";
import { Home, Signin, Signup } from "./pages";
import { themeSelector } from "./store/reducers/theme.reducer";
import IReduxModel from "./store/redux.model";
import { darkTheme, lightTheme } from "./themes";

interface Props {
  isThemeDark: IReduxModel["theme"]["isThemeDark"];
}

const App = (props: Props) => {
  const { isThemeDark } = props;
  const theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <ToggleTheme />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IReduxModel) => ({
  isThemeDark: themeSelector(state)
});

export default connect(mapStateToProps)(App);
