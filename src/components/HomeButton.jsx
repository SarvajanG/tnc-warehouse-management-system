import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
    const navigate = useNavigate();
  return (
    <IconButton
      sx={{
        height: "4rem",
        width: "4rem",
        position: "fixed",
        top: "1rem",
        right: "1rem",
        color: "orange",
        '&:hover': {
          backgroundColor: 'rgba(255, 165, 0, 0.1)', // Light orange background on hover
        },
      }} onClick={()=> navigate("/home")}
    >
      <HomeIcon sx={{ fontSize: "3rem" }} />
    </IconButton>
  );
}
