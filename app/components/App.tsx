'use client';
import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import Navbar from './navbar';
import SuppliersBondForm, { SuppliersBondData } from './letterForm/SupplierBG';
import AdvancePGForm, { AdvancePGData } from './letterForm/AdvancePG';
import PerformanceBGForm, { PerformanceBGData } from './letterForm/PerformanceBG';
import SuppliersBondPreview from './letterPreview/suplierbg';
import AdvancePGPreview from './letterPreview/advancepg';
import PerformanceBGPreview from './letterPreview/performancebg';
import BidbondForm, { BidbondFormData } from './letterForm/bidbond';
import BidbondPreview from './letterPreview/bidbond';
import apiServices from '../ExportApi';
import { generateQRCode } from './utils/generateQRCode';
import { handleExportPDF } from './utils/ExportPDF';

interface PendingLetter {
    _id: string;
    refNo: string;
    letterType: string;
    fromCompany: string;
    toCompanyName: string;
    clientName: string;
    currency: string;
    authorizedSignatory2: string;
    authorizedSignatory2Position: string;
    authorizedSignatory1: string;
    authorizedSignatory1Position: string;
    guaranteeAmount: number;
    crtBy: string;
    status: number;
    dateIssued: string;
    bidExpiredMonth: string;
    bidExpiredDay: string;
    bidExpiredYear: string;
    bidAmount: number;
    bidDate: string;
    bidNumber: string;
    FormData:string;
    numberOfDays: number;
    address: string;
    contractPurpose: string;
}

export interface LetterData {
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
    fromDate: string; // New property to hold the from date
    numberOfDays: number;
    contractPurpose: string;
    bidNo: string;
    bidDate: string;
    bankName: string;
    authorizedSignatory: string;
    authorizedSignatoryPosition: string;
    authorizedSignatory1: string;
    authorizedSignatoryPosition1: string;
    qrCodeUrl?: string;
}

function App() {
    const [letterType, setLetterType] = useState('BID Bond Guarantee');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('form');
    const [gridData, setGridData] = useState<PendingLetter[]>([]);
    const [selectedLetter, setSelectedLetter] = useState<PendingLetter | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authority, setAuthority] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [Uname, setUname] = useState<string | null>(null);

    useEffect(() => {
        setAuthority(sessionStorage.getItem('authority'));
        setUserId(sessionStorage.getItem('userId'));
        setUname(sessionStorage.getItem('Uname'));
    }, []);

    const createInitialData = () => ({
        refNo: '',
        date: new Date().toISOString().split('T')[0],
        toName: '',
        address: '',
        clientName: '',
        bondAmount: 0,
        currency: 'Birr',
        validityMonth: '',
        validityDate: '',
        validityYear: '',
        fromDate: '',// New property to hold the from date
        numberOfDays: 0,
        contractPurpose: '',
        bidNo: '',
        bidDate: '',
        bankName: 'AMHARA BANK SC',
        authorizedSignatory: '',
        authorizedSignatoryPosition: '',
        authorizedSignatory1: '',
        authorizedSignatoryPosition1: '',
        qrCodeUrl: '',
    });

    const [BidbondData, setBidbondData] = useState<BidbondFormData>(createInitialData());
    const [AdvancePGData, setAdvancePGData] = useState<AdvancePGData>(createInitialData());
    const [suppliersBondData, setSuppliersBondData] = useState<SuppliersBondData>(createInitialData());
    const [PerformanceBGData, setPerformanceBGData] = useState<PerformanceBGData>(createInitialData());

    const getCurrentData = () => {
        switch (letterType) {
            case 'BID Bond Guarantee':
                return BidbondData;
            case 'Suppliers Bond Guarantee':
                return suppliersBondData;
            case 'Advance Payment Guarantee':
                return AdvancePGData;
            case 'Performance Bond Guarantee':
                return PerformanceBGData;
            default:
                return BidbondData;
        }
    };

    const renderForm = () => {
        switch (letterType) {
            case 'BID Bond Guarantee':
                return <BidbondForm data={BidbondData} onUpdate={setBidbondData} />;
            case 'Suppliers Bond Guarantee':
                return <SuppliersBondForm data={suppliersBondData} onUpdate={setSuppliersBondData} />;
            case 'Advance Payment Guarantee':
                return <AdvancePGForm data={AdvancePGData} onUpdate={setAdvancePGData} />;
            case 'Performance Bond Guarantee':
                return <PerformanceBGForm data={PerformanceBGData} onUpdate={setPerformanceBGData} />;
            default:
                return <BidbondForm data={BidbondData} onUpdate={setBidbondData} />;
        }
    };

const renderPreview = () => {
    switch (letterType) {
        case 'BID Bond Guarantee':
            return <BidbondPreview data={BidbondData} qrCodeUrl={''} />;
        case 'Suppliers Bond Guarantee':
            return <SuppliersBondPreview data={suppliersBondData} qrCodeUrl={''} />;
        case 'Advance Payment Guarantee':
            return <AdvancePGPreview data={AdvancePGData} qrCodeUrl={''} />;
        case 'Performance Bond Guarantee':
            return <PerformanceBGPreview data={PerformanceBGData} qrCodeUrl={''} />;
        default:
            return <BidbondPreview data={BidbondData} qrCodeUrl={''} />;
    }
};

const handleSaveLetter = async () => {
    setIsLoading(true);
    try {
        const currentData = {
            letterType: letterType,
            address: getCurrentData().address || '',
            toCompanyName: getCurrentData().toName || '',
            clientName: getCurrentData().clientName || '',
            guaranteeAmount: getCurrentData().bondAmount || '',
            bidExpiredDay: getCurrentData().validityDate || '',
            bidAmount: getCurrentData().bondAmount,
            contractPurpose: getCurrentData().contractPurpose || '',
            bidDate: getCurrentData().bidDate || '',
            bidNumber: getCurrentData().bidNo || '',
            fromCompany: 'AMHARA BANK SC',
            crtBy: Uname || 'unknown',
            authorizedSignatory1Position: getCurrentData().authorizedSignatoryPosition || '',
            authorizedSignatory1: getCurrentData().authorizedSignatory || '',
            authorizedSignatory2Position: getCurrentData().authorizedSignatoryPosition1 || '',
            authorizedSignatory2: getCurrentData().authorizedSignatory1 || '',
        };

        // API request
        const response = await apiServices.post('submitLetter', currentData);
        
        if (response.status !== 200) {
            alert('Failed to send data to the backend');
            throw new Error('Failed to send data to the backend');
        } else {
            alert('Letter saved successfully');
            console.log('Letter saved successfully', response.data);
            
            // Clear the forms by resetting the state
            setBidbondData(createInitialData());
            setAdvancePGData(createInitialData());
            setSuppliersBondData(createInitialData());
            setPerformanceBGData(createInitialData());
        }

        console.log('Letter to be saved :', currentData);
    } catch (error) {
        console.error('Error saving letter:', error);
    } finally {
        setIsLoading(false);
    }
};

const fetchGridData = async () => {
setIsLoading(true);
try {
console.log('Retrieved User ID from session storage:', userId);
console.log('Retrieved authority from session storage:', authority);
console.log('Retrieved Uname from session storage:', Uname);  // Log to verify
const response = await apiServices.post('pendingLetter', {crtBy: Uname,authority: authority});


        if (response.status === 200) {
            setGridData(response.data); // Assuming response data is an array of PendingLetter
            console.log('Grid Data:', response.data);
        }
    } catch (error) {
        console.error('Error fetching pending letters:', error);
    } finally {
        setIsLoading(false);
    }
};

// Fetch data when the "grid" tab is active
useEffect(() => {
    if (activeTab === 'grid') {
        fetchGridData();
    }
}, [activeTab]); // Depend on activeTab

    const handleGenerateLetter = async (item: PendingLetter) => {
  if (item.status === 2) {
    setSelectedLetter(item);

    const baseUrl = 'http://172.16.239.70:3000';  // Your app base URL

    // Construct the full URL to the summary page with the refNo param
    const qrCodeUrl = `${baseUrl}/summary/${encodeURIComponent(item.refNo)}`;

    // Generate a QR code that encodes this URL as a string inside an object
    const url = await generateQRCode(qrCodeUrl);

    setQrCodeUrl(url);
    setIsModalOpen(true);
  } else {
    alert('QR code can only be generated for letters with status 2.');
  }
};


    
    const handlePreviewLetter = async (item: PendingLetter) => {
  
        setSelectedLetter(item);
        setIsModalOpen(true); 
     
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLetter(null);
        setQrCodeUrl('');
    };

    const getStatusName = (status: number) => {
  switch (status) {
    case 1:
      return 'Pending';
    case 2:
      return 'Authorized';
    default:
      return 'Unknown'; // Optional: Handle any other status codes
  }
};

    const mapPendingLetterToData = (letter: PendingLetter): LetterData => {
        return {
            refNo: letter.refNo,
            date: new Date(letter.dateIssued).toISOString().split('T')[0],
            toName: letter.toCompanyName,
            address: letter.address, 
            clientName: letter.clientName,
            bondAmount: Number(letter.guaranteeAmount),
            currency: letter.currency,
            validityMonth: letter.bidExpiredMonth, 
            validityDate: letter.bidExpiredDay, 
            validityYear: letter.bidExpiredYear,
            fromDate: letter.FormData,
            numberOfDays: letter.numberOfDays,
            contractPurpose: letter.contractPurpose,
            bidNo: letter.bidNumber, 
            bidDate: letter.bidDate, 
            bankName: letter.fromCompany,
            authorizedSignatory: letter.authorizedSignatory1,
            authorizedSignatoryPosition: letter.authorizedSignatory1Position,
            authorizedSignatory1: letter.authorizedSignatory2,
            authorizedSignatoryPosition1: letter.authorizedSignatory2Position,
            qrCodeUrl: '', 
        };
    };

const handleApproveLetter = async (refNo: string) => {

  try {
    console.log('refNo', refNo);
        const response = await apiServices.post('approveLetter', { refNo });
        console.log('API Response:', response.data);
        
        if (response.status === 200) {
            alert('Letter approved successfully');
            // Optionally refresh or update the grid data here
            fetchGridData(); // Refresh grid data after approval
        } else {
            alert('Failed to approve the letter');
        }
    } catch (error) {
        console.error('Error approving letter:', error);
        alert('An error occurred while approving the letter.');
    }
   
} // Implement handleApproveLetter

    const renderLetterPreview = () => {
        if (!selectedLetter) return null;

        const letterData = mapPendingLetterToData(selectedLetter);
        letterData.qrCodeUrl = qrCodeUrl; // Set QR code URL

        switch (selectedLetter.letterType) {
            case 'Suppliers Bond Guarantee':
                return <SuppliersBondPreview data={letterData as SuppliersBondData} qrCodeUrl={qrCodeUrl} />;
            case 'Advance Payment Guarantee':
                return <AdvancePGPreview data={letterData as AdvancePGData} qrCodeUrl={qrCodeUrl} />;
            case 'Performance Bond Guarantee':
                return <PerformanceBGPreview data={letterData as PerformanceBGData} qrCodeUrl={qrCodeUrl} />;
            case 'BID Bond Guarantee':
                return <BidbondPreview data={letterData as BidbondFormData} qrCodeUrl={qrCodeUrl} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
           <div className="border-b border-gray-200 mb-6">
  <nav className="flex gap-6" aria-label="Tabs">
    <button
      onClick={() => setActiveTab('form')}
      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm
        ${activeTab === 'form'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
    >
      {/* <span className="material-icons text-base">edit</span> */}
      <span>Form & Preview</span>
    </button>

    <button
      onClick={() => setActiveTab('grid')}
      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm
        ${activeTab === 'grid'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
    >
      {/* <span className="material-icons text-base">folder</span> */}
      <span>Saved Letters</span>
    </button>
  </nav>
{authority === '2' && activeTab === 'form' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 mb-4">
                                    <Briefcase className="h-5 w-5" />
                                    <span>Select Letter Type</span>
                                </h2>
                                <select
                                    value={letterType}
                                    onChange={(e) => setLetterType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="BID Bond Guarantee">BID Bond Guarantee Letter</option>
                                    <option value="Suppliers Bond Guarantee">Suppliers Bond Guarantee</option>
                                    <option value="Performance Bond Guarantee">Performance Bond Guarantee Letter</option>
                                    <option value="Advance Payment Guarantee">Advance Payment Guarantee Letter</option>
                                </select>
                            </div>
                            {renderForm()}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <button
                                    onClick={handleSaveLetter}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                                >
                                    <span>Save</span>
                                </button>
                                {isLoading && <p className="text-sm text-gray-500">Saving...</p>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900">Letter Preview</h2>
                                {renderPreview()}
                            </div>
                        </div>
                    </div>
                )}
             
                {activeTab === 'grid' && (
                 <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Letters</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ref No</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Letter Type</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">From Company</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">To Company Name</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Client Name</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Authorized Signatory</th>
          {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Authorized position</th> */}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Authorized2 Signatory</th>
          {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Authorized2 position</th> */}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Guarantee Amount</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created By</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Authorized By</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date Issued</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {gridData.map((item) => (
          <tr
            key={item._id}
            className="hover:bg-gray-100 transition-all duration-200"
          >
            <td className="px-4 py-3 text-sm text-gray-900">{item.refNo}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.letterType}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.fromCompany}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.toCompanyName}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.clientName}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.authorizedSignatory1}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.authorizedSignatory1Position}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.authorizedSignatory2}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.authorizedSignatory2Position}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.guaranteeAmount}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{item.crtBy}</td>
            <td className="px-4 py-3 text-sm text-gray-900">
                {getStatusName(item.status)} {/* Use the mapping function */}
              </td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {new Date(item.dateIssued).toLocaleDateString()}
            </td>
            <td className="px-4 py-3 text-sm">
              <button
                onClick={() => handlePreviewLetter(item)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
              >
                 Letter Draft
              </button>
            </td>
            <td className="px-4 py-3 text-sm">
              {authority === '2' && (
              <button
                onClick={() => handleGenerateLetter(item)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
              >
                Generate Letter
              </button>
              )}
            </td>
             <td className="px-4 py-3 text-sm">
                {authority === '1' && item.status !== 2 && ( // Check authority and status before rendering button
                  <button
                    onClick={() => handleApproveLetter(item.refNo)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                  >
                    Approve Letter
                  </button>
                )}
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

                )}
            </div>

{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
      <div className="max-h-[60vh] overflow-y-auto" id="letter-content">
        {renderLetterPreview()}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={closeModal}
          className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  </div>
)}



        </div>
    );
}

export default App;