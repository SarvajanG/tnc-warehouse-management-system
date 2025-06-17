import { Box, Typography } from "@mui/material";

export default function ScanHistoryLabels() {
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
        cursor: "pointer",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>Serial</Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>In Time</Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>Out Time</Typography>
      </Box>
    </Box>
  );
}
