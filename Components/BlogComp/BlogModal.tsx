import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type BlogType = {
  bName: string;
  bContent: string;
};
type UserType = {
  uName: string;
  uSurname: string;
};
type Props = {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  blog: BlogType;
  user: UserType;
};
export default function BlogModal({
  modalVisible,
  setModalVisible,
  blog,
  user,
}: Props) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Blog Information:</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.input}>{blog.bName}</Text>
              <Text style={styles.label}>Content:</Text>
              <TextInput
                style={styles.textArea}
                value={blog.bContent}
                multiline={true}
                editable={false}
                scrollEnabled={true}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="book-reader"
                  size={24}
                  color="rgba(108, 160, 212, 0.83)"
                />
                <View style={{ marginStart: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "rgba(126, 121, 121, 0.82)",
                        fontStyle: "italic",
                        marginEnd: 8,
                      }}
                    >
                      Name:{" "}
                    </Text>
                    <Text>{user.uName}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "rgba(126, 121, 121, 0.82)",
                        fontStyle: "italic",
                        marginEnd: 8,
                      }}
                    >
                      Surname:{" "}
                    </Text>
                    <Text>{user.uSurname}</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(104, 94, 94, 0.59)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: 450,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(42, 66, 203, 0.75)",
  },

  textStyle: {
    color: "rgba(73, 88, 169, 0.75)",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "600",
    color: "rgba(64, 61, 61, 0.75)",
  },
});
