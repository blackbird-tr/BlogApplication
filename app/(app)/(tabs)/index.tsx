 
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSession } from "@/context/ctx";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"; 
import { getMyBlog,undeployBlog,addmyBlog,deleteBlog,deployBlog,updateBlog, } from "@/BlogProcess/BlogProcess";
import { DeleteDatabase } from "@/SQLite/SqLiteProcess";
import * as SQLite from 'expo-sqlite'; 
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { blogTable } from "@/db/schema";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../../drizzle/migrations';
interface BlogType {
  id: number;
  name: string;
  content: string;
}

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);
export default function App() { 
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { session } = useSession();
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
     
  }, [success]);


  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getMyBlog();
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    }
    fetchBlogs();
  }, [refresh]);
 

  const DeleteMyBlog = async (id: number) => {
    try {
      if(!session){
        return;
      }

      await deleteBlog(id,session);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  const Updateblog = async (name:string,content:string,id: number) => {
    try {
      if(!session){
        return;
      }
      await updateBlog(name,content,id,session);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  const handleButton = () => {
    router.push({
      pathname: "/(app)/addBlog",
      params: { 
        b_id:-1}}) 
  };
  const handleUButton = (b_id:number,name:string,content:string) => {
     
    router.push({
      pathname: "/(app)/addBlog",
      params: { 
        b_id:b_id,
        mname:name,
        mcontent:content
      }}) 
    
  };


  const DeployBlog =  (blog: BlogType) => { 
    console.log(blog) 
    if(!session){
      return;
    }
      deployBlog(blog.id,blog.name,blog.content,session)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: blog }) => (
          <View key={blog.id} style={styles.blogCard}>
            <Text style={styles.blogId}>ID: {blog.id}</Text>
            <Text style={styles.blogName}>{blog.name}</Text>
            <Text style={styles.blogContent}>{blog.content}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => DeleteMyBlog(blog.id)}
              >
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUButton(blog.id,blog.name,blog.content)}
              >
                <Text style={styles.buttonText}>Güncelle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deployButton}
                onPress={() => DeployBlog(blog)}
              >
                <Text style={styles.buttonText}>Deploy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No blogs available</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={handleButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
       
    </View>
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
  blogId: { fontWeight: "bold" },
  blogName: { fontSize: 18, marginTop: 8 },
  blogContent: { marginTop: 4, color: "#555" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  updateButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },deployButton: {
    backgroundColor: "green",
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
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});