"use client";
import React, { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import AmharicLetterForm, { AmharicLetterData } from "./amhLetterForm/chereta";
import AmharicLetter2Form, { AmharicLetter2Data } from "./amhLetterForm/kdmiya";
import AmharicLetterPreview from "./amhLetterPreview/cheretaPreview";
import AmharicLetter2Preview from "./amhLetterPreview/kdmiyaPreview";
import AmharicLetter3Preview from "./amhLetterPreview/ekaAkrbotPreview";
import AmharicLetter3Form, { AmharicLetter3Data } from "./amhLetterForm/ekaAkrbot";
import AmharicLetter4Form, { AmharicLetter4Data } from "./amhLetterForm/melkamSra";
import AmharicLetter4Preview from "./amhLetterPreview/melkamSraPreview";
import Navbar from "./navbar";
import apiServices from "../ExportApi";
import { handleExportPDF } from "./utils/ExportPDF";
import withAuth from "../auth";
import { generateQRCode } from "./utils/generateQRCode";
import { PendingLetter } from "@/types/letters";
import LettersGrid from "./utils/LettersGrid";
import Modals from "./utils/Modals";

function AmhApp() {
  const [letterType, setLetterType] = useState("የጨረታ ማስከበሪያ ዋስትና");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [gridData, setGridData] = useState<PendingLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<PendingLetter | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authority, setAuthority] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [Uname, setUname] = useState<string | null>(null);

  useEffect(() => {
    setAuthority(sessionStorage.getItem("authority"));
    setUserId(sessionStorage.getItem("userId"));
    setUname(sessionStorage.getItem("Uname"));
  }, []);

  const createInitialData = () => ({
    refNo: "",
    date: new Date().toISOString().split("T")[0],
    toName: "",
    address: "",
    clientName: "",
    bondAmount: 0,
    currency: "Birr",
    validityMonth: "",
    validityDate: "",
    validityYear: "",
    fromDate: "",
    numberOfDays: 0,
    bidNo: "",
    bidDate: "",
    bankName: "AMHARA BANK SC",
    authorizedSignatory: "",
    authorizedSignatoryPosition: "",
    authorizedSignatory1: "",
    authorizedSignatoryPosition1: "",
    qrCodeUrl: "",
  });

  const [amharicData, setAmharicData] = useState<AmharicLetterData>(createInitialData());
  const [amharic2Data, setAmharic2Data] = useState<AmharicLetter2Data>(createInitialData());
  const [amharic3Data, setAmharic3Data] = useState<AmharicLetter3Data>(createInitialData());
  const [amharic4Data, setAmharic4Data] = useState<AmharicLetter4Data>(createInitialData());

  const getCurrentData = () => {
    switch (letterType) {
      case "የጨረታ ማስከበሪያ ዋስትና":
        return amharicData;
      case "የቅድሚያ ክፍያ ዋስትና":
        return amharic2Data;
      case "የዕቃ አቅርቦት ዋስትና":
        return amharic3Data;
      case "የመልካም ስራ አፈፃፀም ዋስትና":
        return amharic4Data;
      default:
        return amharicData;
    }
  };

  const renderForm = () => {
    switch (letterType) {
      case "የጨረታ ማስከበሪያ ዋስትና":
        return <AmharicLetterForm data={amharicData} onUpdate={setAmharicData} />;
      case "የቅድሚያ ክፍያ ዋስትና":
        return <AmharicLetter2Form data={amharic2Data} onUpdate={setAmharic2Data} />;
      case "የዕቃ አቅርቦት ዋስትና":
        return <AmharicLetter3Form data={amharic3Data} onUpdate={setAmharic3Data} />;
      case "የመልካም ስራ አፈፃፀም ዋስትና":
        return <AmharicLetter4Form data={amharic4Data} onUpdate={setAmharic4Data} />;
      default:
        return <AmharicLetterForm data={amharicData} onUpdate={setAmharicData} />;
    }
  };

  const renderPreview = () => {
    switch (letterType) {
      case "የጨረታ ማስከበሪያ ዋስትና":
        return <AmharicLetterPreview data={amharicData} qrCodeUrl={qrCodeUrl} />;
      case "የቅድሚያ ክፍያ ዋስትና":
        return <AmharicLetter2Preview data={amharic2Data} qrCodeUrl={qrCodeUrl} />;
      case "የዕቃ አቅርቦት ዋስትና":
        return <AmharicLetter3Preview data={amharic3Data} qrCodeUrl={qrCodeUrl} />;
      case "የመልካም ስራ አፈፃፀም ዋስትና":
        return <AmharicLetter4Preview data={amharic4Data} qrCodeUrl={qrCodeUrl} />;
      default:
        return <AmharicLetterPreview data={amharicData} qrCodeUrl={qrCodeUrl} />;
    }
  };

  const handleSaveLetter = async () => {
    setIsLoading(true);
    try {
      const currentData = {
        letterType: letterType,
        address: getCurrentData().address || "",
        toCompanyName: getCurrentData().toName || "",
        clientName: getCurrentData().clientName || "",
        guaranteeAmount: getCurrentData().bondAmount || "",
        bidExpiredDay: getCurrentData().validityDate || "",
        bidAmount: getCurrentData().bondAmount,
        bidDate: getCurrentData().bidDate || "",
        bidNumber: getCurrentData().bidNo || "",
        fromCompany: "AMHARA BANK SC",
        crtBy: Uname || "unknown",
        authorizedSignatory1Position: getCurrentData().authorizedSignatoryPosition || "",
        authorizedSignatory1: getCurrentData().authorizedSignatory || "",
        authorizedSignatory2Position: getCurrentData().authorizedSignatoryPosition1 || "",
        authorizedSignatory2: getCurrentData().authorizedSignatory1 || "",
      };

      const response = await apiServices.post("submitLetter", currentData);

      if (response.status !== 200) {
        alert("Failed to send data to the backend");
        throw new Error("Failed to send data to the backend");
      } else {
        alert("Letter saved successfully");
        setAmharicData(createInitialData());
        setAmharic2Data(createInitialData());
        setAmharic3Data(createInitialData());
        setAmharic4Data(createInitialData());
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGridData = async () => {
    setIsLoading(true);
    try {
      const response = await apiServices.post("pendingLetter", {
        crtBy: Uname,
        authority: authority,
      });

      if (response.status === 200) {
        setGridData(response.data);
      }
    } catch (error) {
      console.error("Error fetching pending letters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "grid") {
      fetchGridData();
    }
  }, [activeTab]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLetter(null);
    setQrCodeUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("form")}
              className={`inline-flex items-center px-1 py-3 border-b-2 text-sm font-medium transition
        ${activeTab === "form" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <span>Form & Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("grid")}
              className={`inline-flex items-center px-1 py-3 border-b-2 text-sm font-medium transition
        ${activeTab === "grid" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <span>Saved Letters</span>
            </button>
          </nav>
        </div>
        
        {authority === "2" && activeTab === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span>Select Letter Type</span>
                </h2>
                <select
                  value={letterType}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="የጨረታ ማስከበሪያ ዋስትና">የጨረታ ማስከበሪያ ዋስትና</option>
                  <option value="የቅድሚያ ክፍያ ዋስትና">የቅድሚያ ክፍያ ዋስትና</option>
                  <option value="የዕቃ አቅርቦት ዋስትና">የዕቃ አቅርቦት ዋስትና</option>
                  <option value="የመልካም ስራ አፈፃፀም ዋስትና">የመልካም ስራ አፈፃፀም ዋስትና</option>
                </select>
              </div>
              {renderForm()}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <button
                  onClick={handleSaveLetter}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <span>Save</span>
                </button>
                {isLoading && <p className="mt-2 text-sm text-gray-500">Saving...</p>}
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-6">
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <h2 className="text-xl font-semibold text-gray-800">Letter Preview</h2>
                <div className="mt-3">
                  <div className="w-full min-w-[720px] max-w-full">
                    {renderPreview()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "grid" && (
          <LettersGrid data={gridData} authority={authority} />
        )}
      </div>

      <Modals
        open={isModalOpen}
        letter={selectedLetter}
        onClose={closeModal}
        qrCodeUrl={qrCodeUrl}
      />
    </div>
  );
}

export default withAuth(AmhApp);