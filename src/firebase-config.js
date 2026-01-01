// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg0GdJX4FbIfzxa3MZZe-IIXij7Yd1K-Y",
  authDomain: "chat-app-c2595.firebaseapp.com",
  projectId: "chat-app-c2595",
  storageBucket: "chat-app-c2595.firebasestorage.app",
  messagingSenderId: "159101771578",
  appId: "1:159101771578:web:671157787324fe07203a03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);