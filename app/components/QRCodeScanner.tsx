"use client";

import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { useRouter } from "next/navigation";

interface ScannedData {
  refNo: string;
  date: string;
  toName: string;
  address: string;
  clientName: string;
  bondAmount: number;
  currency: string;
  validityMonth: string;
  validityDate: string;
  validityYear: string;
  contractPurpose: string;
  bidNo: string;
  bidDate: string;
  bankName: string;
  authorizedSignatory: string;
}

const QRCodeScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleScan = (data: string | null) => {
    console.log("Scanned data:", data);
    if (data) {
      try {
        const parsedData: ScannedData = JSON.parse(data);
        setScannedData(parsedData);
        setErrorMessage(null);

        // If we have a refNo, redirect to summary page
        if (parsedData.refNo) {
          router.push(`/summary/${parsedData.refNo}`);
        }
      } catch (error) {
        console.error("Error parsing scanned data:", error);
        setErrorMessage(
          "Failed to parse scanned data. Please ensure it is valid JSON."
        );
      }
    } else {
      setErrorMessage("No data scanned.");
    }
  };

  const handleError = (error: unknown) => {
    console.error("QR scan error:", error);
    setErrorMessage("Error scanning QR code.");
  };

  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="p-4">
      <QrScanner onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default QRCodeScanner;
