import { View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSession } from "@/context/ctx";
import LogInForm from "@/Components/AuthComp/Login/LogInForm";
import Header from "@/Components/AuthComp/Register/Header";
import Refresh from "./refresh";

export default function LoginScreen() {
  const { signIn } = useSession();
  const [loading, setLoading] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    await signIn(formData.email, formData.password);
    setLoading(false);
    router.replace("/");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header HeaderName="Login" isback={true} />
      <LogInForm handleLogin={handleLogin} />

      {loading && <Refresh />}
    </View>
  );
}
