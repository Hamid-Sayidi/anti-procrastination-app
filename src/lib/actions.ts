"use server";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

// 1. AMBIL SEMUA DATA (READ)
export async function getTasks() {
  try {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Firebase ID itu ada di doc.id, datanya ada di doc.data()
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Karena Firestore menyimpan tanggal sebagai Timestamp, kita konversi ke Date
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Gagal ambil data Firebase:", error);
    return [];
  }
}

// 2. TAMBAH DATA (CREATE)
export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const deadlineStr = formData.get("deadline") as string;

  if (!title || !deadlineStr) return;

  try {
    await addDoc(collection(db, "tasks"), {
      title,
      deadline: deadlineStr, // Simpan string atau konversi ke Date
      isCompleted: false,
      createdAt: serverTimestamp(), // Gunakan waktu server Firebase
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal buat task di Firebase:", error);
  }
}

// 3. UPDATE STATUS (UPDATE)
export async function toggleTask(id: string, isCompleted: boolean) {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      isCompleted: !isCompleted,
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal toggle task di Firebase:", error);
  }
}

// 4. HAPUS DATA (DELETE)
export async function deleteTask(id: string) {
  try {
    await deleteDoc(doc(db, "tasks", id));
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal hapus task di Firebase:", error);
  }
}
