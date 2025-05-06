import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputField from "../components/InputField";
import { Button, Box, Typography, IconButton } from "@mui/material";
import Container from "./Container";

export default function ItemView(props) {
  return (
    <Container position="fixed" zIndex="100">
      <IconButton
        sx={{
          height: "4rem",
          width: "4rem",
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "orange",
          "&:hover": {
            backgroundColor: "rgba(255, 165, 0, 0.1)", // Light orange background on hover
          },
        }}
        onClick={props.onClick}
      >
        <HighlightOffIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Typography
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        ItemView
      </Typography>
      <Box
        sx={{
          height: "70%",
          width: "100%",
          padding: "0 1rem",
          backgroundColor: "red",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "0 1rem",
            backgroundColor: "orange",
            borderRadius: "25px",
          }}
        >
          <Box>
            <Typography>Id</Typography>
            <InputField label={props.Id} ></InputField>
          </Box>
          <Box>
            <Typography>Name</Typography>
            <InputField label={props.Name}></InputField>
          </Box>
          <Box>
            <Typography>Quantity</Typography>
            <InputField label={props.Quantity}></InputField>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ backgroundColor: "purple", width: "80%", height: "3rem" }}
              //onClick={handleSignOut}
            >
              UPDATE
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red", width: "80%", height: "3rem" }}
              //onClick={handleSignOut}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
