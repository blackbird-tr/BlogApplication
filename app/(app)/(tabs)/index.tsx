import { DeployBlog } from "@/Firebase/FireStore/FireStoreProcess";
import { DeleteBlog, DeleteDatabase, GetBlog } from "@/SQLite/SqLiteProcess";
import { router } from "expo-router";
import React, { useEffect, useState } from "react"; 
import { useSession } from "@/context/ctx";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
interface BlogType {
  id: number;
  name: string;
  content: string;
}

export default function App() {
  const [blogs, setblogs] = useState<BlogType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { session }  = useSession(); 
  useEffect(() => { 
    async function fetchBlogs() {
      try {
        const data = await GetBlog();  
        console.log(data)
        setblogs(data);  
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    } 
    fetchBlogs();
  }, [refresh]);

  useEffect(() => { 
    async function fetchBlogs() {
      try {
        const data = await GetBlog();  
        console.log(data)
        setblogs(data);  
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    } 
    fetchBlogs();
  }, []);
  const deletedb = async () => { 
    try {
      await DeleteDatabase()
      setRefresh(prev => !prev); 
     } catch (error) {
       console.error("Failed to delete db", error);
     }
  };
  const DeleteMyBlog = async (id:number) => { 
    try {
      await DeleteBlog(id)
      setRefresh(prev => !prev); 
     } catch (error) {
       console.error("Failed to delete db", error);
     }
  };

  const handleButton = () => { 
    router.push("/(app)/addBlog");
  };
  const deployBlog = (blog:BlogType) => { 
    if (!session) {
      console.log("Session bulunamadı!");
      return;
    } 
    DeployBlog(blog.id,blog.name,blog.content,session)
 
  };
  return (
    <View style={styles.container}>
      {blogs.length === 0 ? (
        <Text>No blogs available</Text> // Eğer blog yoksa mesaj göster
      ) : (
        blogs.map((blog) => (
          <TouchableOpacity onPress={()=>deployBlog(blog)} key={blog.id} style={styles.blogCard}>
            <Text style={styles.blogId}>ID: {blog.id}</Text>
            <Text style={styles.blogName}>{blog.name}</Text>
            <Text style={styles.blogContent}>{blog.content}</Text>
          </TouchableOpacity>
        ))
      )}

      <TouchableOpacity style={styles.button} onPress={handleButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={deletedb}>
        <Text style={styles.buttonText}>delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Kartlar üstten başlayarak yayılacak
    alignItems: "stretch", // Kartların genişliğini tam alacak şekilde ayarlanır
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "100%", // Kartın genişliği %100
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blogId: {
    fontWeight: "bold",
  },
  blogName: {
    fontSize: 18,
    marginTop: 8,
  },
  blogContent: {
    marginTop: 4,
    color: "#555",
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
    fontSize: 30,
  },
});