import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import useAuthChecker from "./useAuthChecker";

export default function HomePage() {
  const navigate = useNavigate();

  useAuthChecker();

  return (
    <div className="home-container">
      <div className="home-item-container">
        <button
          className="home-button"
          onClick={() => {
            navigate("/scanIn");
          }}
        >
          SCAN IN
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/scanOut");
          }}
        >
          SCAN OUT
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/inventory");
          }}
        >
          View Inventory
        </button>
      </div>
      <Settings />
    </div>
  );
}
