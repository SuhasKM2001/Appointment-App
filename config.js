import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore'
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMkTVcsNVsB4SRGSqqaeKFwxKXtZAJyXk",
  authDomain: "appointmentschedule-72c08.firebaseapp.com",
  projectId: "appointmentschedule-72c08",
  storageBucket: "appointmentschedule-72c08.appspot.com",
  messagingSenderId: "313097173790",
  appId: "1:313097173790:web:a05ca7b61270c626b8a70f",
  measurementId: "G-R1SN1971HG",
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
export const auth=getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
})
