// src/Scanner.js
import { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Scanner() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (e) => {
    if (e.key === "Enter") {
      const barcode = input.trim();
      const itemRef = doc(db, "items", barcode);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        await updateDoc(itemRef, {
          quantity: itemSnap.data().quantity + 1,
          lastScanned: serverTimestamp()
        });
        setMessage(`Updated quantity for ${barcode}`);
      } else {
        await setDoc(itemRef, {
          name: "Unnamed Item",
          quantity: 1,
          lastScanned: serverTimestamp()
        });
        setMessage(`Created new item ${barcode}`);
      }

      setInput("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        autoFocus
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleScan}
        placeholder="Scan barcode here"
      />
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
