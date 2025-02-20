import { db } from "../firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
interface BlogType {
  id: string;
  b_id: number;
  name: string;
  content: string;
  user_id: string;
  createdAt?: Date;
}

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
 
export async function GetFireBlogs() {
  try {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Bloglar başarıyla çekildi:", blogsList);
    return blogsList;
  } catch (error) {
    console.error("Bloglar çekilirken hata oluştu:", error);
    return [];
  }
}
 
export async function DeleteFireBlog(id: string) { 
  try { 
    const blogRef = doc(db, "blogs", id); 
    await deleteDoc(blogRef); 
    console.log("Blog başarıyla silindi:", id);
  } catch (error) {
    console.error("Blog silinirken hata oluştu:", error);
  }
}
 
export async function UpdateFireBlog(id: string, updatedData: { name?: string; content?: string }) {
  try {
    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      console.error("Güncellenmek istenen blog bulunamadı:", id);
      return;
    }

    await updateDoc(blogRef, updatedData);
    console.log("Blog başarıyla güncellendi:", id);
  } catch (error) {
    console.error("Blog güncellenirken hata oluştu:", error);
  }
}
export async function CheckBlogExists(user_id: string, b_id: number) {
  try {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    
    const blogsList: BlogType[] = blogsSnapshot.docs.map((doc) => {
      const data = doc.data() as BlogType;
      return { ...data, id: doc.id }; 
    });

    const foundBlog = blogsList.find((blog) => blog.user_id === user_id && blog.b_id === b_id);

    if (foundBlog) {
      console.log("Belirtilen user_id ve b_id ile blog bulundu:", foundBlog);
      return foundBlog.id;
    } else {
      console.log("Belirtilen user_id ve b_id ile eşleşen blog bulunamadı.");
      return null;
    }
  } catch (error) {
    console.error("Belge kontrol edilirken hata oluştu:", error);
    return null;
  }
}

