// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKUOx8Cux49KdARXHvhZ4-udxTFHFVO24",
  authDomain: "leviatan-cff63.firebaseapp.com",
  projectId: "leviatan-cff63",
  storageBucket: "leviatan-cff63.appspot.com",
  messagingSenderId: "372969899753",
  appId: "1:372969899753:web:d16358459691ea6a511278",
  measurementId: "G-BXPLNQNY2X"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export default appFirebase;