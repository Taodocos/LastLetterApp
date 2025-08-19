// OtpVerificationPage.tsx

'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AapiServices from "../ExportAApi";

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for each OTP digit
    const [error] = useState('');
    const [phone, setPhone] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedPhone = sessionStorage.getItem('phone');
        console.log('Stored Phone:', storedPhone); // Debugging log
        setPhone(storedPhone);
    }, []);

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]$/.test(value) || value === '') { // Allow only single digits or empty
            const newOtp = [...otp];
            newOtp[index] = value; // Update the specific index
            setOtp(newOtp);

            // Move to the next input if a valid digit is entered
            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }

            // Automatically verify if the last input is filled
            if (index === otp.length - 1 && value) {
                verifyOtp(newOtp.join('')); // Join the array to form the complete OTP
            }
        }
    };

    const verifyOtp = async (otpInput: string) => {
        if (!otpInput) {
            alert("Please enter the OTP");
            return;
        }

        console.log('OTP:', otpInput);
        console.log('Phone:', phone);

        try {
            const response = await AapiServices.post('verifyOtp', { otp: otpInput, phone });
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

    const resendOtp = async () => {
        if (!phone) {
            alert("No phone number found.");
            return;
        }

        setLoading(true);
        try {
            const response = await AapiServices.post('sendOtp', { phone });
            console.log('Resend OTP Response:', response.data);

            if (response.status === 200) {
                alert("OTP has been resent to your phone.");
            } else {
                alert("Failed to resend OTP. Please try again.");
            }
        } catch (err) {
            console.error('Error Details:', err);
            alert("An error occurred while resending the OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg p-16 space-y-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-center text-gray-700">Verify OTP</h2>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="flex justify-center space-x-2 mt-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`otp-${index}`} // Unique ID for each input
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onFocus={(e) => e.target.select()} // Select the text when focused
                                maxLength={1} // Limit to one character
                                className="w-12 h-12 text-center border rounded focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <button
                            onClick={resendOtp}
                            className={`w-full px-4 py-3 font-semibold text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] focus:outline-none focus:ring focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationPage;