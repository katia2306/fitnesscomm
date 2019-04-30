import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { userSelectors } from "../store/user.reducer";
import { appRoutes } from "./app.routes";

const UserRoute = ({ isAuthenticated, component: Component, ...other }) => {
  return (
    <Route
      {...other}
      render={renderProps =>
        isAuthenticated ? (
          <Component {...renderProps} />
        ) : (
          <Redirect to={appRoutes.HOME} />
        )
      }
    />
  );
};

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: userSelectors.isUserAuthenticated(state)
  };
}

export default connect(mapStateToProps)(UserRoute);
