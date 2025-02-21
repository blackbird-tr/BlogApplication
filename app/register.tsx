import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SignUpFire } from '@/Firebase/Auth/RegisterFirebase';
import RegisterForm from '@/Components/AuthComp/Register/RegisterForm';
import Header from '@/Components/AuthComp/Register/Header';

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
    <View style={{ flex: 1}}> 
    <Header HeaderName='Register' isback={true}/>
       <RegisterForm/>
    </View>
  );
}
