"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));

const router = _express.default.Router();

router.get("/", _authenticate.default, (req, res) => {
  return res.json(req.user);
});

router.post("/signup", async (req, res) => {
  const { email, password, repeatPassword, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    const error = {
      code: "app/invalid-user-data",
      message: "User data is not complete or invalid" };

    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }

  if (password !== repeatPassword) {
    const error = {
      code: "app/invalid-password-match",
      message: "Password and RepeatPassword must match" };

    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }

  try {
    const user = await _user.default.signupUser(
    email,
    password,
    firstname,
    lastname);


    console.log("Successfully created new user:", user.uid);
    return res.json(user);
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }
});var _default =

router;exports.default = _default;