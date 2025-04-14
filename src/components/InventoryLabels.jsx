import { Box, Typography } from "@mui/material";

export default function InventoryLabels() {
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
        top: 0,
        zIndex: 1,
        borderRadius: "10px",
      }}
    >
      <Typography sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Id
      </Typography>
      <Typography sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Name
      </Typography>
      <Typography sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Quantity
      </Typography>
    </Box>
  );
}
