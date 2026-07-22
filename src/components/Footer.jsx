"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 mt-12 py-10 font-sans">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left Column: Logo, Copyright & Horizontal Nav Links */}
        <div className="flex flex-col gap-6">
          
          {/* Logo & Copyright Inline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <img
              src="/appinfohublogo.png"
              alt="AppInfoHub Logo"
              className="h-9 w-auto object-contain" 
            />
            <span className="text-sm text-gray-500">
              Copyright © {new Date().getFullYear()} AppInfoHub. All rights reserved.
            </span>
          </div>

          {/* Horizontal Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-gray-700 font-semibold">
            <Link href="/about-us" className="hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link href="/guidance" className="hover:text-blue-600 transition-colors">
              Guidance
            </Link>
            <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>

        {/* Right Column: Company Tagline Branding */}
        <div className="flex flex-col text-left md:text-right">
          <h4 className="text-sm font-bold text-gray-800">
            APPINFOHUB
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            We Build Online Service With Best User Experience
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;