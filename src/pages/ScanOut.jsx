import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import InputField from "../components/InputField";
import HomeButton from "../components/HomeButton";
import { Typography } from "@mui/material";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import useAuthChecker from "../hooks/useAuthChecker";

export default function ScanOut() {
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  useAuthChecker();

  const handleScan = async (e) => {
    if (e.key === "Enter") {
      const itemId = barcode.trim();
      const itemRef = doc(db, "items", itemId);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        let itemQuantity = itemSnap.data().quantity;
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}), //Update item name if provided
          quantity: (itemQuantity -= 1),
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
    <Container>
      <HomeButton />
      <Typography
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Scan Out an Item
      </Typography>
      <ItemContainer height="20%">
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
