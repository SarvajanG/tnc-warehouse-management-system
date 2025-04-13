import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication.jsx";
import HomePage from "./pages/HomePage.jsx";
import ScanIn from "./pages/ScanIn.jsx";
import ScanOut from "./pages/ScanOut.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/tnc-warehouse-management-system">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/scanIn" element={<ScanIn />} />
        <Route path="/scanOut" element={<ScanOut />} />
      </Routes>
    </BrowserRouter>
  );
}
