'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AmharicLetterForm, { AmharicLetterData } from './amhLetterForm/chereta';
import AmharicLetter2Form, { AmharicLetter2Data } from './amhLetterForm/kdmiya';
import AmharicLetterPreview from './amhLetterPreview/cheretaPreview';
import AmharicLetter4Preview from './amhLetterPreview/melkamSraPreview';
import AmharicLetter3Preview from './amhLetterPreview/ekaAkrbotPreview';
import AmharicLetter2Preview from './amhLetterPreview/kdmiyaPreview';
import AmharicLetter4Form, { AmharicLetter4Data } from './amhLetterForm/melkamSra';
import AmharicLetter3Form, { AmharicLetter3Data } from './amhLetterForm/ekaAkrbot';
import Navbar from './navbar';
import apiServices from '../ExportApi';
// import { generateQRCode } from './utils/generateQRCode';
import { handleExportPDF } from './utils/ExportPDF';
import withAuth from '../auth';
// import withAuth from '../auth';

function AmhApp() {
  const [letterType, setLetterType] = useState('Amharic Letter 1');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const createInitialData = () => ({
  refNo: '',
    date: new Date().toISOString().split('T')[0],
    toName: '',
    address: '',
    clientName: '',
    bondAmount: '',
    currency: 'Birr',
    validityMonth: '',
    validityDate: '',
    validityYear: '',
    contractPurpose: '',
    bidNo: '',
    bidDate: '',
    bankName: 'አማራ ባንክ አ.ማ',
    authorizedSignatory: '',
    qrCodeUrl: '',
  });

const [amharicData, setAmharicData] = useState<AmharicLetterData>(createInitialData());
const [amharic2Data, setAmharic2Data] = useState<AmharicLetter2Data>(createInitialData());
const [amharic3Data, setAmharic3Data] = useState<AmharicLetter3Data>(createInitialData());
const [amharic4Data, setAmharic4Data] = useState<AmharicLetter4Data>(createInitialData());
  
  const getCurrentData = () => {
    switch (letterType) {
      case 'Amharic Letter 1':
        return amharicData;
      case 'Amharic Letter 2':
        return amharic2Data;
      case 'Amharic Letter 3':
        return amharic3Data;
      case 'Amharic Letter 4':
        return amharic4Data;
      default:
        return amharicData;
    }
  };

  const renderForm = () => {
    switch (letterType) {
      case 'Amharic Letter 1':
        return <AmharicLetterForm data={amharicData} onUpdate={setAmharicData} />;
      case 'Amharic Letter 2':
        return <AmharicLetter2Form data={amharic2Data} onUpdate={setAmharic2Data} />;
      case 'Amharic Letter 3':
        return <AmharicLetter3Form data={amharic3Data} onUpdate={setAmharic3Data} />;
      case 'Amharic Letter 4':
        return <AmharicLetter4Form data={amharic4Data} onUpdate={setAmharic4Data} />;
      default:
        return <AmharicLetterForm data={amharicData} onUpdate={setAmharicData} />;
    }
  };

    

  const renderPreview = () => {
    switch (letterType) {
      case 'Amharic Letter 1':
        return <AmharicLetterPreview data={amharicData} qrCodeUrl={qrCodeUrl} />;
      case 'Amharic Letter 2':
        return <AmharicLetter2Preview data={amharic2Data} qrCodeUrl={qrCodeUrl} />;
      case 'Amharic Letter 3':
        return <AmharicLetter3Preview data={amharic3Data} qrCodeUrl={qrCodeUrl} />;
      case 'Amharic Letter 4':
        return <AmharicLetter4Preview data={amharic4Data} qrCodeUrl={qrCodeUrl} />;
      default:
        return <AmharicLetterPreview data={amharicData} qrCodeUrl={qrCodeUrl} />;
    }
  };


const handleGenerateLetter = async () => {
  setIsLoading(true);
  try {
    const currentData = {
      toCompanyName: getCurrentData().toName || '',
      clientName: getCurrentData().clientName || '',
      guaranteeAmount: getCurrentData().bondAmount || '',
      fromCompany: 'AMHARA BANK SC',
      authorizedSignatory: getCurrentData().authorizedSignatory || '',
      crtBy: '34567890',
    };

    // API request
    const response = await apiServices.post('submitLetter', currentData);

    if (response.status !== 200) {
      throw new Error('Failed to send data to the backend');
    }

    // **Update refNo directly in the form state based on the current letter type**
    switch (letterType) {
      case 'Amharic Letter 1':
        setAmharicData((prev) => ({ ...prev, refNo: response.data.refNo }));
        break;
      case 'Amharic Letter 2':
        setAmharic2Data((prev) => ({ ...prev, refNo: response.data.refNo }));
        break;
      case 'Amharic Letter 3':
        setAmharic3Data((prev) => ({ ...prev, refNo: response.data.refNo }));
        break;
      case 'Amharic Letter 4':
        setAmharic4Data((prev) => ({ ...prev, refNo: response.data.refNo }));
        break;
    }

    // Generate QR Code based on API data
//     const qrCodeData = {
//       type: letterType,
//       RefNo: response.data.refNo,
//       client: response.data.clientName,
//       bank: getCurrentData().bankName,
//       To: getCurrentData().toName,
//       amount: getCurrentData().bondAmount,
//     };

//   const url = await generateQRCode(qrCodeData);
//     setQrCodeUrl(url);
 }
   catch (error) {
   console.error('Error generating QR code:', error);
 } finally {
   setIsLoading(false);
  }
 };



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Letter Type Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">የደብዳቤ አይነት</h2>
            <div className="relative">
              <select
                value={letterType}
                onChange={(e) => setLetterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
              >
                <option value="Amharic Letter 1">የጨረታ ማስከበሪያ ዋስትና  </option>
                <option value="Amharic Letter 2">የቅድሚያ ክፍያ ዋስትና </option>
                <option value="Amharic Letter 3">የዕቃ አቅርቦት ዋስትና </option>
                <option value="Amharic Letter 4">የመልካም ስራ አፈፃፀም ዋስትና </option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            {/* Dynamic Form */}
            {renderForm()}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <button
                onClick={handleGenerateLetter}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <span>Generate Letter</span>
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Click the button to generate the letter
              </p>
              {isLoading && <p className="text-sm text-gray-500">Generating QR Code...</p>}
              {qrCodeUrl && <p className="text-sm text-green-500">QR Code generated successfully!</p>}
              {!qrCodeUrl && !isLoading && <p className="text-sm text-red-500">Failed to generate QR Code.</p>}
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Letter Preview</h2>
               
              </div>
              {renderPreview()}
            </div>
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <button
                            onClick={handleExportPDF}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                          >
                            <span>Export PDF</span>
                          </button>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            Download your letter as a PDF document
                          </p>
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth( AmhApp) ;