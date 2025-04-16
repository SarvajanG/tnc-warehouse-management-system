import { useState, useRef } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import InputField from "../components/InputField";
import HomeButton from "../components/HomeButton";
import { Typography } from "@mui/material";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import useAuthChecker from "../hooks/useAuthChecker";

export default function ScanIn() {
  useAuthChecker();
  
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  let oldItemId = useRef(null);
  let itemQuantity = useRef(null);

  const handleScan = async (e) => {
    setMessage("");
    if (e.key === "Enter" && barcode) {
      const itemId = barcode.trim();
      const itemRef = doc(db, "items", itemId);

      //Logic to only request document once for consecutive scans
      if (oldItemId.current !== itemId) {
        try {
          const snap = await getDoc(itemRef);
          if (snap.exists()) {
            itemQuantity.current = snap.data().quantity;
          } else {
            itemQuantity.current = 0;
          }
        } catch (err) {
          console.error("Error reading doc:", err);
          return;
        }
        oldItemId.current = itemId;
      }

      try {
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}),
          quantity: increment(1),
          lastScanned: serverTimestamp(),
        });
        itemQuantity.current += 1;
        setMessage(`Updated quantity for ${itemId} is ${itemQuantity.current}`);
      } catch (err) {
        if (err.code === "not-found") {
          await setDoc(itemRef, {
            ...(itemName ? { name: itemName } : { name: "Unknown" }),
            quantity: 1,
            lastScanned: serverTimestamp(),
          });
          itemQuantity.current = 1;
          setMessage(`Created new item ${itemId}`);
        } else {
          console.error(err);
          setMessage("Error occurred during scan");
        }
      }

      setBarcode("");
      setItemName("");
    }
  };

  return (
    <Container>
      <HomeButton />
      <Typography
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Scan IN an Item
      </Typography>
      <ItemContainer height="30%">
        <InputField
          label="Item Name (Optional)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <InputField
          label="Scan Barcode Here"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleScan}
        />
        {message && (
          <Typography
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
