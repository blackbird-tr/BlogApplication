import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar"; // StatusBar'ı import et
import { router } from "expo-router";

export default function Welcome() {
  return (
    <LinearGradient
      colors={["#A2C8E2", "#C4E4F7", "#E3F1FB"]}
      style={styles.container}
    >
      <StatusBar style="light" /> {/* Status bar rengini beyaz yap */}
      {/* Metinler için Text bileşenini kullan */}
      <Text style={styles.title}>Welcome to Blog App</Text>
      <Text style={styles.subtitle}>Stay connected with your thoughts</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signIn")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/register")}
      >
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
    backgroundColor: "#6EC1E4",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
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
