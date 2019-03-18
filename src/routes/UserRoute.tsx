import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import ReduxModel from "../store/redux.model";
import { isUserAuthenticated } from "../store/user.reducer";

interface Props {
  isAuthenticated: boolean;
  component: ComponentType<RouteComponentProps>;
}

const UserRoute = (props: Props) => {
  const { isAuthenticated, component: Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={renderProps =>
        isAuthenticated ? <Component {...renderProps} /> : <Redirect to="/" />
      }
    />
  );
};

function mapStateToProps(state: ReduxModel) {
  return {
    isAuthenticated: isUserAuthenticated(state)
  };
}

export default connect(mapStateToProps)(UserRoute);