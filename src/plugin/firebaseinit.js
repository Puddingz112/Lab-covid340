// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDyiLSiXf6FLvWKEBzqZALLC3cKxoajSEw",
  authDomain: "covid-labtest.firebaseapp.com",
  projectId: "covid-labtest",
  storageBucket: "covid-labtest.appspot.com",
  messagingSenderId: "345820619657",
  appId: "1:345820619657:web:8aed646e2cf2a454b6b758",
  measurementId: "G-52Q075L80V",
});

const db = getFirestore(firebaseApp);
export default db;
