import {createUserWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../firebaseConfig'



export function logInFire(email:string,password:string){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}

