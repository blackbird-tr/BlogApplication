import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/Firebase/firebaseConfig';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSession(userCredential.user.uid); // Oturumu güncelle
    } catch (error) {
      if (error instanceof Error) {
        alert("Giriş Hatası: " + error.message);
      } else {
        alert("Bilinmeyen bir hata oluştu.");
      }
    }
    
  };

  const signOutUser = () => {
    signOut(auth);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: signOutUser,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
