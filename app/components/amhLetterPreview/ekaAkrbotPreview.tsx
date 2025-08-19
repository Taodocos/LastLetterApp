"use client";
import React, {} from "react";
import { AmharicLetter3Data } from "../amhLetterForm/ekaAkrbot";

interface AmharicLetter3PreviewProps {
  data: AmharicLetter3Data;
  qrCodeUrl: string;
}

const AmharicLetter3Preview: React.FC<AmharicLetter3PreviewProps> = ({ data, qrCodeUrl }) => {
  console.log('QR Code URL in Preview:', qrCodeUrl);



  const formatDate = (dateString: string) => {
    if (!dateString) return "_______________";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
     <div
      id="letter-content"
      className="bg-white p-8 shadow-lg min-h-[800px] max-w-4xl mx-auto"
      style={{ fontFamily: "Times, serif", lineHeight: "1.6" }}
    >
      {/* Header */}
      <div className="text-center mb-8">
         <div className="w-16 h-16 bg-blue-600 mx-auto mb-4 flex items-center justify-center">
          <img src="/images/Picture1.png" alt="Logo" className="w-12 h-12" />
        </div>
        <h1 className="text-xl font-bold mb-4">አማራ ባንክ አ.ማ</h1>
      </div>



         {qrCodeUrl ? (
        <div className="flex justify-end mb-4">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-16 h-16"
            onError={() => console.error('QR Code image failed to load')}
          />
        </div>
      ) : (
        <p className="text-red-500">QR Code not generated yet.</p>
      )}


      {/* Reference and Date */}
      <div className="flex justify-between mb-8">
        <div></div>
        <div className="text-right">
          <p>ቁጥር: {data.refNo || "_______________"}</p>
          <p>ቀን {formatDate(data.date)}</p>
        </div>
      </div>

     
      {/* Recipient */}
      <div className="mb-8">
        <p>
          ለ{" "}
         <b> {data.toName ||
            "______________________________________"}</b>
        </p>
        <div className="ml-4">
          <p>
            አድራሻ{" "}
         <b> {data.address || "_______________"}</b>
          </p>
          </div>
      </div>

      {/* Subject */}
      <div className="text-center mb-6">
        <p className="font-bold underline">የዕቃ አቅርቦት ዋስትና </p>
      </div>

      {/* Content */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p>
          አቶ/ወሮ{" "}
          {data.clientName  ||
            "______________________________________"}{" "}
          የተባሉ የዋስትና ደንበኛችን በሰጡን የትዕዛዝ ፈቃድ መሰረት ይህን የብር {" "} {data.currency || 'Birr'} {data.bondAmount || '___________'}
          ({data.bondAmount || '_______________'}) የዕቃ አቅርቦት ዋስትና  እስከ {data.validityDate || '___________'} ቀን/ {data.validityMonth || '___________'} ወር/ {data.validityYear || '___________'} አመት.
          ድረስ የሚቆይ መስጠታችንን በአክብሮት እናሳውቃለን፡፡ 

        </p>


        <p>
          የዚህ የዕቃ አቅርቦት ዋስትና አላማ ደንበኛችን በቁጥር  {data.bidNo || '_______________'} በቀን {formatDate(data.bidDate)}{" "}
          ዓ.ም ባወጣችሁት የጨረታ ማስታወቂያ መሰረት በጨረታው እንዲሳተፉ ለማድረግ ነው፡፡
        </p>

        <p>
         በዚህ የዕቃ አቅርቦት ዋስትና  መሰረት ደንበኛችን በውላችሁ መሰረት ባያቀርቡላችሁ ያለምንም 
         ቅድመ ሁኔታ ደንበኛችን ግዴታቸውን አለመወጣታቸውን በፅሁፍ በመግለፅ በምታቀርቡልን የክፍያ ጥያቄ መሰረት እስከ 
         {data.currency || 'Birr'} {data.bondAmount || '_______________'} ({data.bondAmount || '_______________'}){" "}
          ያህል የሆነና ከዚህ መጠን ያልበለጠ ገንዘብ ወዲያውኑ ለመክፈል ተስማምተናል፡፡
        </p>

        <p>
        ሆኖም ይህ የዕቃ አቅርቦት ዋስትና ከዚህ በላይ ከተገለፀው ቀን፣ ወር እና ዓ.ም በኋላ ቀሪና ፈራሽ ይሆናል፡፡ 
        ከዚህ ጊዜ በኋላ የሚቀርብ የይከፈለኝ ጥያቄ በእኛ በኩል የማይስተናገድና የዚህ የዕቃ አቅርቦት ዋስትና ዋናው(original) ቢመለስልንም ባይመለስልንም ቀሪና ዋጋ የማይኖረው ሆኗል፡፡  
        በዚህ የዕቃ አቅርቦት ዋስትና መሰረት የሚከፈለው ገንዘብ መጠን በምንም አይነትና ሁኔታ ከዚህ በላይ ከተገለፀው የገንዘብ መጠን ሊበልጥ/ሊያልፍ አይችልም፡፡  

        </p>

      </div>

      {/* Footer */}
      <div className="mt-16">
        <p className="font-bold">አማራ ባንክ</p>
        <p className="mt-4">ስም {data.authorizedSignatory || "_______________"}</p>
        <p className="mt-2">
          የሃላፊ ፊርማዎች { "_______________"}
        </p>
      </div>
    </div>
  );
};

export default AmharicLetter3Preview;
