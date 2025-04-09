import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./Authentication.jsx";
import Scanner from "./Scanner.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/tnc-warehouse-management-system">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}
