// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCeJctaUAwvbB7wRU8Qb1q4hPKZ9xvQNVQ",
  authDomain: "vinder-7b6c9.firebaseapp.com",
  projectId: "vinder-7b6c9",
  storageBucket: "vinder-7b6c9.appspot.com",
  messagingSenderId: "94955979265",
  appId: "1:94955979265:web:07a91386865634749ff600",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// Firebase storage
