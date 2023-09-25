import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getTasks } from './database/SQLite';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBr3s4kKNfBG0XdzCv6uNQj8IjWG937r48",
    authDomain: "travelmate-b7378.firebaseapp.com",
    projectId: "travelmate-b7378",
    storageBucket: "travelmate-b7378.appspot.com",
    messagingSenderId: "412421940051",
    appId: "1:412421940051:web:25c4ef822e6e8f2c5df7a6",
    measurementId: "G-WESGK4Y11E"
};





if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export async function uploadDataToFirestore (){
  try {
    const tasks = await getTasks(); // Get tasks from SQLite
    const tasksCollectionRef = db.collection('tasks');

    tasks.forEach(task => {
      tasksCollectionRef.add(task); // Upload each task to Firestore
    });

    console.log('Data uploaded to Firestore successfully');
  } catch (error) {
    console.error('Error uploading data to Firestore', error);
  }
};

// Call the function to start the upload process


export default firebase
