import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "@/context/ctx";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { getMyBlog, undeployBlog, deployBlog } from "@/BlogProcess/BlogProcess";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../../drizzle/migrations";
import Refresh from "@/app/refresh";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "../header";
interface BlogType {
  id: number;
  name: string;
  content: string;
  isDeploy: number;
}

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);
export default function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signOut, session } = useSession();
  const { success, error } = useMigrations(db, migrations);
  useEffect(() => {}, [success]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const data = await getMyBlog();
        setLoading(false);
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    }
    fetchBlogs();
  }, [refresh]);
  useFocusEffect(
    useCallback(() => {
      async function fetchBlogs() {
        try {
          setLoading(true);
          const data = await getMyBlog();
          setLoading(false);
          console.log(data);
          setBlogs(data);
        } catch (error) {
          console.error("Failed to fetch blogs", error);
        }
      }
      fetchBlogs();
    }, [])
  );

  const handleButton = () => {
    router.push({
      pathname: "/(app)/addBlog",
      params: {
        b_id: -1,
      },
    });
  };

  const DeployBlog = async (blog: BlogType) => {
    console.log(blog);

    if (!session) {
      return;
    }
    setLoading(true);
    await deployBlog(blog.id, blog.name, blog.content, session);
    setLoading(false);
    setRefresh(!refresh);
  };
  const UnDeployBlog = async (blog: BlogType) => {
    console.log(blog);

    if (!session) {
      return;
    }
    setLoading(true);
    await undeployBlog(blog.id, session);
    setLoading(false);

    setRefresh(!refresh);
  };
  const handleDetail = (blog: BlogType) => {
    router.push({
      pathname: "/addBlog",
      params: {
        mname: blog.name,
        b_id: blog.id,
        mcontent: blog.content,
        isEdit: 0,
      },
    });
  };
  return (
    <>
      <View style={{ backgroundColor: "#f9f9f9" }}>
        <Header HeaderName="My Blogs" logOut={signOut} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={blogs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: blog }) => (
            <TouchableOpacity
              key={blog.id}
              style={styles.blogCard}
              onPress={() => handleDetail(blog)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.blogName}>{blog.name}</Text>
                  <Text style={styles.blogContent}>{blog.content}</Text>
                </View>

                {blog.isDeploy === 0 ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => DeployBlog(blog)}
                  >
                    <FontAwesome
                      name="send-o"
                      size={24}
                      color="rgba(63, 127, 245, 0.72)"
                    />
                    <Text
                      style={{
                        fontStyle: "italic",
                        fontWeight: "200",
                        marginTop: 4,
                      }}
                    >
                      Share My Blog
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => UnDeployBlog(blog)}
                  >
                    <MaterialIcons
                      name="cancel-schedule-send"
                      size={24}
                      color="rgba(245, 63, 63, 0.72)"
                    />
                    <Text
                      style={{
                        fontStyle: "italic",
                        fontWeight: "200",
                        marginTop: 4,
                      }}
                    >
                      Undo Share My Blog
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No blogs available</Text>}
        />

        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {loading && <Refresh />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blogName: { fontSize: 18, marginTop: 8, fontWeight: "bold" },
  blogContent: { marginTop: 4, color: "#555" },

  deployButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  undeployButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(63, 127, 245, 0.72)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(63, 127, 245, 0.72)",
    fontSize: 24,
  },
});
