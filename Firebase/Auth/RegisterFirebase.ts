import {createUserWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../firebaseConfig'



export function SignUpFire(email:string,password:string){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user; 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; 
    });

}

