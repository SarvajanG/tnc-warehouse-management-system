import { useState } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputField from "./InputField";
import { Button, Box, Typography, IconButton } from "@mui/material";
import Container from "./Container";
import ScanHistory from "./ScanHistory";

export default function SkuView(props) {
  const [name, setName] = useState(props.name);
  const [quantity, setQuantity] = useState(props.quantity);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "items", props.sku); // Adjust collection name as needed
      await updateDoc(docRef, {
        name: name,
        quantity: quantity,
      });
      alert("SKU updated!");
      if (props.onUpdate) props.onUpdate(); // optional callback
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Recursively delete all docs in a subcollection
  async function deleteCollection(ref) {
    const snapshot = await getDocs(ref);
    const promises = [];
    snapshot.forEach((docSnap) => {
      promises.push(deleteDoc(docSnap.ref));
    });
    await Promise.all(promises);
  }

  const handleDelete = async () => {
    try {
      const itemDocRef = doc(db, "items", props.sku);
      const serialsCollRef = collection(db, "items", props.sku, "serials");
      await deleteCollection(serialsCollRef);
      await deleteDoc(itemDocRef);
      alert("SKU deleted!");
      if (props.onDelete) props.onDelete(); // optional callback
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Container position="fixed" zIndex="100">
      <IconButton
        sx={{
          height: "4rem",
          width: "4rem",
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "orange",
          "&:hover": {
            backgroundColor: "rgba(255, 165, 0, 0.1)", // Light orange background on hover
          },
        }}
        onClick={props.onClick}
      >
        <HighlightOffIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Typography
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        SKU View
      </Typography>
      <Box
        sx={{
          height: "70%",
          width: "100%",
          padding: "0 1rem",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "1rem 1rem",
            backgroundColor: "orange",
            borderRadius: "25px",
            "@media (max-width:900px)": {
              flexDirection: "column",
              height: "auto", // optional, let content expand vertically
              alignItems: "stretch", // optional, let child containers be full width
              gap: "1rem"
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "0 2rem",
              marginRight: "0.5rem",
              backgroundColor: "purple",
              color: "white",
              borderRadius: "25px",
              "@media (max-width:900px)": {
                width: "100%",
                margin: 0, // to prevent unwanted horizontal scroll
                padding: "2rem 1rem", // tweak as needed
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography>SKU</Typography>
              <InputField label={props.sku} disabled />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>Name</Typography>
              <InputField
                label={props.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>Quantity</Typography>
              <InputField
                label={props.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                height: "20%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "1rem 0",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "orange",
                  width: "30rem",
                  height: "4rem",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
                  marginRight: "1rem",
                }}
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  width: "30rem",
                  height: "4rem",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
                  marginLeft: "1rem",
                }}
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              //justifyContent: "space-evenly",
              alignItems: "center",
              padding: "4rem 1rem",
              marginLeft: "0.5rem",
              backgroundColor: "purple",
              borderRadius: "25px",
              "@media (max-width:900px)": {
                width: "100%",
                //height: "25rem",
                margin: 0, // to prevent unwanted horizontal scroll
                padding: "2rem 0", // tweak as needed
              },
            }}
          >
            <ScanHistory sku={props.sku} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
