import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import ReduxModel from "../store/redux.model";
import { userSelectors } from "../store/user.reducer";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

const UserRoute = (props: Props) => {
  const { isAuthenticated, component: Component, ...other } = props;
  return (
    <Route
      {...other}
      render={renderProps =>
        isAuthenticated ? <Component {...renderProps} /> : <Redirect to="/" />
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
