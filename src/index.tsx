import NoSsr from "@material-ui/core/NoSsr";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import App from "./App";
import "./bootstrapMUI"; /* Remove after Material-UI v4 release */
import browserHistory from "./browserHistory";
import * as serviceWorker from "./serviceWorker";
import store from "./store/redux.store";

ReactDOM.render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <NoSsr>
        <Route component={App} />
      </NoSsr>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
