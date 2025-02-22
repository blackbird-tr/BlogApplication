import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";

export default function Welcome() {
  return (
    <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={styles.container}>
      <Text style={styles.title}>Welcome to Blog App</Text>
      <Text style={styles.subtitle}>Stay connected with your thoughts</Text>
      
      <TouchableOpacity style={styles.button} onPress={()=>router.push('/signIn')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>router.push('/register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 16,
    color: "#DDD",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: 220,
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});