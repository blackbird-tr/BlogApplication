import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
type Props = {
  HeaderName: string;
  isback: boolean;
};
export default function Header({ HeaderName, isback }: Props) {
  return (
    <View style={styles.headerView}>
      {isback && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="rgba(59, 57, 57, 0.81)"
          />
        </TouchableOpacity>
      )}

      <Text style={styles.headerText}>{HeaderName}</Text>

      <View style={styles.iconPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
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
