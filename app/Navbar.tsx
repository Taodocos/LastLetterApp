"use client";

import { Shield, User, ChevronDown, LogOut, Hash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const refreshFromSession = () => {
      const sessionId = sessionStorage.getItem("sessionId");
      setIsLoggedIn(!!sessionId);
      setFullName(sessionStorage.getItem("Uname") || "");
      setUserId(sessionStorage.getItem("userId") || "");
    };
    refreshFromSession();

    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    window.addEventListener("focus", refreshFromSession);
    window.addEventListener("auth:login", refreshFromSession as EventListener);
    window.addEventListener("auth:logout", refreshFromSession as EventListener);
    return () => {
      document.removeEventListener("click", onClickOutside);
      window.removeEventListener("focus", refreshFromSession);
      window.removeEventListener(
        "auth:login",
        refreshFromSession as EventListener
      );
      window.removeEventListener(
        "auth:logout",
        refreshFromSession as EventListener
      );
    };
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("authority");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("Uname");
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("avatarUrl");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
    } finally {
      setIsLoggedIn(false);
      setMenuOpen(false);
      router.push("/Login");
    }
  };

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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="hover:text-yellow-300 transition-colors"
              >
                Home
              </Link>
              {!isLoggedIn ? (
                <Link
                  href="/Login"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Login
                </Link>
              ) : (
                <div className="relative z-2" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-blue-800 ring-white shadow overflow-hidden bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700">
                      <User className="h-5 w-5 text-white" />
                    </span>
                    <span className="max-w-[160px] truncate text-white/90 ">
                      {mounted ? fullName || fullName || "Profile" : "Profile"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white text-gray-800 shadow-lg ring-1 ring-black/5">
                      <div className="px-4 py-3 border-b">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow overflow-hidden bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700">
                            <User className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {fullName || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              ID: {fullName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        {/* <div className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                          <Hash className="h-4 w-4 text-gray-500" />
                          <span className="truncate">{userId || "-"}</span>
                        </div> */}
                        <div className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="truncate">{fullName || "-"}</span>
                        </div>
                      </div>
                      <div className="border-t">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
