import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SignUpFire } from '@/Firebase/Auth/RegisterFirebase';

export default function register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
     
    try{
      SignUpFire(email,password)
      router.replace('/signIn')
    }catch(error){
      alert('there occur an error')
    }
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Kayıt Ol</Text>

      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={{
          width: 250,
          height: 40,
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: 250,
          height: 40,
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Kayıt Ol" onPress={handleRegister} />
      <TouchableOpacity onPress={() => router.push('/signIn')}>
              <Text style={{ marginTop: 15, color: 'blue' }}>Giriş</Text>
            </TouchableOpacity>
    </View>
  );
}
