"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _firebase = _interopRequireDefault(require("../../firebase.admin"));

const authenticate = async (req, res, next) => {
  if (
  !req.headers.authorization ||
  !req.headers.authorization.startsWith("Bearer "))
  {
    return res.status(403).send("Unauthorized");
  }

  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await _firebase.default.auth().verifyIdToken(idToken);

    req.user = decodedIdToken;
    return next();
  } catch (error) {
    return res.status(403).send("Unauthorized");
  }
};var _default =

authenticate;exports.default = _default;