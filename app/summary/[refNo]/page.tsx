import apiServices from '@/app/ExportApi';
import SummaryDisplay from '@/component/SummaryDisplay';

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

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
};

async function fetchLetterData(refNo: string): Promise<LetterData | null> {
  try {
    const response = await apiServices.post('letterByRef', { refNo });
    const dataArray = response.data;
    if (!dataArray?.length) return null;

    const data = dataArray[0];
    return {
      refNo: data.refNo,
      letterType: data.letterType,
      date: formatDate(data.dateIssued),
      toName: data.toCompanyName,
      address: data.address,
      clientName: data.clientName,
      bondAmount: Number(data.guaranteeAmount),
      currency: data.currency,
      validityMonth: String(data.bidExpiredMonth),
      validityDate: String(data.bidExpiredDay),
      validityYear: String(data.bidExpiredYear),
      contractPurpose: data.contractPurpose,
      bidNo: data.bidNumber,
      bidDate: formatDate(data.bidDate),
      bankName: data.fromCompany,
      authorizedSignatory: data.authorizedSignatory,
      qrCodeUrl: '', // Set if needed
      secretCode: data.refNoSecretKey
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Page({ params }: { params: { refNo: string } }) {
  const data = await fetchLetterData(params.refNo);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-10">
        <p className="text-xl text-red-600">
          No data found for reference number: {params.refNo}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <SummaryDisplay data={data} />
    </main>
  );
}