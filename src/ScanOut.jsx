import { useState } from "react";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./ScanIn.css";
import InputField from "./InputField";
import HomeButton from "./HomeButton";
import { Typography } from "@mui/material";
import Settings from "./Settings";

export default function ScanOut() {
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (e) => {
    if (e.key === "Enter") {
      const itemId = barcode.trim();
      const itemRef = doc(db, "items", itemId);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        let itemQuantity = itemSnap.data().quantity
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}), //Update item name if provided
          quantity: itemQuantity -= 1,
          lastScanned: serverTimestamp(),
        });
        setMessage(`Updated quantity for ${itemId} is ${itemQuantity}`);
      } else {
        setMessage(`${itemId} does not exist`);
      }

      setBarcode("");
      setItemName("");
    }
  };

  return (
    <div className="scan-in-container">
      <HomeButton />
      <Typography
        className="scan-in-title"
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Scan Out an Item
      </Typography>
      <div className="scan-in-item-container">
        <InputField
          className="scan-in-input"
          label="Scan Barcode Here"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleScan}
        />
        {message && (
          <Typography
            className="scan-in-message"
            color={"white"}
            fontWeight={"bold"}
            fontSize="clamp(1rem, 2vw + 1rem, 1.5rem)" // Adjust these values as needed
            textAlign={"center"}
          >
            {message}
          </Typography>
        )}
      </div>
      <Settings />
    </div>
  );
}
