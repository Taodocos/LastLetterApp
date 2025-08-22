'use client';

import apiServices from "@/app/ExportApi";
import Navbar from "@/app/Navbar";
import { useEffect, useState } from "react";

interface Letter {
    _id: string;
    refNo: string;
    clientName: string;
    authorizedSignatory: string;
    guaranteeAmount: number;
    bidNumber: string;
    bidAmount: number;
    contractPurpose: string;
    status: number;
}

const ReportPage = () => {
    const [gridData, setGridData] = useState<Letter[]>([]);
    const [filteredData, setFilteredData] = useState<Letter[]>([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiServices.get('getLetter'); // Replace with your API endpoint
                setGridData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const results = gridData.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(filter.toLowerCase())
            )
        );
        setFilteredData(results);
    }, [filter, gridData]);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <Navbar />
          
            <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Saved Letters</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filter any column..."
                        className="px-4 py-2 border border-gray-400 rounded-md w-40% bg-white text-black"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Ref No</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Client Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Authorized Signatory</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Guarantee Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Bid Number</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Bid Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Contract Purpose</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-400">
                            {currentItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-300 transition-all duration-200">
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.refNo}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.clientName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.authorizedSignatory}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.guaranteeAmount}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.bidNumber}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.bidAmount}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.contractPurpose}</td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReportPage;