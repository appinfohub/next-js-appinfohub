"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      {/* Container with standard max width to align perfectly with your content */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-12 flex flex-col gap-6">
        
        {/* Logo - increased height from h-9 to h-12 for better visibility */}
        <div className="flex items-center">
          <img
            src="/appinfohublogo.png"
            alt="AppInfoHub Logo"
            className="h-12 w-auto object-contain" 
          />
        </div>

        {/* Vertical links - text size increased to text-base (16px) with comfortable vertical gaps */}
        <nav className="flex flex-col space-y-3.5 text-base text-gray-800 font-medium">
          <Link href="/about-us" className="hover:text-blue-600 transition w-fit">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-blue-600 transition w-fit">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-blue-600 transition w-fit">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="hover:text-blue-600 transition w-fit">
            Disclaimer
          </Link>
        </nav>

        {/* Copyright - text size increased to 14px (text-sm) with standard spacing */}
        <div className="text-sm text-gray-500 pt-2">
          <span>Copyright {new Date().getFullYear()} © AppInfoHub. All Rights Reserved.</span>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;