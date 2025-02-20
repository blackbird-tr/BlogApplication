import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCllyGJ_IDgeqYPdh5kpI2aeYb2CMavOUA',
  authDomain: 'project-id.firebaseapp.com', 
  databaseURL: 'https://blogapp-abaaa.firebaseio.com',
  projectId: 'blogapp-abaaa', 
  appId: '1:45268301206:android:92fda037891958afad99b7', 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth,db} 
