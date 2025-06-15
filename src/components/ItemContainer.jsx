import { Box } from "@mui/material";

export default function ItemContainer({
  children,
  height,
  maxWidth = "25rem",
  maxHeight,
  overflow,
  className
}) {
  return (
    <Box
      className = {className}
      sx={{
        height: height,
        width: "100%",
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 1rem",
        overflow: overflow,
      }}
    >
      {children}
    </Box>
  );
}
