"use client";
import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Navbar from "./navbar";
import SuppliersBondForm, { SuppliersBondData } from "./letterForm/SupplierBG";
import AdvancePGForm, { AdvancePGData } from "./letterForm/AdvancePG";
import PerformanceBGForm, {PerformanceBGData} from "./letterForm/PerformanceBG";
import SuppliersBondPreview from "./letterPreview/suplierbg";
import AdvancePGPreview from "./letterPreview/advancepg";
import PerformanceBGPreview from "./letterPreview/performancebg";
import BidbondForm, { BidbondFormData } from "./letterForm/bidbond";
import BidbondPreview from "./letterPreview/bidbond";
import apiServices from "../ExportApi";
import { generateQRCode } from "./utils/generateQRCode";
import { PendingLetter } from "@/types/letters";
import LettersGrid from "./utils/LettersGrid";
import Modals from "./utils/Modals";
import withAuth from "../auth";

function App() {
  const [letterType, setLetterType] = useState("BID Bond Guarantee");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [gridData, setGridData] = useState<PendingLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<PendingLetter | null>(
    null
  );
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
  console.log(Uname);
  useEffect(() => {
    if (authority == "1") {
      setActiveTab("grid");
    }
  }, [authority]);

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
    contractPurpose: "",
    bidNo: "",
    bidDate: "",
    bankName: "AMHARA BANK SC",
    authorizedSignatory: "",
    authorizedSignatoryPosition: "",
    authorizedSignatory1: "",
    authorizedSignatoryPosition1: "",
    qrCodeUrl: "",
  });

  const [BidbondData, setBidbondData] = useState<BidbondFormData>(
    createInitialData()
  );
  const [AdvancePGData, setAdvancePGData] = useState<AdvancePGData>(
    createInitialData()
  );
  const [suppliersBondData, setSuppliersBondData] = useState<SuppliersBondData>(
    createInitialData()
  );
  const [PerformanceBGData, setPerformanceBGData] = useState<PerformanceBGData>(
    createInitialData()
  );

  const getCurrentData = () => {
    switch (letterType) {
      case "BID Bond Guarantee":
        return BidbondData;
      case "Suppliers Bond Guarantee":
        return suppliersBondData;
      case "Advance Payment Guarantee":
        return AdvancePGData;
      case "Performance Bond Guarantee":
        return PerformanceBGData;
      default:
        return BidbondData;
    }
  };

  const renderForm = () => {
    switch (letterType) {
      case "BID Bond Guarantee":
        return <BidbondForm data={BidbondData} onUpdate={setBidbondData} />;
      case "Suppliers Bond Guarantee":
        return (
          <SuppliersBondForm
            data={suppliersBondData}
            onUpdate={setSuppliersBondData}
          />
        );
      case "Advance Payment Guarantee":
        return (
          <AdvancePGForm data={AdvancePGData} onUpdate={setAdvancePGData} />
        );
      case "Performance Bond Guarantee":
        return (
          <PerformanceBGForm
            data={PerformanceBGData}
            onUpdate={setPerformanceBGData}
          />
        );
      default:
        return <BidbondForm data={BidbondData} onUpdate={setBidbondData} />;
    }
  };

  const renderPreview = () => {
    switch (letterType) {
      case "BID Bond Guarantee":
        return <BidbondPreview data={BidbondData} qrCodeUrl={""} />;
      case "Suppliers Bond Guarantee":
        return <SuppliersBondPreview data={suppliersBondData} qrCodeUrl={""} />;
      case "Advance Payment Guarantee":
        return <AdvancePGPreview data={AdvancePGData} qrCodeUrl={""} />;
      case "Performance Bond Guarantee":
        return <PerformanceBGPreview data={PerformanceBGData} qrCodeUrl={""} />;
      default:
        return <BidbondPreview data={BidbondData} qrCodeUrl={""} />;
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
        contractPurpose: getCurrentData().contractPurpose || "",
        bidDate: getCurrentData().bidDate || "",
        bidNumber: getCurrentData().bidNo || "",
        fromCompany: "AMHARA BANK SC",
        crtBy: Uname || "unknown",
        authorizedSignatory1Position:
          getCurrentData().authorizedSignatoryPosition || "",
        authorizedSignatory1: getCurrentData().authorizedSignatory || "",
        authorizedSignatory2Position:
          getCurrentData().authorizedSignatoryPosition1 || "",
        authorizedSignatory2: getCurrentData().authorizedSignatory1 || "",
      };

      const response = await apiServices.post("submitLetter", currentData);

      if (response.status !== 200) {
        alert("Failed to send data to the backend");
        throw new Error("Failed to send data to the backend");
      } else {
        alert("Letter saved successfully");
        setBidbondData(createInitialData());
        setAdvancePGData(createInitialData());
        setSuppliersBondData(createInitialData());
        setPerformanceBGData(createInitialData());
      }

      console.log("Letter to be saved :", currentData);
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

 
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="max-w-6xl ms-3">
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-6" aria-label="Tabs">
              {authority === "2" && (
                <button
                  onClick={() => setActiveTab("form")}
                  className={`inline-flex items-center px-1 py-3 border-b-2 text-sm font-medium transition
                ${
                  activeTab === "form"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                >
                  Form & Preview
                </button>
              )}
              <button
                onClick={() => setActiveTab("grid")}
                className={`inline-flex items-center px-1 py-3 border-b-2 text-sm font-medium transition
                ${
                  activeTab === "grid"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Saved Letters
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
                    <option value="BID Bond Guarantee">
                      BID Bond Guarantee Letter
                    </option>
                    <option value="Suppliers Bond Guarantee">
                      Suppliers Bond Guarantee
                    </option>
                    <option value="Performance Bond Guarantee">
                      Performance Bond Guarantee Letter
                    </option>
                    <option value="Advance Payment Guarantee">
                      Advance Payment Guarantee Letter
                    </option>
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
                  {isLoading && (
                    <p className="mt-2 text-sm text-gray-500">Saving...</p>
                  )}
                </div>
              </div>
              <div className="space-y-6 lg:sticky lg:top-6">
                <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Letter Preview
                  </h2>
                  <div className="mt-3 ">
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
     
      </div>
    </div>
  );
}

export default withAuth(App);
