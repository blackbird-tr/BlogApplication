import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useSession } from "@/context/ctx";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const { signOut } = useSession();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(45, 170, 254, 0.67)", // Aktif ikon rengi
        tabBarInactiveTintColor: "rgba(93, 80, 80, 0.69)", // Pasif ikon rengi
        headerShown: false, // Başlık görünümünü kapatma
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "MyBlogs",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deployedblog"
        options={{
          title: "Shared Blogs",
          tabBarIcon: ({ color }) => (
            <Entypo name="slideshare" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
