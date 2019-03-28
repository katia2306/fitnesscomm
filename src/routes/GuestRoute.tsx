import React from "react";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
import ReduxModel from "../store/redux.model";
import { userSelectors } from "../store/user.reducer";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<RouteComponentProps>;
}

const UserRoute = (props: Props) => {
  const { isAuthenticated, component: Component, ...other } = props;

  return (
    <Route
      {...other}
      render={renderProps =>
        !isAuthenticated ? <Component {...renderProps} /> : <Redirect to="/" />
      }
    />
  );
};

function mapStateToProps(state: ReduxModel) {
  return {
    isAuthenticated: userSelectors.isUserAuthenticated(state)
  };
}

export default connect(mapStateToProps)(UserRoute);
