import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  orderBy,
  limit,
} from "firebase/firestore";

export default function firebaseApp() {
  const [restaurants, setRestaurants] = useState([]);

  function addRestaurant({ title }) {}

  export async function createListing({ title, body }) {
    const data = { title, body, date: new Date() };
    const docRef = await addDoc(collection(db, "restaurants"), data);
    return { id: docRef.id, ...data };
  }
}
