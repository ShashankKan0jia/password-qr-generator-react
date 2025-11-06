import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPuAupzwnXEqaYw01ELn2VhJfLOjlGYs",
  authDomain: "password-generator-app-new.firebaseapp.com",
  projectId: "password-generator-app-new",
  storageBucket: "password-generator-app-new.firebasestorage.app",
  messagingSenderId: "114969041173",
  appId: "1:114969041173:web:a6e9646b35fdb23065711c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
