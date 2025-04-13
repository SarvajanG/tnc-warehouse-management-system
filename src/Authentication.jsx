import "./Authentication.css";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import ItemContainer from "./ItemContainer";
import InputField from "./InputField";
import CommonButton from "./CommonButton";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if user is already authenticated and redirect if necessary
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, navigate to the protected route (home)
        navigate("/home");
      } else {
        navigate("/");
      }
    });

    signOut(auth);

    // Clean up the subscription on component unmount
    return unsubscribe;
  }, [navigate]);

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Check your emails!");
    } catch (e) {
      alert("Registration failed: " + e.message);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (e) {
      alert("Sign in failed: Incorrect Email or Password");
    }
  };

  return (
    <Container>
      <ItemContainer height="45%">
        <InputField label="Email" value={email} onChange={handleSetEmail} />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={handleSetPassword}
        />
        <CommonButton text="Log In" onClick={logIn} />
        <CommonButton text="Sign Up" onClick={signUp} />
      </ItemContainer>
    </Container>
  );
}
