// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID
} = getEnvironments()


// DEV / PROD
// const firebaseConfig = {
//   apiKey: "AIzaSyDwN_5K7-lyytvJFooSrah23BcCSCI7vUU",
//   authDomain: "react-a8b56.firebaseapp.com",
//   projectId: "react-a8b56",
//   storageBucket: "react-a8b56.appspot.com",
//   messagingSenderId: "973811286249",
//   appId: "1:973811286249:web:f7ecde10dad59186b67078"
// };


// TESTING
// const firebaseConfig = {
//   apiKey: "AIzaSyDF2ABUkvdJh6iHbCj06VN2dvhbXDnJQ5Y",
//   authDomain: "test-react-4cbee.firebaseapp.com",
//   projectId: "test-react-4cbee",
//   storageBucket: "test-react-4cbee.appspot.com",
//   messagingSenderId: "123862649668",
//   appId: "1:123862649668:web:f295c71ee554e1323be511",
//   measurementId: "G-LVG496LVPV"
// };


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APIKEY, 
  authDomain: VITE_AUTHDOMAIN, 
  projectId: VITE_PROJECTID, 
  storageBucket: VITE_STORAGEBUCKET, 
  messagingSenderId: VITE_MESSAGINGSENDERID, 
  appId: VITE_APPID, 
  measurementId: VITE_MEASUREMENTID
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)