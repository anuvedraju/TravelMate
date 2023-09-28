import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr3s4kKNfBG0XdzCv6uNQj8IjWG937r48",
  authDomain: "travelmate-b7378.firebaseapp.com",
  projectId: "travelmate-b7378",
  storageBucket: "travelmate-b7378.appspot.com",
  messagingSenderId: "412421940051",
  appId: "1:412421940051:web:25c4ef822e6e8f2c5df7a6",
  measurementId: "G-WESGK4Y11E",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

// "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {}
//   },
//   "submit": {
//     "production": {}
//   }
