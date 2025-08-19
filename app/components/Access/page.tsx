'use client';


import AapiServices from "@/app/ExportAApi";
import { useEffect, useState } from "react";
import Navbar from "../navbar";

interface User {
  Id: string;
  username: string; // Keeping as string to match your API response
  Name: string;
  Dept: string;
}

interface SavedUser {
  _id: string; // User ID from the API response
  userName: string;
  fullName: string;
  position: string;
  authority: number;
  isLocked: number; // Added isLocked field
}

const Access = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isApprover, setIsApprover] = useState<boolean>(false);
  const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]); // Updated type

  useEffect(() => {
    // Fetch users from backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await AapiServices.get("/getUser"); // Ensure correct endpoint
        setUsers(response.data); // Populate users for dropdown
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Error fetching users. Please try again later."); // User-friendly error message
      }
    };

    // Fetch saved users from the registered users API
    const fetchSavedUsers = async () => {
      try {
        const response = await AapiServices.get("/registeredUsers");
        setSavedUsers(response.data); // Set the saved users data
      } catch (error) {
        console.error("Failed to fetch saved users:", error);
        alert("Error fetching saved users. Please try again later.");
      }
    };

    fetchUsers();
    fetchSavedUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSave = async () => {
    if (!selectedUserId) return;

    const user = users.find(u => u.Id === selectedUserId); // Match selected user
    if (!user) return; // Safety check

    const newEntry: SavedUser = {
      _id: "", // Placeholder for _id, will be fetched from the API
      userName: user.Id,
      fullName: user.Name,
      position: user.Dept,
      authority: isApprover ? 1 : 2,
      isLocked: 0 // Default value
    };

    try {
      const response = await AapiServices.post('newusers', newEntry);
      console.log('Data to be sent:', newEntry);
      if (response.status !== 200) {
        alert('Failed to send data to the backend');
        throw new Error('Failed to send data to the backend');
      } else {
        alert('Saved successfully');
        console.log('Saved successfully', response.data);
        // Update savedUsers with the response
        setSavedUsers(prev => [...prev, { ...newEntry, _id: response.data._id }]);
      }

      setSelectedUserId("");
      setIsApprover(false);
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.');
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
            <Navbar />
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Access Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search User</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.Id} value={user.Id}>
                {user.Name} ({user.Dept})
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isApprover}
            onChange={(e) => setIsApprover(e.target.checked)}
            id="approver"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="approver" className="text-sm text-gray-700">Is Approver</label>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Grid/Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Saved Users</h2>
        {savedUsers.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Dept</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Is Approver</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Lock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {savedUsers.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.userName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.fullName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.position}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.authority === 1 ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.isLocked === 1 ? 'Locked' : 'Unlocked'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">No users saved yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Access;