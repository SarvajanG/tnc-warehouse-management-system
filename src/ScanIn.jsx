import { useState } from "react";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./ScanIn.css";
import InputField from "./InputField";

export default function ScanIn() {
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (e) => {
    if (e.key === "Enter") {
      const itemId = barcode.trim();
      const itemRef = doc(db, "items", itemId);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}), //Update item name if provided
          quantity: itemSnap.data().quantity + 1,
          lastScanned: serverTimestamp(),
        });
        setMessage(`Updated quantity for ${barcode}`);
      } else {
        await setDoc(itemRef, {
          ...(itemName ? { name: itemName } : {name: "Unknown"}),
          quantity: 1,
          lastScanned: serverTimestamp(),
        });
        setMessage(`Created new item ${itemId}`);
      }

      setBarcode("");
      setItemName("");
    }
  };

  return (
    <div className="scan-in-container">
      <div className="scan-in-item-container">
        <InputField
          className="scan-in-input"
          label="Item Name (Optional)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <InputField
          className="scan-in-input"
          label="Scan Barcode Here"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleScan}
        />
      </div>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
