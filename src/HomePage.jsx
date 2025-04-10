import "./HomePage.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const navigate = useNavigate();
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Check if user is already authenticated and redirect if necessary
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, navigate to the protected route (home)
        navigate("/home");
      } else {
        navigate("/")
      }
    });

    // Clean up the subscription on component unmount
    return unsubscribe;
  }, [navigate]);
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true }); // Redirect to the authentication page
      navigate(0); // Refresh the page to avoid history buttons being used
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

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
      <div className="home-settings-button-container">
        <ManageAccountsIcon
          className="home-settings-button"
          fontSize=""
          onClick={toggleSettings}
        />
      </div>
      {settingsVisible && (
        <div className="home-settings">
          <HighlightOffIcon
            className="home-exit-settings-button"
            fontSize=""
            onClick={toggleSettings}
          />
          <Button
            className="home-sign-out-button"
            variant="contained"
            sx={{ backgroundColor: "purple" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
