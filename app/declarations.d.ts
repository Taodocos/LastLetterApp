declare module "react-qr-scanner" {
  import React from "react";

  interface QrScannerProps {
    onError: (error: Error | string) => void; // No 'any'
    onScan: (data: string | null) => void;
    style?: React.CSSProperties;
    delay?: number; // Optional: scanner delay in ms
  }

  const QrScanner: React.FC<QrScannerProps>;

  export default QrScanner;
}
