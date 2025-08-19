"use client";
import React from "react";
import { PerformanceBGData } from "../letterForm/PerformanceBG";
import { toWords } from "number-to-words";

interface PerformanceBGPreviewProps {
  data: PerformanceBGData;
  qrCodeUrl: string;
}

const PerformanceBGPreview: React.FC<PerformanceBGPreviewProps> = ({
  data,
  qrCodeUrl,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "_______________";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

    const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
 const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

const bondAmountInWords = data.bondAmount ? toWords(data.bondAmount) : '_______________';

  return (
    <div
      id="letter-content"
      className="bg-white p-8 shadow-lg min-h-[800px] max-w-4xl mx-auto"
      style={{ fontFamily: "Times, serif" }}
    >
    

      {qrCodeUrl ? (
        <div className="flex justify-end mb-4">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-16 h-16"
            onError={() => console.error("QR Code image failed to load")}
          />
        </div>
      ) : (
        <p className="text-red-500"></p>
      )}

      {/* Reference and Date */}
      <div className="flex justify-between mb-8 font-bold">
        <div></div>
        <div className="text-right">
          <p>Ref. No: {data.refNo || "_______________"}</p>
          <p>Date {formatDate(data.date)}</p>
        </div>
      </div>

      {/* TO */}
      <div className="mb-8 font-bold">
        <p>
          TO: {capitalizeWords(data.toName || "_______________________________________________")}
        </p>
      </div>

       <div className="mb-8 font-bold">
        <p>Address: {data.address || '______________________'}</p>
      </div>

      {/* Title */}
      <div className="text-center mb-6 ">
        <h2 className="text-lg font-bold">Performance Bond Guarantee</h2>
      </div>

      {/* Content */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p>
          By order and for account of our client<span className="font-bold">
            {capitalizeWords(data.clientName ||
              "__________________________________")}
          </span>
          we hereby issue in your favor our Performance Bond Guarantee Advance
          Payment Guarantee for the sum of
           <span className="font-bold"> {data.currency} {data.bondAmount ? formatNumber(data.bondAmount) : "_______________"} ({bondAmountInWords})
          
          to be valid up to{" "}<span className="font-bold"> {formatDate(data.validityDate || '___________')}  </span>
          </span>
        </p>

        <p>
          The purpose of this Performance Bond Guarantee Advance Payment
          Guarantee is to enable you to enter into a contract with the client
          for  <span className="font-bold"> {data.contractPurpose || "_______________"}  </span>as per your invitation
          to bid No  <span className="font-bold"> {data.bidNo || "_______________"} dated{" "}
          {formatDate(data.bidDate)}. </span>
        </p>

        <p>
          According to this Performance Bond Guarantee Advance Payment
          Guarantee, we unconditionally undertake to pay you the sum not
          exceeding <span className="font-bold">{data.currency}{" "}
          {data.bondAmount ? formatNumber(data.bondAmount) : "_______________"} ({bondAmountInWords})</span> upon your written demand
          specifying that our client, failed to supply the{" "}
         <span className="font-bold"> {data.contractPurpose || "_______________"}</span> as per contract and if
          your claim is presented to us with in the validity date.
        </p>

        <p>
          However, this Performance Bond Guarantee Advance Payment Guarantee
          will automatically become null and void just after the above validity
          date <span className="font-bold"> {formatDate(data.validityDate || '___________')}  </span> year and any claim presented
          thereafter will not be entertained by our Bank and it will be
          cancelled whether the original Suppliers Bond/ Guarantee is returned
          to us or not.
        </p>

        <p>
          Our total liability under this Guarantee is limited to and shall in no
          circumstance exceed the above sum.
        </p>
      </div>

      <div className="flex mt-16 font-bold">
    <div className="mr-8">                                                              
        <p className="mt-4">{data.authorizedSignatoryPosition || '_____________'} . {capitalizeWords(data.authorizedSignatory || '_______________')}</p>
         
        <p className="mt-2">{"_______________"}</p>
    </div>

    <div className="ml-8">                                                               
         <p className="mt-4">{data.authorizedSignatoryPosition1 || '_____________'} . {capitalizeWords(data.authorizedSignatory1 || '_______________')}</p>
       
        <p className="mt-2">{"_______________"}</p>
    </div>
</div>
    </div>
  );
};

export default PerformanceBGPreview;
