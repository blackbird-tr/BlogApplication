import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { addmyBlog, undeployBlog, updateBlog } from "@/BlogProcess/BlogProcess";
import { useSession } from "@/context/ctx";

export default function AddBlog() {
  const { b_id, mname, mcontent } = useLocalSearchParams();

  const [name, setName] = useState<string>(mname?.toString() || "");
  const [content, setContent] = useState<string>(mcontent?.toString() || "");

  const blogid = Number(b_id);
  const { session } = useSession();

  const Updateblog = async (name: string, content: string, id: number) => {
    try {
      if (!session) {
        return;
      }
      await updateBlog(name, content, id, session);
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };
  const handleSave = async () => {
    if (!session) {
      return;
    }
    if (name.trim() === "" || content.trim() === "") return;

    try {
      if (blogid > 0) { 
        await Updateblog(name, content, blogid);
      } else {
        await addmyBlog(name, content);
      }
    } catch (error) {
      alert("failed");
    }
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Başlık:</Text>
      {blogid < 0 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Blog başlığını girin"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>İçerik:</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Blog içeriğini girin"
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Button title="Add" onPress={handleSave} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Blog başlığını girin"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>İçerik:</Text>
          <TextInput
            style={styles.textArea}
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Button title="Update" onPress={handleSave} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
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
  blogList: {
    marginTop: 20,
  },
  blogItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  blogTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
