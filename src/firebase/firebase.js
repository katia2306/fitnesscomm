import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA4jAeDBgVAz8lB69jVFO3p1tBmuWyQ0f0",
  authDomain: "fitnesscomm-141108.firebaseapp.com",
  databaseURL: "https://fitnesscomm-141108.firebaseio.com",
  projectId: "fitnesscomm-141108",
  storageBucket: "fitnesscomm-141108.appspot.com",
  messagingSenderId: "738602739026"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export default firebase;
