import { Slot } from 'expo-router'; 
import { SessionProvider } from '../context/ctx';

export default function Root() { 
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
