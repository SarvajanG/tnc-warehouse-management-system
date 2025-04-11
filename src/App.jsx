import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./Authentication.jsx";
import HomePage from "./HomePage.jsx";
import ScanIn from "./ScanIn.jsx";
import ScanOut from "./ScanOut.jsx";

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
