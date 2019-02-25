import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Home, Login, Signup } from './pages';
import IReduxState from './store/redux.model';
import { darkTheme, lightTheme } from './themes';

interface IProps {
  isThemeDark: boolean;
}

const App = (props: IProps) => {
  const { isThemeDark } = props;
  const theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/signup" component={Signup} />
      </Switch>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  isThemeDark: state.theme.isThemeDark
});

export default connect(mapStateToProps)(App);
