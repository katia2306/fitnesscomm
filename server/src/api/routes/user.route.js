import express from "express";
import userModel from "../models/user.model";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  return res.json(req.user);
});

router.post("/signup", async (req, res) => {
  const { email, password, repeatPassword, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    const error = {
      code: "app/invalid-user-data",
      message: "User data is not complete or invalid"
    };
    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }

  if (password !== repeatPassword) {
    const error = {
      code: "app/invalid-password-match",
      message: "Password and RepeatPassword must match"
    };
    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }

  try {
    const user = await userModel.signupUser(
      email,
      password,
      firstname,
      lastname
    );

    console.log("Successfully created new user:", user.uid);
    return res.json(user);
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(400).json(error);
  }
});

export default router;
