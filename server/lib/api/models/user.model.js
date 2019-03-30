"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _firebase = require("../../firebase.admin");

class User {
  static async signupUser(email, password, firstname, lastname) {
    const user = await _firebase.admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      displayName: `${firstname} ${lastname}`,
      disabled: false });


    await _firebase.db.
    collection("users").
    doc(user.uid).
    set({
      firstname,
      lastname });


    return user;
  }}var _default =


User;exports.default = _default;