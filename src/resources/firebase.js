// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEIBPJigWsBvPAviXEetsbs1-sWVkQyvM",
  authDomain: "laringsavatar.firebaseapp.com",
  projectId: "laringsavatar",
  storageBucket: "laringsavatar.appspot.com",
  messagingSenderId: "1097221338853",
  appId: "1:1097221338853:web:d130ef55309de10b2cc60c",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth();

//Storage
export const storage = getStorage(firebaseApp);
// export const storageRef = ref("animations");

// listAll().then(function (result) {
//   console.log("burde komme etter dette");
//   result.items.forEach(function (animationRef) {
//     console.log(animationRef);
//   });
// });

// connectAuthEmulator(auth, "http://localhost:9099");
