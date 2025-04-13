import { Button, IconButton } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Settings() {
  const navigate = useNavigate();
  const [settingsVisible, setSettingsVisible] = useState(false);

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
    <div>
      <IconButton
        sx={{
          height: "4rem",
          width: "4rem",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          color: "orange",
          "&:hover": {
            backgroundColor: "rgba(255, 165, 0, 0.1)", // Light orange background on hover
          },
        }}
        onClick={toggleSettings}
      >
        <ManageAccountsIcon sx={{ fontSize: "3rem" }} />
      </IconButton>

      {settingsVisible && (
        <div className="settings">
          <IconButton
            sx={{
              height: "4rem",
              width: "4rem",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "purple",
              "&:hover": {
                backgroundColor: "rgba(38, 0, 255, 0.27)", // Light purple background on hover
              },
            }}
            onClick={toggleSettings}
          >
            <HighlightOffIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
          <Button
            variant="contained"
            sx={{ backgroundColor: "purple", width: "80%", height: "3rem" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
