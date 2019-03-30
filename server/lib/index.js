"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _express = _interopRequireDefault(require("express"));
var functions = _interopRequireWildcard(require("firebase-functions"));
var _user = _interopRequireDefault(require("./api/routes/user.route"));

const app = (0, _express.default)();

app.use("/users", _user.default);

app.get("/*", (req, res) => {
  console.log(
  "Route invalid: ",
  `${req.baseUrl}${req.originalUrl}`,
  "Body:",
  req.body,
  "Query:",
  req.query,
  "Headers:",
  req.headers);

  res.status(405).send("Fitnesscomm: This route is not supported yet.");
});

module.exports.api = functions.https.onRequest(app);