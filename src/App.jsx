import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./Scanner.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/tnc-warehouse-management-system">
      <Routes>
        <Route path="/" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}
