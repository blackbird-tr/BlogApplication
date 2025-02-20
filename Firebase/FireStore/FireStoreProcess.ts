import { db } from "../firebaseConfig";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
export async function DeployBlog(
  b_id: number,
  name: string,
  content: string,
  user_id: string
) {
  try {
    const blogsCollection = collection(db, "blogs");  
    const docRef = await addDoc(blogsCollection, {
      b_id,
      name,
      content,
      user_id,
      createdAt: new Date(),
    });

    console.log("Blog başarıyla eklendi! ID:", docRef.id);
  } catch (error) {
    console.error("Blog eklenirken hata oluştu:", error);
  }
}

export async function GetBlogs() {
    try {
      const blogsCollection = collection(db, "blogs");
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsList = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      console.log("Bloglar başarıyla çekildi:", blogsList);
      return blogsList;
    } catch (error) {
      console.error("Bloglar çekilirken hata oluştu:", error);
      return [];
    }
  }
