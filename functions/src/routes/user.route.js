const express = require("express");
const { admin, db } = require("../firebase.admin");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, repeatPassword, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      const error = {
        code: "app/invalid-user-data",
        message: "User data is not complete or invalid"
      };
      console.log("Error creating new user:", error);
      return res.status(400).json(error);
    }

    if (password !== repeatPassword) {
      const error = {
        code: "app/invalid-password-match",
        message: "Password and RepeatPassword must match"
      };
      console.log("Error creating new user:", error);
      return res.status(400).json(error);
    }

    const user = await admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      displayName: `${firstname} ${lastname}`,
      disabled: false
    });

    await db
      .collection("users")
      .doc(user.uid)
      .set({
        firstname,
        lastname
      });

    console.log("Successfully created new user:", user.uid);
    return res.json(user);
  } catch (error) {
    console.log("Error creating new user:", error);
    return res.status(400).json(error);
  }
});

module.exports = {
  router
};
