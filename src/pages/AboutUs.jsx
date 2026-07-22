import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 font-sans min-h-screen">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
        About Us
      </h1>

      {/* Main Intro */}
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        Welcome to <strong className="text-gray-900">AppInfoHub</strong>. We provide detailed information, reviews, update logs, ratings, and insights on the top trending free apps and games across mobile and desktop platforms.
      </p>

      {/* Content Copyright */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        Original Reviews
      </h2>
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        All app reviews and content published on this platform are written by our editorial team. Copying or publishing our content without attribution is strictly prohibited.
      </p>

      {/* Safety & Pricing */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        Safe & 100% Free
      </h2>
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        Every service provided on <strong className="text-gray-900">appinfohub.com</strong> is completely free. We only list original, unmodified, and virus-free APK files identical to those on the Google Play Store. We will <strong className="text-gray-900">never</strong> ask for payment details, credit card numbers, or passwords.
      </p>

      {/* Disclaimer */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        Disclaimer
      </h2>
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        All trademarks, logos, and brand assets displayed belong to their respective owners. AppInfoHub is an independent catalog and is not affiliated with or endorsed by any third-party app developers.
      </p>

      {/* Contact */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        Contact Us
      </h2>
      <p className="text-base leading-relaxed text-gray-700 mb-8">
        If you have any questions, suggestions, or need to report an issue, feel free to email us at:{' '}
        <a 
          href="mailto:support@appinfohub.com" 
          className="text-blue-600 hover:underline font-semibold"
        >
          support@appinfohub.com
        </a>
      </p>

      {/* Breadcrumb Navigation Footer */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-6 border-t border-gray-100">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-medium">About Us</span>
      </div>

    </div>
  );
}

export default AboutUs;