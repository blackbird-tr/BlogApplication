import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function logInFire(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
