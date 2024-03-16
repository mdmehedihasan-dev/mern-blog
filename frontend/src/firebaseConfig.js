/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e7398.firebaseapp.com",
  projectId: "mern-blog-e7398",
  storageBucket: "mern-blog-e7398.appspot.com",
  messagingSenderId: "695629853715",
  appId: "1:695629853715:web:236fd5251d71b20cbc3be6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

