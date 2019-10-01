import firebase from "firebase";

const Config = {
  apiKey: "AIzaSyB3YWLOgbTFYYmj1qQnseb__CVDMvB0_D8",
  authDomain: "manager-c25f4.firebaseapp.com",
  databaseURL: "https://manager-c25f4.firebaseio.com",
  projectId: "manager-c25f4",
  storageBucket: "manager-c25f4.appspot.com",
  messagingSenderId: "744683634949",
  appId: "1:744683634949:web:05504f479140da3e",
};
const Firebase = firebase.initializeApp(Config);

export default Firebase;
