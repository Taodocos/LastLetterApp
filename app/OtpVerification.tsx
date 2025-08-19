// OtpVerificationPage.tsx

'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AapiServices from "./ExportAApi";

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [phone, setPhone] = useState<string | null>(null);

    useEffect(() => {
        const storedPhone = sessionStorage.getItem('phone');
        console.log('Stored Phone:', storedPhone); // Debugging log
        setPhone(storedPhone);
    }, []);

    const handleOtpVerify = async () => {
        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        console.log('OTP:', otp);
        console.log('Phone:', phone);

        try {
            const response = await AapiServices.post('verifyOtp', { otp, phone });
            console.log('API Response:', response.data);

            if (response.status === 200) {
                alert("OTP verified successfully!");
                router.push('/components/Letters'); // Redirect upon successful verification
            } else {
                alert("OTP verification failed. Please try again.");
            }
        } catch (err) {
            console.error('Error Details:', err);
            alert("An error occurred during OTP verification. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg p-16 space-y-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-center text-gray-700">Verify OTP</h2>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="mt-6">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-600">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-1 border mb-4 p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter the OTP"
                        />
                        <button
                            onClick={handleOtpVerify}
                            className="w-full px-4 py-3 font-semibold text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationPage;