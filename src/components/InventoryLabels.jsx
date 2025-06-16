import { Box, Typography } from "@mui/material";

export default function InventoryLabels({
  onSkuClick,
  onNameClick,
  onQuantityClick,
  sortConfig,
}) {
  // Small helper to render direction
  const arrowFor = (key) =>
    sortConfig.key === key
      ? sortConfig.direction === "asc"
        ? " ↑"
        : " ↓"
      : "";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgb(233, 151, 0)",
        margin: "0.5rem 0",
        padding: "0 0.5rem",
        position: "sticky",
        top: 55,
        zIndex: 1,
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center" }} onClick={onSkuClick}>
        <Typography sx={{ fontWeight: "bold" }}>
          SKU{arrowFor("sku")}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }} onClick={onNameClick}>
        <Typography sx={{ fontWeight: "bold" }}>
          Name{arrowFor("name")}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }} onClick={onQuantityClick}>
        <Typography sx={{ fontWeight: "bold" }}>
          Quantity{arrowFor("quantity")}
        </Typography>
      </Box>
    </Box>
  );
}
