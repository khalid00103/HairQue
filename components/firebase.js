// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
  initializeAuth,getAuth,
  getReactNativePersistence
} from 'firebase/auth';

//import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC62DlGkZfCg0d36KWtKBkD_v_ddb-bVc4",
  authDomain: "hairque-c6278.firebaseapp.com",
  databaseURL: "https://hairque-c6278-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hairque-c6278",
  storageBucket: "hairque-c6278.appspot.com",
  messagingSenderId: "873079016608",
  appId: "1:873079016608:web:c6805aa2dd984f5d9e8dc5",
  measurementId: "G-10QVGEYGCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const FIRESTORE_DB = getFirestore(app);
//const analytics = getAnalytics(app);
export { app, auth};