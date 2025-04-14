import HomeButton from "../components/HomeButton";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import InventoryItem from "../components/InventoryItem";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Inventory() {
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
      <ItemContainer
        className="scrollable-inventory"
        height="70%"
        maxWidth="100%"
        overflow="auto"
      >
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
