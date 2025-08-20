"use client";
import React, {} from "react";
import { AmharicLetter3Data } from "../amhLetterForm/ekaAkrbot";
import { toWords } from "number-to-words";

interface AmharicLetter3PreviewProps {
  data: AmharicLetter3Data;
  qrCodeUrl: string;
}

const AmharicLetter3Preview: React.FC<AmharicLetter3PreviewProps> = ({ data, qrCodeUrl }) => {
const formatDate = (dateString: string) => {
      if (!dateString) return '_______________';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
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
      style={{ fontFamily: 'Times, serif' }}
    >
      
    

   
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
        <p className="text-red-500"></p>
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
         {capitalizeWords( data.toName || '_______________________________________________')}</p>
        <div className="ml-4 font-bold">
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
          <span className="font-bold"> { capitalizeWords( data.clientName || '_______________________________________________')} </span>

          የተባሉ የዋስትና ደንበኛችን በሰጡን የትዕዛዝ ፈቃድ መሰረት ይህን የብር<span className="font-bold"> {data.currency} {data.bondAmount ? formatNumber(data.bondAmount) : "_______________"}
          ({bondAmountInWords}) </span>  የዕቃ አቅርቦት ዋስትና  እስከ<span className="font-bold"> {formatDate(data.validityDate || '___________')}  </span>
          ድረስ የሚቆይ መስጠታችንን በአክብሮት እናሳውቃለን፡፡ 

        </p>


        <p>
          የዚህ የዕቃ አቅርቦት ዋስትና አላማ ደንበኛችን በቁጥር  <span className="font-bold"> {data.bidNo || '_______________'}  በቀን {formatDate(data.bidDate)} </span>
          ዓ.ም ባወጣችሁት የጨረታ ማስታወቂያ መሰረት በጨረታው እንዲሳተፉ ለማድረግ ነው፡፡
        </p>

        <p>
         በዚህ የዕቃ አቅርቦት ዋስትና  መሰረት ደንበኛችን በውላችሁ መሰረት ባያቀርቡላችሁ ያለምንም 
         ቅድመ ሁኔታ ደንበኛችን ግዴታቸውን አለመወጣታቸውን በፅሁፍ በመግለፅ በምታቀርቡልን የክፍያ ጥያቄ መሰረት እስከ 
         <span className="font-bold"> {data.currency }{data.bondAmount ? formatNumber(data.bondAmount) : "_______________"} ({bondAmountInWords}) </span>
          ያህል የሆነና ከዚህ መጠን ያልበለጠ ገንዘብ ወዲያውኑ ለመክፈል ተስማምተናል፡፡
        </p>

        <p>
        ሆኖም ይህ የዕቃ አቅርቦት ዋስትና ከዚህ በላይ ከተገለፀው ቀን፣ ወር እና ዓ.ም በኋላ ቀሪና ፈራሽ ይሆናል፡፡ 
        ከዚህ ጊዜ በኋላ የሚቀርብ የይከፈለኝ ጥያቄ በእኛ በኩል የማይስተናገድና የዚህ የዕቃ አቅርቦት ዋስትና ዋናው(original) ቢመለስልንም ባይመለስልንም ቀሪና ዋጋ የማይኖረው ሆኗል፡፡  
        በዚህ የዕቃ አቅርቦት ዋስትና መሰረት የሚከፈለው ገንዘብ መጠን በምንም አይነትና ሁኔታ ከዚህ በላይ ከተገለፀው የገንዘብ መጠን ሊበልጥ/ሊያልፍ አይችልም፡፡  

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

export default AmharicLetter3Preview;
