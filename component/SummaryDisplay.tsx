'use client';
import apiServices from '@/app/ExportApi';
import { useState } from 'react';

interface LetterData {
  refNo: string;
  letterType: string;
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
  qrCodeUrl?: string;
  secretCode: string;
}

export default function SummaryDisplay({ data }: { data: LetterData }) {
  const [isPhoneInputVisible, setIsPhoneInputVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyClick = () => {
    setIsPhoneInputVisible(true);
    setError(null);
  };

  const handleSendClick = async () => {
    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('data to be send to backend:', phoneNumber, data.refNo, data.secretCode);
      const response = await apiServices.post('verifyLetters', { 
        phone: phoneNumber, 
        refNo: data.refNo, 
        secretCode: data.secretCode 
      });

      if (response.status === 200) {
        alert("OTP has been resent to your phone");
      } else {
        setError(response.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};
  // ✅ Use "ETB" for Intl.NumberFormat and append "Birr" manually
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency, // standard ISO code for Ethiopian Birr
      minimumFractionDigits: 2
    }).format(amount) + ' Birr';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6">Letter Summary</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-3 mb-6">
        {Object.entries({
          'Letter Type': data.letterType,
          'Reference No': data.refNo,
          'Date': data.date,
          'To Name': data.toName,
          'Address': data.address,
          'Client Name': data.clientName,
          'Bond Amount': formatCurrency(data.bondAmount),
          'Validity': formatDate(data.date),
          'Contract Purpose': data.contractPurpose,
          'Bid No': data.bidNo,
          'Bid Date': data.bidDate,
          'Bank Name': data.bankName,
          'Authorized Signatory': data.authorizedSignatory
        }).map(([label, value]) => (
          <div key={label} className="flex justify-between py-2 border-b border-gray-100">
            <strong className="text-gray-700">{label}:</strong>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      {data.qrCodeUrl && (
        <div className="flex flex-col items-center mb-6">
          <img 
            src={data.qrCodeUrl} 
            alt="QR Code" 
            className="w-32 h-32 border border-gray-200 rounded-lg p-2"
          />
          <p className="mt-2 text-sm text-gray-500">Scan to verify</p>
        </div>
      )}

      <div className="text-center space-y-4">
        {!isPhoneInputVisible ? (
          <button
            onClick={handleVerifyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Verify Document
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center gap-2">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSendClick}
                disabled={isLoading}
                className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
            <p className="text-sm text-gray-500">
              We'll send a verification code to this number
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
