'use client';
import React, { useState } from 'react';
import { 
  Calendar, 
  Building, 
  DollarSign, 
  FileText, 
  User, 
  MapPin, 
  Clipboard,
  Award,
  Signature
} from 'lucide-react';


export interface SuppliersBondData {
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
  fromDate: string; 
  numberOfDays: number;
  contractPurpose: string;
  bidNo: string;
  bidDate: string;
  bankName: string;
  authorizedSignatory: string;
  authorizedSignatoryPosition: string;
  authorizedSignatory1: string;
  authorizedSignatoryPosition1: string;
  qrCodeUrl: string;
}

interface SuppliersBondFormProps {
  data: SuppliersBondData;
  onUpdate: (data: SuppliersBondData) => void;
}

const SuppliersBondForm: React.FC<SuppliersBondFormProps> = ({ data, onUpdate }) => {
   const [errors, setErrors] = useState<{ [key in keyof SuppliersBondData]?: string }>({});
   const handleChange = (field: keyof SuppliersBondData, value: string | number) => {
     onUpdate({ ...data, [field]: value });
     validateField(field, value); // Validate the field on change
   };
 
  const validateField = (field: keyof SuppliersBondData, value: string | number) => {
       const strValue = String(value);
    if (strValue.trim() === '' || strValue.length < 3) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} is required and must be at least 3 characters long.`,
      }));
    } else {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const calculateValidityDate = (fromDate: string, days: number) => {
    if (!fromDate) return '';
    const date = new Date(fromDate);
    if (isNaN(date.getTime())) return '';
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    const newValidityDate = calculateValidityDate(newFromDate, data.numberOfDays);
    onUpdate({ ...data, fromDate: newFromDate, validityDate: newValidityDate });
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = parseInt(e.target.value, 10);
    const newValidityDate = calculateValidityDate(data.fromDate, newDays);
    onUpdate({ ...data, numberOfDays: newDays, validityDate: newValidityDate });
    validateField('numberOfDays', newDays); 
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Advance Payment Guarantee</h2> */}
        <p className="text-gray-600 mt-2">Fill in the details for the payment guarantee</p>
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        {/* Date */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Date</span>
          </label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span>Address</span>
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      {/* Recipient and Client */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recipient */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <User className="h-4 w-4 text-blue-600" />
            <span>TO (Recipient)</span>
          </label>
          <input
            type="text"
            placeholder="Enter recipient name/company"
            value={data.toName}
            onChange={(e) => handleChange('toName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {errors.toName && <p className="text-red-500 text-sm">{errors.toName}</p>}
        </div>

        {/* Client Name */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Building className="h-4 w-4 text-blue-600" />
            <span>Client Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter client name"
            value={data.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
        </div>
      </div>

      {/* Bond Amount and Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span>Bond Amount</span>
          </label>
          <input
            type="number"
            placeholder="Enter bond amount"
            value={data.bondAmount}
            onChange={(e) => {
              const value = e.target.value;
              handleChange('bondAmount', value ? parseFloat(value) : 0);
              validateField('bondAmount', value);
            }}
            min="100"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {errors.bondAmount && <p className="text-red-500 text-sm">{errors.bondAmount}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span>Currency</span>
          </label>
          <select
            value={data.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="Birr">ETB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* Validity Period Section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Validity Period
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={data.fromDate}
              onChange={handleFromDateChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Days</label>
            <input
              type="number"
              value={data.numberOfDays}
              onChange={handleDaysChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter number of days"
            />
            {errors.numberOfDays && <p className="text-red-500 text-sm">{errors.numberOfDays}</p>}
          </div>
        </div>
      </div>

      {/* Contract Purpose */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4 text-blue-600" />
          <span>Contract Purpose</span>
        </label>
        <input
          type="text"
          placeholder="Enter contract purpose"
          value={data.contractPurpose}
          onChange={(e) => handleChange('contractPurpose', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {errors.contractPurpose && <p className="text-red-500 text-sm">{errors.contractPurpose}</p>}
      </div>

      {/* Bid Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Award className="h-4 w-4 text-blue-600" />
            <span>Bid No.</span>
          </label>
          <input
            type="text"
            placeholder="Enter bid number"
            value={data.bidNo}
            onChange={(e) => handleChange('bidNo', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {errors.bidNo && <p className="text-red-500 text-sm">{errors.bidNo}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Bid Date</span>
          </label>
          <input
            type="date"
            value={data.bidDate}
            onChange={(e) => handleChange('bidDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Authorized Signatories */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Signature className="h-5 w-5 mr-2" />
          Authorized Signatories
        </h3>
        
        {/* First Signatory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Signatory 1 Name</label>
            <input
              type="text"
              placeholder="Enter authorized signatory name"
              value={data.authorizedSignatory}
              onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.authorizedSignatory && <p className="text-red-500 text-sm">{errors.authorizedSignatory}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Signatory 1 Position</label>
            <input
              type="text"
              placeholder="Enter authorized signatory position"
              value={data.authorizedSignatoryPosition}
              onChange={(e) => handleChange('authorizedSignatoryPosition', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.authorizedSignatoryPosition && <p className="text-red-500 text-sm">{errors.authorizedSignatoryPosition}</p>}
          </div>
        </div>

        {/* Second Signatory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Signatory 2 Name</label>
            <input
              type="text"
              placeholder="Enter authorized signatory name"
              value={data.authorizedSignatory1}
              onChange={(e) => handleChange('authorizedSignatory1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.authorizedSignatory1 && <p className="text-red-500 text-sm">{errors.authorizedSignatory1}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Signatory 2 Position</label>
            <input
              type="text"
              placeholder="Enter authorized signatory position"
              value={data.authorizedSignatoryPosition1}
              onChange={(e) => handleChange('authorizedSignatoryPosition1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.authorizedSignatoryPosition1 && <p className="text-red-500 text-sm">{errors.authorizedSignatoryPosition1}</p>}
          </div>
        </div>
      </div>
    </div>
          );
        };
        

export default SuppliersBondForm;