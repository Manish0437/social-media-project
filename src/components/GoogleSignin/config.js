// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDNCeEqgPEEgvFk8UlOjUHPwr8ma8wPFek",
//   authDomain: "social-media-project-app-635a9.firebaseapp.com",
//   projectId: "social-media-project-app-635a9",
//   storageBucket: "social-media-project-app-635a9.firebasestorage.app",
//   messagingSenderId: "1062979531931",
//   appId: "1:1062979531931:web:d47d0401ba4b3124e0c23e",
//   measurementId: "G-WQ10SW9GGD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


















// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNCeEqgPEEgvFk8UlOjUHPwr8ma8wPFek",
  authDomain: "social-media-project-app-635a9.firebaseapp.com",
  projectId: "social-media-project-app-635a9",
  storageBucket: "social-media-project-app-635a9.firebasestorage.app",
  messagingSenderId: "1062979531931",
  appId: "1:1062979531931:web:d47d0401ba4b3124e0c23e",
  measurementId: "G-WQ10SW9GGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};







