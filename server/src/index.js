import express from "express";
import * as functions from "firebase-functions";
import userRoute from "./api/routes/user.route";

const app = express();

app.use("/users", userRoute);

app.get("/*", (req, res) => {
  console.log(
    "Route invalid: ",
    `${req.baseUrl}${req.originalUrl}`,
    "Body:",
    req.body,
    "Query:",
    req.query,
    "Headers:",
    req.headers
  );
  res.status(405).send("Fitnesscomm: This route is not supported yet.");
});

module.exports.api = functions.https.onRequest(app);
