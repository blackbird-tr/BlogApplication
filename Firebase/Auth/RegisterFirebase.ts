import {createUserWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../firebaseConfig' 


export async function SignUpFire(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error: any) {
    console.error('Kayıt olurken hata:', error.message);
    throw error;  
  }
}

