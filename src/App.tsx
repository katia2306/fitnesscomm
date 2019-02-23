import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Home, Login, Signup } from './pages';
import { darkTheme, lightTheme } from './themes';

const App = ({ isThemeDark }) => {
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

App.propTypes = {
  isThemeDark: PropTypes.bool.isRequired
};

const mapStateToProps = () => ({
  isThemeDark: state.theme.isThemeDark
});

export default connect(mapStateToProps)(App);
