import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, FileText } from 'lucide-react';

function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 font-sans min-h-screen">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-7 h-7 text-blue-600" />
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last updated: January 2026
        </p>
      </div>

      {/* Intro */}
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        Welcome to <strong className="text-gray-900">AppInfoHub</strong>. By accessing or using our website (<strong className="text-gray-900">appinfohub.com</strong>), you agree to comply with and be bound by the following Terms of Service.
      </p>

      {/* Proprietary Rights */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        1. Proprietary Rights
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-6">
        AppInfoHub owns, solely and exclusively, all rights, title, and interest in and to the platform, including its visual layout, look and feel, database compilation, editorial content, and underlying source code. Copying, modifying, or redistributing our site assets without written permission is strictly prohibited.
      </p>

      {/* Trademarks */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        2. Trademarks & Brand Assets
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-6">
        The trademarks, logos, app icons, and service marks displayed on AppInfoHub are the property of their respective owners. Their display on our catalog is strictly for informational and navigational purposes and does not imply endorsement or affiliation.
      </p>

      {/* Terms of Use */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        3. Acceptable Use
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-3">
        When utilizing our platform, you agree to:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-6">
        <li>Use app links and content solely for personal, non-commercial purposes.</li>
        <li>Refrain from automated scraping or disrupting server infrastructure.</li>
        <li>Respect intellectual property rights and original content attribution.</li>
      </ul>

      {/* Disclaimer of Warranties */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        4. Limitation of Liability
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-6">
        AppInfoHub provides all services, reviews, and links on an "as-is" basis. While we strive to verify all listing safety, we do not warrant that service will be uninterrupted or that third-party applications will perform without error on your device.
      </p>

      {/* Contact */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        5. How to Contact Us
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-8">
        If you have questions regarding our Terms of Service or intellectual property rights, please feel free to reach out to our legal team at:{' '}
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
        <span className="text-gray-900 font-medium">Terms of Service</span>
      </div>

    </div>
  );
}

export default TermsOfService;