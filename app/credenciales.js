import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKUOx8Cux49KdARXHvhZ4-udxTFHFVO24",
  authDomain: "leviatan-cff63.firebaseapp.com",
  projectId: "leviatan-cff63",
  storageBucket: "leviatan-cff63.appspot.com",
  messagingSenderId: "372969899753",
  appId: "1:372969899753:web:d16358459691ea6a511278",
  measurementId: "G-BXPLNQNY2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;

// Exportamos una función para inicializar Analytics solo en el cliente
export function initializeAnalytics() {
  if (typeof window !== 'undefined') {
    const { getAnalytics } = require("firebase/analytics");
    return getAnalytics(app);
  }
  return null;
}