import { Box, Typography } from "@mui/material";

export default function ScanHistoryEntry(props) {
  function toVancouverTime(utcString) {
    if (!utcString) return "";
    try {
      const date = new Date(utcString);
      return date.toLocaleString("en-CA", {
        timeZone: "America/Vancouver",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return utcString; // fallback
    }
  }
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
        color: "black",
        margin: "0.5rem 0",
        borderRadius: "10px",
      }}
    >
      <Typography
        fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)"
        sx={{ flex: 1, textAlign: "center" }}
      >
        {props.serial}
      </Typography>
      <Typography
        fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)"
        sx={{ flex: 1, textAlign: "center" }}
      >
        {toVancouverTime(props.inTime)}
      </Typography>
      <Typography
        fontSize="clamp(0.8rem, 0.5vw + 0.5rem, 2.5rem)"
        sx={{ flex: 1, textAlign: "center" }}
      >
        {toVancouverTime(props.outTime)}
      </Typography>
    </Box>
  );
}
