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

import ItemView from "../components/ItemView";

export default function Inventory() {
  useAuthChecker();

  const [items, setItems] = useState([]);
  const [itemViewVisible, setItemViewVisible] = useState(false);
  const [itemValues, setItemValues] = useState({
    sku: "",
    name: "",
    quantity: "",
  });

  const fetchItems = async () => {
    const itemsRef = collection(db, "items");
    const itemsSnap = await getDocs(itemsRef);
    const itemsList = itemsSnap.docs.map((doc) => doc.data());
    console.log(itemsList);
    setItems(itemsList);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const itemViewHandler = (sku, name, quantity) => {
    setItemValues({
      sku: sku,
      name: name,
      quantity: quantity,
    });
    toggleItemView();
  };

  const toggleItemView = () => {
    setItemViewVisible(!itemViewVisible);
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
            sku={item.sku}
            name={item.name}
            quantity={item.quantity}
            onClick={() => itemViewHandler(item.sku, item.name, item.quantity)}
          />
        ))}
      </ItemContainer>
      {itemViewVisible && (
        <ItemView
          sku={itemValues.sku}
          name={itemValues.name}
          quantity={itemValues.quantity}
          onClick={toggleItemView}
          onUpdate={() => {
            fetchItems(); // Refresh item list
            toggleItemView(); // Close the ItemView
          }}
          onDelete={() => {
            fetchItems();
            toggleItemView();
          }}
        />
      )}
      <Settings />
    </Container>
  );
}
