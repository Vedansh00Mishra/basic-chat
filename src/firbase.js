// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvT4-woBe54RM7SZU34M_1pH8BZgkA94M",
  authDomain: "chat-app-ae100.firebaseapp.com",
  projectId: "chat-app-ae100",
  storageBucket: "chat-app-ae100.appspot.com",
  messagingSenderId: "231114166151",
  appId: "1:231114166151:web:3c5807792824a7b7eecd22",
  measurementId: "G-XDGVSWBRLW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);