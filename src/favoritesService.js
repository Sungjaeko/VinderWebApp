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

export async function addFavorites({ yelpId, name }) {
  const data = { name, yelpId, date: Timestamp.now() };
  const docRef = await addDoc(collection(db, "Favorites"), data);
  alert(`Added ${name} to favorites`);
  return { id: docRef.id, ...data };
}

export async function fetchFavorites() {
  const q = query(
    collection(db, "Favorites"),
    orderBy("date", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
