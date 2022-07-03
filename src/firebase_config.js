import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyC-qKhH2a4KHuNJmd4XOCjaFVNFdeH5mtU",
  authDomain: "epic-road-trip-cce0f.firebaseapp.com",
  projectId: "epic-road-trip-cce0f",
  storageBucket: "epic-road-trip-cce0f.appspot.com",
  messagingSenderId: "954646876707",
  appId: "1:954646876707:web:66f9e2049873c4e645d796",
  measurementId: "G-QGLP9EMFLD"
};
initializeApp(firebaseConfig);

export const auth = getAuth()

