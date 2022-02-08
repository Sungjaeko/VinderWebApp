import { db } from "./firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

export async function addWishlists({ yelpId, name }) {
  const data = { name, yelpId, date: Timestamp.now() };
  const docRef = await addDoc(collection(db, "Wishlists"), data);
  alert(`Added ${name} to wishlist`);
  return { id: docRef.id, ...data };
}

export async function fetchWishlists() {
  const q = query(
    collection(db, "Wishlists"),
    orderBy("date", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
