import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';
import LogInForm from '@/Components/AuthComp/Login/LogInForm';
import Header from '@/Components/AuthComp/Register/Header';

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
    <View style={{ flex: 1}}>
       <Header HeaderName='Login' isback={false}/>

        <LogInForm/>

     
    </View>
  );
}
