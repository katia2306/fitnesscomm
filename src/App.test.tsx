import "./bootstrapMUI";
/* Remove previous lines after Material-UI v4 release */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import NoSsr from "@material-ui/core/NoSsr";
import App from "./App";
import browserHistory from "./browserHistory";
import "./index.css";
import store from "./store/redux.store";

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: undefined,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <NoSsr>
      <Router history={browserHistory}>
        <Provider store={store}>
          <Route component={App} />
        </Provider>
      </Router>
    </NoSsr>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
