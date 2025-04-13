import { Box } from "@mui/material";

export default function Container({children}) {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >{children}</Box>
  );
}
