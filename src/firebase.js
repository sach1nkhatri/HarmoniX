// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1qIBMq3H6er6Zx45JGl4EduxBjMO1yb8",
  authDomain: "fluted-visitor-410310.firebaseapp.com",
  databaseURL: "https://fluted-visitor-410310-default-rtdb.firebaseio.com",
  projectId: "fluted-visitor-410310",
  storageBucket: "fluted-visitor-410310.firebasestorage.app",
  messagingSenderId: "1099072704131",
  appId: "1:1099072704131:web:dc6c5d906bbfa3e7cfd5b6",
  measurementId: "G-LTDDWNDCC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);