// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoy2cco3SSzkALojjDzUi3_6a2_t6jR3k",
  authDomain: "photomart-760d9.firebaseapp.com",
  projectId: "photomart-760d9",
  storageBucket: "photomart-760d9.appspot.com",
  messagingSenderId: "1072576078180",
  appId: "1:1072576078180:web:861d67dd8bc5093bcb1a71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
