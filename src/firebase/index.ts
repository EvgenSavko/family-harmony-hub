// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA1Z-eqSFuTDHuIx4lDwfeVtaijUJzmVaQ',
  authDomain: 'family-harmony-hub.firebaseapp.com',
  projectId: 'family-harmony-hub',
  storageBucket: 'family-harmony-hub.firebasestorage.app',
  messagingSenderId: '461817429755',
  appId: '1:461817429755:web:a526318fce1a9188f33a5e',
  measurementId: 'G-LEBGZ6KT2C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('app', app);
console.log('analytics', analytics);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
