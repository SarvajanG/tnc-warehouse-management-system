import { Box, Typography } from "@mui/material";

export default function InventoryItem(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        width: "100%",
        backgroundColor: "orange",
        margin: "0.5rem 0"
      }}
    >
      <Typography sx={{ flex: 1, textAlign: "center" }}>{props.id}</Typography>
      <Typography sx={{ flex: 1, textAlign: "center" }}>{props.name}</Typography>
      <Typography sx={{ flex: 1, textAlign: "center" }}>{props.quantity}</Typography>
    </Box>
  );
}
