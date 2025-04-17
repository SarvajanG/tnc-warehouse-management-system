import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";
import InputField from "../components/InputField";
import CommonButton from "../components/CommonButton";
import useAuthChecker from "../hooks/useAuthChecker";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useAuthChecker();

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
        <InputField
          autoFocus="true"
          label="Email"
          value={email}
          onChange={handleSetEmail}
        />
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
