import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, ShieldCheck } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 font-sans min-h-screen">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-blue-600" />
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last updated: January 2026
        </p>
      </div>

      {/* Intro */}
      <p className="text-base leading-relaxed text-gray-700 mb-6">
        This Privacy Policy explains how <strong className="text-gray-900">AppInfoHub</strong> collects, uses, and protects your personal information when you visit and interact with <strong className="text-gray-900">appinfohub.com</strong>.
      </p>

      {/* Information Collection */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        1. Information We Collect
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-3">
        When you browse AppInfoHub, we automatically gather non-personally identifiable technical data to optimize your browsing experience. This includes:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-6">
        <li>Device model and display dimensions</li>
        <li>Web browser type and operating system</li>
        <li>General geographical location (country and city level)</li>
        <li>Anonymous site usage logs and preferences via cookies</li>
      </ul>

      {/* How We Use Your Information */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        2. How We Use Your Data
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-3">
        We use the collected information solely to provide a seamless catalog experience, including:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-6">
        <li>Optimizing web layout and readability for your mobile or desktop device</li>
        <li>Delivering relevant application and game content suited to your region</li>
        <li>Analyzing site traffic and performance to improve navigation</li>
      </ul>

      {/* Cookies Policy */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        3. Cookies & Tracking Technologies
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-3">
        Cookies are small text files stored on your device when you load our website. AppInfoHub utilizes:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-4">
        <li><strong>Functionality Cookies:</strong> To remember your site preferences and language options.</li>
        <li><strong>Analytics & Advertising Cookies:</strong> Provided by third-party partners to show relevant ads and measure traffic engagement based on general usage patterns.</li>
      </ul>
      <p className="text-sm leading-relaxed text-gray-700 mb-6">
        You can choose to disable or clear cookies at any time through your browser settings. Please note that disabling cookies may affect certain visual features on our site.
      </p>

      {/* Data Protection Rights */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        4. Your Data Protection Rights
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-3">
        Every user is entitled to full awareness of their data privacy rights. Under applicable regulations, you have:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-6">
        <li><strong>The right to access:</strong> Request copies of personal records held about you.</li>
        <li><strong>The right to rectification:</strong> Request correction of inaccurate information.</li>
        <li><strong>The right to erasure:</strong> Request removal of personal data under specific conditions.</li>
        <li><strong>The right to restrict processing:</strong> Request limits on how we process your data.</li>
      </ul>

      {/* External Websites */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        5. External Links & Third-Party Sites
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-6">
        Our pages may contain links to external websites or app store listings. AppInfoHub does not control these external services. We recommend reviewing the privacy policies of any third-party websites you visit.
      </p>

      {/* Contact */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        6. How to Contact Us
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-8">
        If you have questions regarding this Privacy Policy or wish to exercise your data privacy rights, please reach out to us at:{' '}
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
        <span className="text-gray-900 font-medium">Privacy Policy</span>
      </div>

    </div>
  );
}

export default PrivacyPolicy;