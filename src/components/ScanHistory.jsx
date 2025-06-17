import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import ItemContainer from "./ItemContainer";
import ScanHistoryEntry from "./ScanHistoryEntry";
import ScanHistoryLabels from "./ScanHistoryLabels";

export default function ScanHistory({ sku }) {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    if (!sku) return;

    const fetchSerials = async () => {
      const serialsRef = collection(db, "items", sku, "serials");
      const snap = await getDocs(serialsRef);

      // Flatten each scan history entry and attach serial number
      const allScans = [];
      snap.docs.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.scanHistory)) {
          data.scanHistory.forEach((entry, i) => {
            allScans.push({
              key: `${doc.id}-${i}`,
              serial: doc.id,
              inTime: entry.scanInTime || "",
              outTime: entry.scanOutTime || "",
              status: entry.status || "",
            });
          });
        }
      });

      setScans(allScans);
    };

    fetchSerials();
  }, [sku]);

  if (!sku) return null;

  return (
    <ItemContainer
      className="scrollable-inventory"
      maxHeight="100%"
      maxWidth="100%"
      overflow="auto"
    >
      <ScanHistoryLabels />
      {scans.map((scan, index) => (
        <ScanHistoryEntry
          key={index}
          serial={scan.serial}
          inTime={scan.inTime}
          outTime={scan.outTime}
        />
      ))}
    </ItemContainer>
  );
}
