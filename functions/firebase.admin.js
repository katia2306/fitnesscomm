const firebaseAdmin = require("firebase-admin");

const admin = firebaseAdmin.initializeApp();
const db = admin.firestore();

module.exports = {
  admin,
  db
};
