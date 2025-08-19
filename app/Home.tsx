import { FileTextIcon, QrCodeIcon, ShieldIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Letter System
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate secure, professional guarantee letters with QR code
            verification for enhanced authenticity and trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div
            className="rounded-lg border-2 p-6 shadow-sm hover:shadow-lg transition-shadow bg-white"
            style={{ borderColor: "#fedc61" }}
          >
            <div className="text-center mb-4">
              <FileTextIcon
                className="h-12 w-12 mx-auto mb-4"
                color="#fedc61"
              />
              <h3 className="text-xl font-semibold" style={{ color: "#025AA2" }}>
                Professional Letters
              </h3>
            </div>
            <p className="text-center text-gray-600">
              Generate professionally formatted letters with all required legal
              and banking standards.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-lg border-2 p-6 shadow-sm hover:shadow-lg transition-shadow bg-white"
            style={{ borderColor: "#fedc61" }}
          >
            <div className="text-center mb-4">
              <QrCodeIcon className="h-12 w-12 mx-auto mb-4" color="#fedc61" />
              <h3 className="text-xl font-semibold" style={{ color: "#025AA2" }}>
                QR Code Security
              </h3>
            </div>
            <p className="text-center text-gray-600">
              Each letter includes a unique QR code for instant verification and
              authenticity confirmation.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="rounded-lg border-2 p-6 shadow-sm hover:shadow-lg transition-shadow bg-white"
            style={{ borderColor: "#fedc61" }}
          >
            <div className="text-center mb-4">
              <ShieldIcon className="h-12 w-12 mx-auto mb-4" color="#fedc61" />
              <h3 className="text-xl font-semibold" style={{ color: "#025AA2" }}>
                Secure Storage
              </h3>
            </div>
            <p className="text-center text-gray-600">
              All letters are securely stored and accessible through our
              verification system.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/components/Letters"
            className="inline-block bg-[#ffd600] text-black px-8 py-3 text-lg font-semibold rounded-md shadow-lg hover:opacity-90 transition-opacity"
          >
            Generate Letter
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
