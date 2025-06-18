import { Box } from "@mui/material";

export default function Container({children, position, zIndex}) {
  return (
    <Box
      sx={{
        position: position,
        zIndex: zIndex,
        width: "100vw",
        height: "100vh",
        backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto"
      }}
    >{children}</Box>
  );
}
