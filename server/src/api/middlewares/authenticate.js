import admin from "../../firebase.admin";

const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).send("Unauthorized");
  }

  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedIdToken;
    return next();
  } catch (error) {
    return res.status(403).send("Unauthorized");
  }
};

export default authenticate;
