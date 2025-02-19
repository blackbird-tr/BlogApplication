import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() { 
  const handleButton = () => {
      router.push('/(app)/addBlog')
  };
  return (
    <View style={styles.container}> 
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleButton()}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
   
});
