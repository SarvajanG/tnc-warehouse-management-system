import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import CommonButton from "./CommonButton";
import useAuthChecker from "./useAuthChecker";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function HomePage() {
  const navigate = useNavigate();

  useAuthChecker();

  return (
    <div className="home-container">
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
          startIcon={<InventoryIcon sx={{ color: "purple" }}/>}
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
