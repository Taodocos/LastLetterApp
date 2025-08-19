import QRCode from 'qrcode';

// generateQRCode.ts


export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const url = await QRCode.toDataURL(data, {
      width: 100,
      margin: 1,
      color: { dark: '#0c669aff', light: '#FFFFFF' }
    });
    return url;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

