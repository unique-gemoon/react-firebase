// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmQT3BSnZO6wL8Op2G37CTxEhJdC3McB0",
  authDomain: "kyrkan-acf70.firebaseapp.com",
  projectId: "kyrkan-acf70",
  storageBucket: "kyrkan-acf70.appspot.com",
  messagingSenderId: "612519281630",
  appId: "1:612519281630:web:f51ae2d1ee0192c2c9134f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  //export const db = getFirestore();//Database
export const auth = getAuth(app); //Authorization
export const storage = getStorage(app);
