'use client';
import React from 'react';
import { Calendar, User, FileText, DollarSign } from 'lucide-react';

export interface AmharicLetterData {
  refNo: string;
  date: string;
  toName: string;
  address: string;
  clientName: string;
  bondAmount: string;
  currency: string;
  validityMonth: string;
  validityDate: string;
  validityYear: string;
  contractPurpose: string;
  bidNo: string;
  bidDate: string;
  bankName: string;
  authorizedSignatory: string;
  qrCodeUrl: string;
}

interface AmharicLetterFormProps {
  data: AmharicLetterData;
  onUpdate: (data: AmharicLetterData) => void;
}

const AmharicLetterForm: React.FC<AmharicLetterFormProps> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof AmharicLetterData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
        <FileText className="h-5 w-5" />
        <span>የጨረታ ማስከበሪያ ዋስትና </span>
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4" />
              <span>Date (ቀን)</span>
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <User className="h-4 w-4" />
            <span> ለ </span>
          </label>
          <input
            type="text"
            placeholder="Enter recipient name"
            value={data.toName}
            onChange={(e) => handleChange('toName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <User className="h-4 w-4" />
            <span> አድራሻ </span>
          </label>
          <input
            type="text"
            placeholder=""
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700"> አቶ/ወሮ</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={data.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4" />
            <span>የዋስትና ብር መጠን</span>
          </label>
          <input
            type="text"
            placeholder="Enter bond amount"
            value={data.bondAmount}
            onChange={(e) => handleChange('bondAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

   <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Currency</label>
          <select
            value={data.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Birr">Birr</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

<div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">የሚቆይበት ጊዜ</h3>
        
        <div className="grid grid-cols-3 gap-4">
      <div className="space-y-4">
        
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">ቀን</label>
            <input
              type="text"
              placeholder=""
              value={data.validityDate}
              onChange={(e) => handleChange('validityDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">ወር</label>
            <input
              type="text"
              placeholder="Month"
              value={data.validityMonth}
              onChange={(e) => handleChange('validityMonth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">አመት</label>
            <input
              type="text"
              placeholder="Year"
              value={data.validityYear}
              onChange={(e) => handleChange('validityYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
     
        </div>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">የጨረታ ቁጥር.</label>
          <input
            type="text"
            placeholder="Enter bid number"
            value={data.bidNo}
            onChange={(e) => handleChange('bidNo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">የጨረታ ቀን</label>
          <input
            type="date"
            value={data.bidDate}
            onChange={(e) => handleChange('bidDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>


        <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Bank Name</label>
        <input
          type="text"
          placeholder="Enter bank name"
          value={data.bankName}
          onChange={(e) => handleChange('bankName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Authorized Signatory</label>
        <input
          type="text"
          placeholder="Enter authorized signatory name"
          value={data.authorizedSignatory}
          onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
        </div>
      </div>
   </div>
  );
};

export default AmharicLetterForm;