import HomeButton from "../components/HomeButton";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import InventoryItem from "../components/InventoryItem";
import useAuthChecker from "../hooks/useAuthChecker";
import { useEffect, useState } from "react";
import InventoryLabels from "../components/InventoryLabels";
import { TextField, Typography } from "@mui/material";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

import SkuView from "../components/SkuView";
import ExportToCSV from "../components/ExportToCSV";

export default function Inventory() {
  useAuthChecker();

  const [items, setItems] = useState([]);
  const [skuViewVisible, setSkuViewVisible] = useState(false);
  const [itemValues, setItemValues] = useState({
    sku: "",
    name: "",
    quantity: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null, // "sku", "name", "quantity"
    direction: "asc", // "asc" or "desc"
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      // If clicking same column, toggle direction
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction };
    });
  };

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.sku?.toLowerCase().includes(query) ||
      item.name?.toLowerCase().includes(query) ||
      String(item.quantity).toLowerCase().includes(query)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sort
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Ensure numbers for quantity, else strings
    if (sortConfig.key === "quantity") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      // Normalize for case-insensitive sorting
      aValue = (aValue || "").toString().toLowerCase();
      bValue = (bValue || "").toString().toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
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

  const skuViewHandler = (sku, name, quantity) => {
    setItemValues({
      sku: sku,
      name: name,
      quantity: quantity,
    });
    toggleSkuView();
  };

  const toggleSkuView = () => {
    setSkuViewVisible(!skuViewVisible);
  };

  return (
    <Container>
      <HomeButton />
      <ExportToCSV />

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
        maxHeight="70%"
        maxWidth="100%"
        overflow="auto"
      >
        <TextField
          label="Search inventory..."
          value={searchQuery}
          variant="filled"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "100%",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "white",
            margin: "0.5rem 0",
            position: "sticky",
            top: 0,
            zIndex: 1,
            "& .MuiFilledInput-root": {
              "&:after": {
                borderBottomColor: "orange", // Focus color
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "orange", // Label focus color
              },
            },
          }}
        />
        <InventoryLabels
          onSkuClick={() => handleSort("sku")}
          onNameClick={() => handleSort("name")}
          onQuantityClick={() => handleSort("quantity")}
          sortConfig={sortConfig}
        />
        {sortedItems.map((item, index) => (
          <InventoryItem
            key={index}
            sku={item.sku}
            name={item.name}
            quantity={item.quantity}
            onClick={() => skuViewHandler(item.sku, item.name, item.quantity)}
          />
        ))}
      </ItemContainer>
      {skuViewVisible && (
        <SkuView
          sku={itemValues.sku}
          name={itemValues.name}
          quantity={itemValues.quantity}
          onClick={toggleSkuView}
          onUpdate={() => {
            fetchItems(); // Refresh item list
            toggleSkuView(); // Close the SkuView
          }}
          onDelete={() => {
            fetchItems();
            toggleSkuView();
          }}
        />
      )}
      <Settings />
    </Container>
  );
}
