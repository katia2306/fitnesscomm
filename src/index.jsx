import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import NoSsr from "@material-ui/core/NoSsr";
import App from "./App";
import browserHistory from "./browserHistory";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store/redux.store";

ReactDOM.render(
  <NoSsr>
    <Router history={browserHistory}>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </Router>
  </NoSsr>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
