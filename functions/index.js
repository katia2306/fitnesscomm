const express = require("express");
const functions = require("firebase-functions");
const { userRoute } = require("./api/routes/user.route");

const app = express();

app.use("/users", userRoute);

app.get("/*", (req, res) => {
  console.info("Route invalid: ", `${req.baseUrl}${req.originalUrl}`);
  console.info("Body:", req.body);
  console.info("Query:", req.query);
  console.info("Headers:", req.headers);
  res.status(405).send("Fitnesscomm: This route is not supported yet.");
});

const api = functions.https.onRequest(app);

module.exports = {
  api
};
