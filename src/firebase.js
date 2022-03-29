// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz-HkuhQrsJqFvGT3s3c8cABXEv2pO6VY",
  authDomain: "auth-development-be0d3.firebaseapp.com",
  projectId: "auth-development-be0d3",
  storageBucket: "auth-development-be0d3.appspot.com",
  messagingSenderId: "416882591713",
  appId: "1:416882591713:web:e52099ebdb1433a4e274a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
