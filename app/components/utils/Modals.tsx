"use client";

import React from "react";
import { PendingLetter } from "@/types/letters";
import SuppliersBondPreview from "../letterPreview/suplierbg";
import AdvancePGPreview from "../letterPreview/advancepg";
import PerformanceBGPreview from "../letterPreview/performancebg";
import BidbondPreview from "../letterPreview/bidbond";
import { SuppliersBondData } from "../letterForm/SupplierBG";
import { AdvancePGData } from "../letterForm/AdvancePG";
import { PerformanceBGData } from "../letterForm/PerformanceBG";
import { BidbondFormData } from "../letterForm/bidbond";
import { handleExportPDF } from "./ExportPDF";

interface ModalsProps {
  open: boolean;
  letter: PendingLetter | null;
  onClose: () => void;
  qrCodeUrl?: string;
}


const Modals: React.FC<ModalsProps> = ({
  open,
  letter,
  onClose,
  qrCodeUrl,
}) => {
  if (!open || !letter) return null;

  const mapPendingLetterToData = (l: PendingLetter) => ({
    refNo: l.refNo,
    date: new Date(l.dateIssued).toISOString().split("T")[0],
    toName: l.toCompanyName,
    address: l.address,
    clientName: l.clientName,
    bondAmount: Number(l.guaranteeAmount),
    currency: l.currency,
    validityMonth: l.bidExpiredMonth,
    validityDate: l.bidExpiredDay,
    validityYear: l.bidExpiredYear,
    fromDate: l.FormData,
    numberOfDays: l.numberOfDays,
    contractPurpose: l.contractPurpose,
    bidNo: l.bidNumber,
    bidDate: l.bidDate,
    bankName: l.fromCompany,
    authorizedSignatory: l.authorizedSignatory1,
    authorizedSignatoryPosition: l.authorizedSignatory1Position,
    authorizedSignatory1: l.authorizedSignatory2,
    authorizedSignatoryPosition1: l.authorizedSignatory2Position,
    qrCodeUrl: qrCodeUrl || "",
  });

  const renderLetterPreview = () => {
  const letterData = mapPendingLetterToData(letter);

  switch (letter.letterType) {
    case "Suppliers Bond Guarantee":
      return <SuppliersBondPreview data={letterData as SuppliersBondData} qrCodeUrl={letterData.qrCodeUrl} />;
    case "Advance Payment Guarantee":
      return <AdvancePGPreview data={letterData as AdvancePGData} qrCodeUrl={letterData.qrCodeUrl} />;
    case "Performance Bond Guarantee":
      return <PerformanceBGPreview data={letterData as PerformanceBGData} qrCodeUrl={letterData.qrCodeUrl} />;
    case "BID Bond Guarantee":
    default:
      return <BidbondPreview data={letterData as BidbondFormData} qrCodeUrl={letterData.qrCodeUrl} />;
  }
};


  const handlePDFExport = () => {
    // Pass the letter data to the PDF export function
    handleExportPDF(letter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <div className="max-h-[60vh] overflow-y-auto" id="letter-content">
          {renderLetterPreview()}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handlePDFExport}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;