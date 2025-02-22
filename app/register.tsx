import { View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SignUpFire } from "@/Firebase/Auth/RegisterFirebase";
import RegisterForm from "@/Components/AuthComp/Register/RegisterForm";
import Header from "@/Components/AuthComp/Register/Header";
import { AddUser } from "@/Firebase/FireStore/FireStoreUser";
import Refresh from "./refresh";
export default function register() {
  const [loading, setLoading] = useState(false);

  type Register = {
    name: string;
    surname: string;
    email: string;
    birthYear: string;
    password: string;
    passwordCheck: string;
  };
  const handleRegister = async (formData: Register) => {
    console.log(formData.name);
    try {
      setLoading(true);
      const id = await SignUpFire(formData.email, formData.password);
      console.log(id);
      await AddUser(
        formData.name,
        formData.surname,
        Number(formData.birthYear),
        id
      );
      setLoading(false);
      router.replace("/signIn");
    } catch (error) {
      alert("there occur an error");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header HeaderName="Register" isback={true} />
      <RegisterForm handleRegister={handleRegister} />
      {loading && <Refresh />}
    </View>
  );
}
