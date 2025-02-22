import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
type Props = {
  HeaderName: string;
  logOut:()=>void;
};
export default function Header({ HeaderName, logOut }: Props) {
    const handleLogOut=async ()=>{
        await logOut();
    }
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{HeaderName}</Text>

        <TouchableOpacity onPress={handleLogOut}>
        <Octicons name="sign-out" size={24} color="rgba(37, 36, 36, 0.84)" />
        </TouchableOpacity>
      <View style={styles.iconPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    
    backgroundColor: "#f9f9f9",
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    height: 50,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "rgba(37, 36, 36, 0.84)",
    fontWeight: "800",
  },
  iconPlaceholder: {
    width: 24,
  },
});
