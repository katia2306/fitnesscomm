import * as firebaseAdmin from "firebase-admin";

export const admin = firebaseAdmin.initializeApp();
export const db = admin.firestore();
