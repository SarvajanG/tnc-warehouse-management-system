import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Settings from "./Settings";

export default function HomePage() {
  const navigate = useNavigate();

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
