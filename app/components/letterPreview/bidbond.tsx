"use client";
import React, {  } from "react";
import { BidbondFormData } from "../letterForm/bidbond";
import { toWords } from "number-to-words";

interface BidbondPreviewProps {
  data: BidbondFormData;
  qrCodeUrl: string;
}

const BidbondPreview: React.FC<BidbondPreviewProps> = ({ data, qrCodeUrl }) => {
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
      {/* Header */}
      

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
      <div className="flex justify-between mb-8">
        <div></div>
        <div className="text-right">
          <p>
            Ref. No: 
            <span className="font-bold">{data.refNo || "_______________"}</span>
          </p>
          <p>
            Date <span className="font-bold">{formatDate(data.date)}</span>
          </p>
        </div>
      </div>

      {/* TO */}
      <div className="mb-8">
        <p>
          <span className="font-bold">
            TO:  {capitalizeWords( data.toName || "_______________________________________________")}
          </span>
        </p>
      </div>
       <div className="mb-8 font-bold">
        <p>Address: {data.address || '______________________'}</p>
      </div>

      {/* Title */}
      <div className="text-center mb-6 ">
        <h2 className="text-lg font-bold">Bid Bond Guarantee </h2>
      </div>

      {/* Content */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p>
          By order and for account of our client  <span className="font-bold">
            {capitalizeWords(data.clientName ||
              "__________________________________")}
          </span>  we hereby issue in your favor our Bid Bond Guarantee for the sum of
         <span className="font-bold">  {data.bondAmount ? formatNumber(data.bondAmount) : "_______________"} ({bondAmountInWords}) </span>
          to be valid up to <span className="font-bold">  {formatDate(data.validityDate || '___________')}  </span>
        </p>

        <p>
          The purpose of this Bid Bond Guarantee is to enable you to enter into
          a contract with the client for{" "}
          <span className="font-bold">
            {data.contractPurpose || "_______________"}
          </span>{" "}
          as per your invitation to bid No{" "}
          <span className="font-bold">{data.bidNo || "_______________"} </span>
          dated <span className="font-bold">{formatDate(data.bidDate) } </span>.
        </p>

        <p>
          According to this Bid Bond Guarantee , we unconditionally undertake to
          pay you the sum not exceeding {data.currency }{" "}
          <span className="font-bold">
                       {data.bondAmount ? formatNumber(data.bondAmount) : "_______________"}

          </span>{" "}
          <span className="font-bold">
            ({bondAmountInWords})
          </span>{" "}
          upon your w ritten demand specifying that our client, failed to supply
          the{" "}
          <span className="font-bold">
            {data.contractPurpose || "_______________"}
          </span>{" "}
          as per contract and if your claim is presented to us with in the
          validity date.
        </p>

        <p>
          However, this Bid Bond Guarantee will automatically become null and
          void just after the above validity date <span className="font-bold"> {formatDate(data.validityDate || '___________')}  </span>
          year and any claim presented thereafter will not be entertained by our
          Bank and it will be cancelled whether the original Suppliers Bond/
          Guarantee is returned to us or not.
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

export default BidbondPreview;
