import { Button } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ExportToCSV() {
  //Helper to convert times to Vancouver time
  function formatToVancouverTime(timeStr) {
    if (!timeStr) return "";
    const date = new Date(timeStr);
    return date.toLocaleString("en-CA", { timeZone: "America/Vancouver" });
  }

  //Helper to get the duration in inventory in minutes
  function getDurationMinutes(scanIn, scanOut) {
    if (!scanIn || !scanOut) return "";
    const start = new Date(scanIn);
    const end = new Date(scanOut);
    const diffMs = end - start;
    if (isNaN(diffMs) || diffMs < 0) return "";
    return Math.round(diffMs / (60 * 1000));
  }

  async function exportScanHistoryToCSV() {
    const allRows = [
      ["SKU", "Serial", "Scan In Time", "Scan Out Time", "Duration (mins)"],
    ];

    const itemsSnap = await getDocs(collection(db, "items"));

    for (const itemDoc of itemsSnap.docs) {
      const sku = itemDoc.id;
      const serialsSnap = await getDocs(
        collection(db, "items", sku, "serials")
      );
      for (const serialDoc of serialsSnap.docs) {
        const serial = serialDoc.id;
        const scanHistory = serialDoc.data().scanHistory || [];
        for (const scan of scanHistory) {
          const inTime = formatToVancouverTime(scan.scanInTime);
          const outTime = formatToVancouverTime(scan.scanOutTime);
          const duration = getDurationMinutes(
            scan.scanInTime,
            scan.scanOutTime
          );
          allRows.push([
            sku,
            serial,
            inTime, // adapt key name if it's "scannedAt" or similar
            outTime,
            duration,
          ]);
        }
      }
    }

    // Convert array to CSV string
    const csv = allRows
      .map((row) =>
        row
          .map((field) => `"${String(field).replace(/"/g, '""')}"`) // quote and escape
          .join(",")
      )
      .join("\n");

    // (Browser) Create a blob for download:
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan_history.csv";
    a.click();
    URL.revokeObjectURL(url);

    // (Node.js) Just write csv to a file with fs.writeFileSync
    // fs.writeFileSync("scan_history.csv", csv, "utf8");
  }

  return (
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
      onClick={exportScanHistoryToCSV}
    >
      Export
    </Button>
  );
}
