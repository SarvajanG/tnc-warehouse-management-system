import HomeButton from "../components/HomeButton";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import InventoryItem from "../components/InventoryItem";
import useAuthChecker from "../hooks/useAuthChecker";
import { useEffect, useState } from "react";
import InventoryLabels from "../components/InventoryLabels";
import { Typography } from "@mui/material";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Inventory() {
  useAuthChecker();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsRef = collection(db, "items");
      const itemsSnap = await getDocs(itemsRef);
      const itemsList = itemsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  return (
    <Container>
      <HomeButton />
      <Typography
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Inventory
      </Typography>
      <ItemContainer
        className="scrollable-inventory"
        height="70%"
        maxWidth="100%"
        overflow="auto"
      >
        <InventoryLabels />
        {items.map((item, index) => (
          <InventoryItem
            key={index}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
          />
        ))}
      </ItemContainer>

      <Settings />
    </Container>
  );
}
