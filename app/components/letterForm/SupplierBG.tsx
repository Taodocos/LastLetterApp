'use client';
import React, { useState } from 'react';
import { Calendar, Building, DollarSign } from 'lucide-react';

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
     const strValue = String(value); // Convert to string for validation
     if (strValue.trim() === '' || strValue.length < 3) {
       setErrors((prev) => ({
         ...prev,
         [field]: `${field} is required and must be at least 3 characters long.`,
       }));
     } else {
       setErrors((prev) => {
         const { [field]: _, ...rest } = prev; // Remove error for valid field
         return rest;
       });
     }
   };
 
    const validatenumber = (field: keyof SuppliersBondData, value: string | number) => {
     const strValue = String(value); // Convert to string for validation
     if (strValue.trim() ==='' ) {
       setErrors((prev) => ({
         ...prev,
         [field]: `${field} is required and must be at least 1 characters long.`,
       }));
     } else {
       setErrors((prev) => {
         const { [field]: _, ...rest } = prev; // Remove error for valid field
         return rest;
       });
     }
   };
  
   const validateAllFields = () => {
     const newErrors: { [key in keyof SuppliersBondData]?: string } = {};
     
     for (const key in data) {
       const value = data[key as keyof SuppliersBondData];
       const strValue = String(value); // Convert to string for validation
 
       if (strValue.trim() === '' || strValue.length < 3) {
         newErrors[key as keyof SuppliersBondData] = `${key} is required and must be at least 3 characters long.`;
       }
     }
 
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0; // Returns true if no errors
   };

const calculateValidityDate = (fromDate: string, days: number) => {
  if (!fromDate) {
    return ''; // Handle empty fromDate
  }

  const date = new Date(fromDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error(`Invalid date provided: "${fromDate}"`);
    return ''; // Handle invalid date
  }

  date.setDate(date.getDate() + days);
  
  // Format the date as "May 10, 2025"
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Suppliers Bond Guarantee</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    value={data.date}
                   onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>
              </div>
              
          <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">        
                    Address
                  </label>
                  <input
                    type="address"
                    value={data.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
        
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">TO (Recipient)</label>
                <input
                  type="text"
                  placeholder="Enter recipient name/company"
                  value={data.toName}
                   onChange={(e) => handleChange('toName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.toName && <p className="text-red-500">{errors.toName}</p>}
              </div>
        
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Building className="h-4 w-4" />
                  <span>Client Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={data.clientName}
                   onChange={(e) => handleChange('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.clientName && <p className="text-red-500">{errors.clientName}</p>}
              </div>
        
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4" />
              <span>Bond Amount</span>
            </label>
            <input
              type="number"
              placeholder="Enter bond amount"
              value={data.bondAmount}
              onChange={(e) => {
                const value = e.target.value;
                handleChange('bondAmount', value ? parseFloat(value) : 0); // Convert to number or set to 0 if empty
                validateField('bondAmount', value); // Validate the field on change
              }}
              min="100" // Minimum value to enforce at least 3 digits
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.bondAmount && <p className="text-red-500">{errors.bondAmount}</p>}
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
                 <h3 className="text-lg font-medium text-gray-800">Validity Period</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                     <Calendar className="h-4 w-4" />
                     <span>From Date</span>
                   </label>
                   <input
                     type="date"
                     value={data.fromDate}
                      onChange={handleFromDateChange}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                     {errors.fromDate && <p className="text-red-500">{errors.fromDate}</p>}
                 </div>
         
                 <div className="space-y-2">
           <label className="text-sm font-medium text-gray-700">Number of Days</label>
           <input
             type="number"
             value={data.numberOfDays}
             onChange={(e) => handleDaysChange(e)} // Make sure to handle changes
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             placeholder="Enter number of days"
           />
           {errors.numberOfDays && <p className="text-red-500">{errors.numberOfDays}</p>}
         </div>
         
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Contract Purpose</label>
                 <input
                   type="text"
                   placeholder="Enter contract purpose"
                   value={data.contractPurpose}
                    onChange={(e) => handleChange('contractPurpose', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                   {errors.contractPurpose && <p className="text-red-500">{errors.contractPurpose}</p>}
         
               </div>
         
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bid No.</label>
                  <input
                    type="text"
                    placeholder="Enter bid number"
                    value={data.bidNo}
              onChange={(e) => handleChange('bidNo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      
    {errors.bidNo && <p className="text-red-500">{errors.bidNo}</p>}
        </div>
        
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Bid Date</label>
                    <input
                      type="date"
                      value={data.bidDate}
                       onChange={handleFromDateChange}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>
                </div>
        
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  value={data.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}
        
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Authorized Signatory 1</label>
                <input
                  type="text"
                  placeholder="Enter authorized signatory name"
                  value={data.authorizedSignatory}
                   onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.authorizedSignatory && <p className="text-red-500">{errors.authorizedSignatory}</p>}
                 <input
                  type="text"
                  placeholder="Enter authorized signatory position"
                  value={data.authorizedSignatoryPosition}
                  onChange={(e) => handleChange('authorizedSignatoryPosition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.authorizedSignatoryPosition && <p className="text-red-500">{errors.authorizedSignatoryPosition}</p>}
        
                <label className="text-sm font-medium text-gray-700">Authorized Signatory 2</label>
                <input
                  type="text"
                  placeholder="Enter authorized signatory name"
                  value={data.authorizedSignatory1}
                  onChange={(e) => handleChange('authorizedSignatory1', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.authorizedSignatory1 && <p className="text-red-500">{errors.authorizedSignatory1}</p>}
        
                  <input
                  type="text"
                  placeholder="Enter authorized signatory2 position"
                  value={data.authorizedSignatoryPosition1}
                 onChange={(e) => handleChange('authorizedSignatoryPosition1', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.authorizedSignatoryPosition1 && <p className="text-red-500">{errors.authorizedSignatoryPosition1}</p>}
              </div>
            </div>
            </div>
            </div>
          );
        };
        

export default SuppliersBondForm;