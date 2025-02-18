import { Text, View } from 'react-native';
import { useSession } from '../../context/ctx';
 

export default function Index() {
  const { session,signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          
          signOut();
        }}>
        Sign Out
      </Text> 
    </View>
  );
}
