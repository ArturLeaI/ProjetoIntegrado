// Import the functions you need from the SDKs you need
import firebase, {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth'

import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmIk50VLG_S5zkbxFRMPy8FgnAG_Spg1g",
  authDomain: "projetointegrado-5c79b.firebaseapp.com",
  projectId: "projetointegrado-5c79b",
  storageBucket: "projetointegrado-5c79b.appspot.com",
  messagingSenderId: "739504432602",
  appId: "1:739504432602:web:57435b78493f1f58728ce3"
};



export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
