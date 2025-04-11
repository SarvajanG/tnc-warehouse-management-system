import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home"); // If user is logged in, navigate to home
      } else {
        navigate("/", { replace: true }); // Redirect to the authentication page
        navigate(0); // Refresh the page to avoid history buttons being used
      }
    });

    return unsubscribe; // Clean up the subscription on component unmount
  }, [navigate]);
}
