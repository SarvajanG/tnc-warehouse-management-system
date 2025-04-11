import { Button } from "@mui/material";

export default function CommonButton(props) {
  return (
    <Button
      variant="contained"
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      onClick={props.onClick}
      sx={{
        padding: "1rem",
        width: "100%",
        borderRadius: "25px",
        fontWeight: "bold",
        fontSize: "1rem",
        color: "white",
        backgroundColor: "orange",
      }}
    >
      {props.text}
    </Button>
  );
}
