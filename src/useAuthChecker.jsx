import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/", { replace: true }); // Redirect to the authentication page
      }
    });

    return unsubscribe; // Clean up the subscription on component unmount
  }, [navigate]);
}
