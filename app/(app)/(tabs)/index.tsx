import { View, Text } from 'react-native'
import React from 'react'
import { useSession } from '@/context/ctx';

export default function index() {
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
  )
}