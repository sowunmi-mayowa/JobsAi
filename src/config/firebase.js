// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9z1ju5SRZQPiOZG4tAHyAXUxiqmDKz9k",
  authDomain: "jobsai-e203d.firebaseapp.com",
  projectId: "jobsai-e203d",
  storageBucket: "jobsai-e203d.firebasestorage.app",
  messagingSenderId: "111297897627",
  appId: "1:111297897627:web:50f13c524f98b14741523e",
  measurementId: "G-P5837L6TRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)