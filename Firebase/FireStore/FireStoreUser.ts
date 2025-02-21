import { db } from "../firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
interface UserType {
  id: string; 
  name: string;
  surname: string;
  birth_year:number;
  user_id: string; 
}

export async function AddUser( 
  name: string,
  surname: string,
  birth_year:number,
  user_id: string
) {
  try {
    const usersCollection = collection(db, "users");
    const docRef = await addDoc(usersCollection, {
      
      name,
      surname,
      birth_year,
      user_id
    });

    console.log("User başarıyla eklendi! ID:", docRef.id);
  } catch (error) {
    console.error("User eklenirken hata oluştu:", error);
  }
}
 
export async function GetFireUsers() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Userlar başarıyla çekildi:", usersList);
    return usersList;
  } catch (error) {
    console.error("Userlar çekilirken hata oluştu:", error);
    return [];
  }
}
 
export async function DeleteFireUser(id: string) { 
  try { 
    const userRef = doc(db, "users", id); 
    await deleteDoc(userRef); 
    console.log("User başarıyla silindi:", id);
  } catch (error) {
    console.error("User silinirken hata oluştu:", error);
  }
}
 
export async function UpdateFireUser(id: string, updatedData: { name?: string; surname?: string; birth_year:number; }) {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("Güncellenmek istenen user bulunamadı:", id);
      return;
    }

    await updateDoc(userRef, updatedData);
    console.log("User başarıyla güncellendi:", id);
  } catch (error) {
    console.error("User güncellenirken hata oluştu:", error);
  }
} 
