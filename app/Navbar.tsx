"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <header
        style={{ backgroundColor: "#025AA2" }}
        className="text-white shadow-lg"
      >
        <div className="container mx-auto py-2">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex ml-0 items-center space-x-3">
              {/* If you want the lucide icon instead of logo, uncomment below */}
              {/* <Shield className="h-8 w-8" color="#ffd600" /> */}
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
              <Link
                href="/"
                className="hover:text-yellow-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/Login"
                className="hover:text-yellow-300 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
