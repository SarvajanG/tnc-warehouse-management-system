import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import CommonButton from "./CommonButton";
import useAuthChecker from "./useAuthChecker";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  useAuthChecker();

  return (
    <div className="home-container">
      <Typography
        className="scan-in-title"
        color={"white"}
        fontWeight={"bold"}
        fontSize="clamp(1rem, 4vw + 1rem, 2.5rem)" // Adjust these values as needed
        textAlign={"center"}
      >
        Select an Operation
      </Typography>
      <div className="home-item-container">
        <CommonButton
          startIcon={<BarcodeReaderIcon sx={{ color: "#008fff" }} />}
          text="SCAN IN"
          onClick={() => {
            navigate("/scanIn");
          }}
        />
        <CommonButton
          startIcon={<BarcodeReaderIcon sx={{ color: "red" }} />}
          text="SCAN OUT"
          onClick={() => {
            navigate("/scanOut");
          }}
        />
        <CommonButton
          startIcon={<InventoryIcon sx={{ color: "purple" }} />}
          text="VIEW INVENTORY"
          onClick={() => {
            navigate("/inventory");
          }}
        />
      </div>
      <Settings />
    </div>
  );
}
