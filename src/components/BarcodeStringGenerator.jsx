import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import InputField from "./InputField";

function generateSerials(existingSerials, count, prefix = "SN") {
  const generated = [];
  let serialNum = 1;
  // Find highest serial number already used
  existingSerials.forEach((s) => {
    const m = s.match(/^SN-(\d+)$/);
    if (m) serialNum = Math.max(serialNum, parseInt(m[1]) + 1);
  });
  const existingSet = new Set(existingSerials);
  while (generated.length < count) {
    const candidate = `${prefix}-${serialNum}`;
    if (!existingSet.has(candidate)) {
      generated.push(candidate);
    }
    serialNum++;
  }
  return generated;
}

export default function BarcodeStringGenerator() {
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [barcodeStrings, setBarcodeStrings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setBarcodeStrings([]);
    setSku("");
    setQuantity(1);
  };
  const handleClose = () => setOpen(false);

  const handleGenerate = async () => {
    if (!sku || quantity < 1) return;
    setLoading(true);
    // Fetch existing serials for this SKU
    const serialSnap = await getDocs(collection(db, "items", sku, "serials"));
    const existingSerials = serialSnap.docs.map((d) => d.id);
    const newSerials = generateSerials(existingSerials, quantity);
    const barcodeList = newSerials.map((s) => `${sku}|${s}`);
    setBarcodeStrings(barcodeList);
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "orange",
          width: "8rem",
          height: "2rem",
          fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
          position: "fixed",
          top: "2rem",
          left: "2rem",
        }}
        onClick={handleOpen}
      >
        Barcodes
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "purple", color: "white" }}>
          Generate Barcode Strings
        </DialogTitle>
        <DialogContent
          className="scrollable-inventory"
          sx={{ backgroundColor: "purple" }}
        >
          <InputField
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <InputField
            label="Barcodes to generate"
            type="number"
            value={quantity}
            inputProps={{ min: 1 }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            my={2}
          />
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={!sku || quantity < 1 || loading}
            sx={{ backgroundColor: "orange" }}
          >
            Generate
          </Button>
          <Box sx={{ mt: 3 }}>
            {loading && <Typography>Loading...</Typography>}
            {!loading && barcodeStrings.length > 0 && (
              <Box>
                <Typography variant="subtitle1" sx={{ color: "white", mb: 1 }}>
                  Barcode Strings:
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#eee",
                    p: 1,
                    borderRadius: 1,
                    fontFamily: "monospace",
                    fontSize: "1rem",
                  }}
                >
                  {barcodeStrings.map((str, index) => (
                    <div key={str}>{str}</div>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "purple" }}>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "red", color: "white" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
