import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { addmyBlog, updateBlog } from "@/BlogProcess/BlogProcess";
import { useSession } from "@/context/ctx";
import AddBlogForm from "@/Components/BlogComp/AddBlogForm";
import Header from "@/Components/AuthComp/Register/Header";

export default function AddBlog() {
  const { b_id, mname, mcontent, isEdit } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(mname?.toString() || "");
  const [content, setContent] = useState<string>(mcontent?.toString() || "");

  const blogid = Number(b_id);
  const { session } = useSession();

  const Updateblog = async (name: string, content: string, id: number) => {
    try {
      if (!session) {
        return;
      }
      setLoading(true);
      await updateBlog(name, content, id, session);
      setLoading(false);
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
        setLoading(true);
        await Updateblog(name, content, blogid);
        setLoading(false);
      } else {
        setLoading(true);
        await addmyBlog(name, content);
        setLoading(false);
      }
    } catch (error) {
      alert("failed");
    }
    router.replace("/");
  };

  return (
    <View>
      {blogid > 0 ? (
        <>
          {isEdit === "0" ? (
            <Header HeaderName="Blog View" isback={true} />
          ) : (
            <Header HeaderName="Blog Update" isback={true} />
          )}
        </>
      ) : (
        <Header HeaderName="Blog Add" isback={true} />
      )}

      <AddBlogForm
        blogid={blogid}
        content={content}
        handleSave={handleSave}
        loading={loading}
        name={name}
        setContent={setContent}
        setName={setName}
        isEdit={isEdit === "0" ? false : true}
        session={session ?? ""}
        setLoading={setLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
