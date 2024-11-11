// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// this is secret , dont share 
const firebaseConfig = {
  apiKey: "AIzaSyCjs3_mc62UZC8JCwT265hdYALB_wAsQWM",
  authDomain: "email-pass-ph-2.firebaseapp.com",
  projectId: "email-pass-ph-2",
  storageBucket: "email-pass-ph-2.firebasestorage.app",
  messagingSenderId: "537564650795",
  appId: "1:537564650795:web:67dd67133486cba411f96e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
