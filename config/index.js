// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyj-LaZjbMA50A7nDtbIr1ljBejZxBTOQ",
  authDomain: "whatsapp-2b611.firebaseapp.com",
  projectId: "whatsapp-2b611",
  storageBucket: "whatsapp-2b611.appspot.com",
  messagingSenderId: "957322466986",
  appId: "1:957322466986:web:4a9de9692d927382e322d3",
  measurementId: "G-G7XVKW93L9"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
export default firebase;