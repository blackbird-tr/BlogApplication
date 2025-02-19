import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Home() {
  return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          onPress={() => {
            
            router.push('/(app)/blogdetail')
          }}>
          go
        </Text> 
      </View>
  )
}