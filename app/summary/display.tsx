'use client';
import { LetterData } from "../components/App";

const Summaryshow: React.FC<{ data: LetterData }> = ({ data }) => {
  console.log('SummaryDisplay rendering with data:', data); // Debug

  return (
    <div className="summary-container max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Letter Summary</h2>
      <div className="grid grid-cols-1 gap-2">
        <p><strong>Reference No:</strong> {data.refNo}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>To Name:</strong> {data.toName}</p>
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Client Name:</strong> {data.clientName}</p>
        <p><strong>Bond Amount:</strong> {data.bondAmount} {data.currency}</p>
        <p><strong>Validity:</strong> {data.validityDate}/{data.validityMonth}/{data.validityYear}</p>
        <p><strong>Contract Purpose:</strong> {data.contractPurpose}</p>
        <p><strong>Bid No:</strong> {data.bidNo}</p>
        <p><strong>Bid Date:</strong> {data.bidDate}</p>
        <p><strong>Bank Name:</strong> {data.bankName}</p>
        <p><strong>Authorized Signatory:</strong> {data.authorizedSignatory}</p>
      </div>
      {data.qrCodeUrl && (
        <div className="qr-code mt-4 text-center">
          <img src={data.qrCodeUrl} alt="QR Code" className="mx-auto" />
        </div>
      )}
      <div className="text-center mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Download</button>
      </div>
    </div>
  );
};

export default Summaryshow;