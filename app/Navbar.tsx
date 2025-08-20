"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this as needed

  const handleLoginLogout = () => {
    // Toggle login state
    setIsLoggedIn(prev => !prev);
  };

  return (
    <>
      {/* Header Section */}
      <header style={{ backgroundColor: "#025AA2" }} className="text-white shadow-lg">
        <div className="container mx-auto py-2">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex ml-0 items-center space-x-3">
              <Image
                src="/images/amh.png"
                alt="Amhara Bank Logo"
                width={80}
                height={80}
                className="mr-6"
              />
              <div>
                <h1 className="text-2xl font-bold">Amhara Bank</h1>
                <p className="text-blue-200 text-sm">Digital Letter System</p>
              </div>
            </div>

            {/* Right Section - Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-yellow-300 transition-colors">
                Home
              </Link>
              <Link
                href="/Login"
                className="hover:text-yellow-300 transition-colors"
                onClick={handleLoginLogout}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;