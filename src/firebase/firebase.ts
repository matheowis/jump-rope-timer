import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
// import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

// console.log('FIREBASE')

// db.doc("users/mat").set({
//   first: "Mat",
//   last: "Lovelace",
//   born: 1815
// }).then(() => {
//   console.log("Status saved");
// }).catch(error => {
//   console.error("Error adding document: ", error);
// });

export { 
  firebase, 
  googleAuthProvider 
}


