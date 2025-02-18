import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [id, setid] = useState("");
  const [password, setPassword] = useState('');
  const {signIn} = useSession()
  const handleLogin = async () => {
    await signIn(email, password);
    router.replace('/');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Giriş Yap</Text>

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

      <Button title="Giriş Yap" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={{ marginTop: 15, color: 'blue' }}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}
