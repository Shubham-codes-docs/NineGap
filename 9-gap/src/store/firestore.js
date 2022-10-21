// import dotenv from "dotenv";
// dotenv.config();
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAgASNzNJwHpYjhthGz3BmK1lfOdiJ2S2U",
  authDomain: "ninegap-auth.firebaseapp.com",
  projectId: "ninegap-auth",
  storageBucket: "ninegap-auth.appspot.com",
  messagingSenderId: "186863040477",
  appId: "1:186863040477:web:9b6ddcc8a79933b9f0e834",
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
