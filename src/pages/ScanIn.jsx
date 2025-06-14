import { useState, useRef } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
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

  function splitBarcode(barcode) {
    const [sku, sn] = barcode.trim().split("|");
    if (!sku || !sn) return null;
    return [sku, sn];
  }

  function resetFields() {
    setBarcode("");
    setItemName("");
  }

  const handleScan = async (e) => {
    setMessage("");
    if (e.key === "Enter" && barcode) {
      const splitResult = splitBarcode(barcode);
      if (!splitResult) {
        setMessage(
          "Invalid barcode! Please scan a code in format: SKU|SerialNumber"
        );
        resetFields();
        return;
      }

      const [itemId, sn] = splitResult;
      const itemRef = doc(db, "items", itemId); //SKU reference
      const serialRef = doc(itemRef, "serials", sn); //Serial Number reference

      //If Serial exists and already scanned IN return
      const serialSnap = await getDoc(serialRef);
      if (serialSnap.exists()) {
        if (serialSnap.data().status === "IN") {
          setMessage("This item is already scanned IN");
          resetFields();
          return;
        }
      }
      
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

      // Update/Create SKU document
      try {
        await updateDoc(itemRef, {
          ...(itemName ? { name: itemName } : {}),
          quantity: increment(1),
        });
        itemQuantity.current += 1;
        setMessage(`Updated quantity for ${itemId} is ${itemQuantity.current}`);
      } catch (err) {
        if (err.code === "not-found") {
          await setDoc(itemRef, {
            ...(itemName ? { name: itemName } : { name: "Unknown" }),
            sku: itemId,
            quantity: 1,
          });
          itemQuantity.current = 1;
          setMessage(`Created new SKU ${itemId}`);
        } else {
          console.error(err);
          setMessage("Error occurred during scan");
        }
      }

      // Update/Create Serial Number subcollection document
      try {
        await setDoc(
          serialRef,
          {
            serial: sn,
            status: "IN",
            scanHistory: arrayUnion({
              scanInTime: new Date().toISOString(),
            }),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Error updating serial/subcollection document:", err);
        setMessage("Serial/Scanning error");
        resetFields();
        return;
      }

      resetFields();
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
          autoFocus="true"
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
