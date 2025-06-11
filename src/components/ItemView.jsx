import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; 

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputField from "../components/InputField";
import { Button, Box, Typography, IconButton } from "@mui/material";
import Container from "./Container";

export default function ItemView(props) {
  const [name, setName] = useState(props.Name);
  const [quantity, setQuantity] = useState(props.Quantity);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "items", props.Id); // Adjust collection name as needed
      await updateDoc(docRef, {
        name: name,
        quantity: quantity,
      });
      alert("Item updated!");
      if (props.onUpdate) props.onUpdate(); // optional callback
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "items", props.Id);
      await deleteDoc(docRef);
      alert("Item deleted!");
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
        ItemView
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
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "0 1rem",
            backgroundColor: "orange",
            borderRadius: "25px",
          }}
        >
          <Box
          sx={{width: "30rem"}}>
            <Typography>Id</Typography>
            <InputField label={props.Id} disabled/>
          </Box>
          <Box
          sx={{width: "30rem"}}>
            <Typography>Name</Typography>
            <InputField label={props.Name} onChange={(e) => setName(e.target.value)}/>
          </Box>
          <Box
          sx={{width: "30rem"}}>
            <Typography>Quantity</Typography>
            <InputField label={props.Quantity} onChange={(e) => setQuantity(e.target.value)}/>
          </Box>
          <Box
          sx={{
            height: "20%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "1rem 0"
          }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "purple", width: "30rem", height: "4rem", fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)", marginRight: "0.5rem" }}
              onClick={handleUpdate}
            >
              UPDATE
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red", width: "30rem", height: "4rem", fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)", marginLeft: "0.5rem" }}
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
