import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey:"AIzaSyAJVyhifJr6sdjq0bgIvVtRRgtX_H4ie9I",
    authDomain:"phone-auth-e2a8a.firebaseapp.com",
    projectId:"phone-auth-e2a8a",
    storageBucket:"phone-auth-e2a8a.appspot.com",
    messagingSenderId:"474535171459",
    appId:"1:474535171459:web:3865b637880cc0efc212b6"
  };

    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication =getAuth(app);
