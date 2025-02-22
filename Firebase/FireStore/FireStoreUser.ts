import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export async function AddUser(
  name: string,
  surname: string,
  birth_year: number,
  user_id: string
) {
  try {
    const usersCollection = collection(db, "users");
    const docRef = await addDoc(usersCollection, {
      name,
      surname,
      birth_year,
      user_id,
    });

    console.log("User başarıyla eklendi! ID:", docRef.id);
  } catch (error) {
    console.error("User eklenirken hata oluştu:", error);
  }
}
type FireUser = {
  id: string;
  user_id: string;
  name: string;
  surname: string;
};

export async function GetFireUserByUserId(
  userId: string
): Promise<FireUser | null> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() } as FireUser; // Tür dönüşümü
      console.log("User başarıyla çekildi:", userData);
      return userData;
    } else {
      console.warn("Belirtilen user_id ile eşleşen user bulunamadı:", userId);
      return null;
    }
  } catch (error) {
    console.error("User çekilirken hata oluştu:", error);
    return null;
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

export async function UpdateFireUser(
  id: string,
  updatedData: { name?: string; surname?: string; birth_year: number }
) {
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
