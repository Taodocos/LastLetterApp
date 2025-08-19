// Login.tsx

'use client';
import {  useState } from "react";
import { useRouter } from "next/navigation";
import apiServices from "../ExportApi";
import Navbar from "../Navbar";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const loginData = { username, password };

        try {
            const response = await apiServices.post('login', loginData);
            console.log('API Response:', response.data);
            const apiResponse = response.data.response;

            if (response.status !== 200) {
                alert('Login failed');
            } else {
                sessionStorage.setItem('authority', apiResponse.authority.toString());
                sessionStorage.setItem('sessionId', apiResponse.sessionId);
                sessionStorage.setItem('userId', apiResponse.userId.toString());
                sessionStorage.setItem('Uname', apiResponse.Uname.toString());
                sessionStorage.setItem('phone', apiResponse.phone.toString());

                console.log('Stored in sessionStorage:', {
                    authority: apiResponse.authority,
                    sessionId: apiResponse.sessionId,
                    userId: apiResponse.userId,
                });

                router.push('/OtpVerification'); 
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg p-16 space-y-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-center text-gray-700">LOG IN</h2>
                    {loading && <p className="text-center text-blue-500">Loading...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="block w-full px-4 py-3 mt-1 border mb-4 p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-3 mt-1 border mb-4 p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-semibold text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
       
    );
};

export default Login;