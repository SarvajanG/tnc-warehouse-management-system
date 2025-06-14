import { Box, Typography } from "@mui/material";

export default function InventoryItem(props) {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "1rem 0.5rem",
        width: "100%",
        backgroundColor: "orange",
        margin: "0.5rem 0",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      <Typography fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)" sx={{ flex: 1, textAlign: "center" }}>{props.sku}</Typography>
      <Typography fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)" sx={{ flex: 1, textAlign: "center" }}>{props.name}</Typography>
      <Typography fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)" sx={{ flex: 1, textAlign: "center" }}>{props.quantity}</Typography>
    </Box>
  );
}
