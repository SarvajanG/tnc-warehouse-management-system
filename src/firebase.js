// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbzzuN-jznZdpm1VPQHLtq0_ubNQ0V1yI",
  authDomain: "tnc-warehouse-management.firebaseapp.com",
  projectId: "tnc-warehouse-management",
  storageBucket: "tnc-warehouse-management.firebasestorage.app",
  messagingSenderId: "1048757621932",
  appId: "1:1048757621932:web:d40b334f2071194a797b09",
  measurementId: "G-078JBXNWXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app); 