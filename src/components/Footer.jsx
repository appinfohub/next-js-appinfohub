'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gradient-to-t from-gray-100 to-white border-t mt-12 pt-8 pb-4 text-gray-700">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
      <div className="w-full md:w-[30%] flex flex-col items-start text-left mb-6 md:mb-0">
        <img src="/appinfohublogo.png" alt="AppInfoHub.com Logo" className="h-14 w-auto mb-2" />
        <span className="text-xs">&copy; {new Date().getFullYear()} AppInfoHub.com. All rights reserved.</span>
      </div>
      <div className="w-full md:w-[30%] flex flex-col mb-6 md:mb-0">
        <span className="font-semibold text-gray-800 mb-2 block text-base">Company</span>
        <ul className="flex flex-wrap gap-4 md:flex-col md:gap-2 text-sm">
          <li><Link href="/about-us" className="hover:text-blue-700 transition">About Us</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/contact-us" className="hover:text-blue-700 transition">Contact Us</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/privacy-policy" className="hover:text-blue-700 transition">Privacy Policy</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/cookie-policy" className="hover:text-blue-700 transition">Cookie Policy</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/terms-of-service" className="hover:text-blue-700 transition">Terms of Service</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/disclaimer" className="hover:text-blue-700 transition">Disclaimer</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/accessibility-statement" className="hover:text-blue-700 transition">Accessibility</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/dmca-policy" className="hover:text-blue-700 transition">DMCA Policy</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/editorial-transparency" className="hover:text-blue-700 transition">Editorial Transparency</Link></li>
        </ul>
      </div>
      <div className="w-full md:w-[30%] flex flex-col">
        <span className="font-semibold text-gray-800 mb-2 block text-base">Quick Links</span>
        <ul className="flex flex-wrap gap-4 md:flex-col md:gap-2 text-sm">
          <li><Link href="/apps/entertainment" className="hover:text-blue-700 transition">Entertainment Apps</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/apps/finance" className="hover:text-blue-700 transition">Finance Apps</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/apps/tools" className="hover:text-blue-700 transition">Tools Apps</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/apps/games" className="hover:text-blue-700 transition">Games</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          {/* <li><Link href="/tools/zip-unzip" className="hover:text-blue-700 transition">Zip & Unzip</Link></li>
          <li className="block md:hidden text-gray-400" aria-hidden="true">|</li>
          <li><Link href="/tools/qr-tool" className="hover:text-blue-700 transition">QR Code Scanner & Generator</Link></li> */}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;


