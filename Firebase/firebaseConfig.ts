import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCllyGJ_IDgeqYPdh5kpI2aeYb2CMavOUA',
  authDomain: 'project-id.firebaseapp.com', 
  projectId: 'blogapp-abaaa', 
  appId: '1:45268301206:android:92fda037891958afad99b7', 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth} 
