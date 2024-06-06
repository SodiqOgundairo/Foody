// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO6APrnpKoznZ_K1PpYX7qghgtbQuCxW8",
  authDomain: "foodybyyemi.firebaseapp.com",
  projectId: "foodybyyemi",
  storageBucket: "foodybyyemi.appspot.com",
  messagingSenderId: "462582572299",
  appId: "1:462582572299:web:63b6d010d12a2cc0e4ae0e",
  measurementId: "G-3CC3D11R38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);