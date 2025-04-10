import './Authentication.css';
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        navigate("/")
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
    <div className="auth-container">
      <div className="auth-item-container">
        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={handleSetEmail}
        ></input>
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handleSetPassword}
        ></input>
        <button className="auth-button" onClick={logIn}>
          Log In
        </button>
        <button className="auth-button" onClick={signUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
