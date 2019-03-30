const { admin, db } = require("../../firebase.admin");

class User {
  static async signupUser(email, password, firstname, lastname) {
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

    return user;
  }
}

module.exports = {
  userModel: User
};
