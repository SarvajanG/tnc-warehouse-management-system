import { Box } from "@mui/material";

export default function ItemContainer({ children, height }) {
  return (
    <Box
      sx={{
        height: height,
        width: "100%",
        maxWidth: "25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 1rem",
      }}
    >
      {children}
    </Box>
  );
}
