"use client";
import { FileText, Settings } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Guarantee Letter 
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/components/Letters"
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>EN</span>
          </a>
          <a
            href="/amharic"
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>AM</span>
          </a>
           <a
            href="/Access"
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
          {/* <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
