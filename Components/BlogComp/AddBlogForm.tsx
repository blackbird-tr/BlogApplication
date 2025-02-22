import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Refresh from "@/app/refresh";
import { deleteBlog } from "@/BlogProcess/BlogProcess";
import { router } from "expo-router";

type Props = {
  blogid: number;
  setName: (str: string) => void;
  name: string;
  content: string;
  setContent: (str: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  handleSave: () => void;
  isEdit: boolean;
  session: string;
};

export default function AddBlogForm({
  blogid,
  name,
  setName,
  content,
  setContent,
  loading,
  handleSave,
  isEdit,
  setLoading,
  session,
}: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      if (!session) {
        return;
      }
      setLoading(true);
      await deleteBlog(blogid, session);
      setLoading(false);
      router.back();
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/blog.png")}
        style={styles.image}
      />
      <Text style={styles.label}>Title:</Text>

      {blogid < 0 ? (
        // Yeni blog ekleme alanı
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter blog title"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Content:</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter blog content"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Düzenleme alanı
        <>
          {editMode ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter blog title"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>Content:</Text>
              <TextInput
                style={styles.textArea}
                value={content}
                onChangeText={setContent}
                multiline
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSave();
                  setEditMode(false);
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.input}>{name}</Text>
              <Text style={styles.label}>Content:</Text>
              <Text style={styles.textArea}>{content}</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setEditMode(true)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      {loading && <Refresh />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    backgroundColor: "#f9f9f9",
    height: "100%",
  },
  image: {
    alignSelf: "center",
    height: 280,
    width: 280,
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 12,
    width: 120,
    alignSelf: "center",
    marginTop: 12,
    padding: 12,
    borderColor: "rgba(59, 91, 189, 0.69)",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "600",
    fontStyle: "italic",
    color: "rgba(0, 23, 93, 0.69)",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: "top",
    marginBottom: 12,
  },
});
