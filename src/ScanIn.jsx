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
import HomeButton from "./HomeButton";
import { Typography } from "@mui/material";
import Settings from "./Settings";
import Container from "./Container";
import ItemContainer from "./ItemContainer";

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
        let itemQuantity = itemSnap.data().quantity
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}), //Update item name if provided
          quantity: itemQuantity += 1,
          lastScanned: serverTimestamp(),
        });
        setMessage(`Updated quantity for ${itemId} is ${itemQuantity}`);
      } else {
        await setDoc(itemRef, {
          ...(itemName ? { name: itemName } : { name: "Unknown" }),
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
    <Container>
      <HomeButton />
      <Typography
        className="scan-in-title"
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Scan IN an Item
      </Typography>
      <ItemContainer height="30%">
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
      </ItemContainer>
      <Settings />
    </Container>
  );
}
