import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function Refresh() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Yükleniyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Ekranı tamamen kaplar
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // %50 saydam siyah arka plan
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});
