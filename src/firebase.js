import {
  initializeApp,
  auth,
  firestore,
} from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBjJpYL3wwO6lNSZvcZgkNzUORPnPqOwJo',
  authDomain: 'investment-portfolio-manager.firebaseapp.com',
  databaseURL: 'https://investment-portfolio-manager.firebaseio.com',
  projectId: 'investment-portfolio-manager',
  storageBucket: 'investment-portfolio-manager.appspot.com',
  messagingSenderId: '398632099201',
  appId: '1:398632099201:web:6a472a4e5ff06297029c80',
  measurementId: 'G-5YC1Q0ZE9F',
};

initializeApp(firebaseConfig);
const googleAuthProvider = new auth.GoogleAuthProvider();
const db = firestore();

const signInWithGoogle = () => auth().signInWithPopup(googleAuthProvider);
const onAuthStateChanged = (cb) => auth().onAuthStateChanged(cb);
const signOut = () => auth().signOut();

export {
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
  db,
};
