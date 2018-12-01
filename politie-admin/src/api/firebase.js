import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAcXKMw4l8XRmR-RDi91E9coJmzpgbHVjc",
  authDomain: "popo-2f46c.firebaseapp.com",
  databaseURL: "https://popo-2f46c.firebaseio.com",
  projectId: "popo-2f46c",
  storageBucket: "popo-2f46c.appspot.com",
  messagingSenderId: "844600835211"
};

const fb = firebase
  .initializeApp(firebaseConfig)
  .database()
  .ref();

export default fb;
