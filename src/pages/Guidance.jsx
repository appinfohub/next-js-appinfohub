import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 font-sans min-h-screen">
      
      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
        Disclaimer & App Removal Guide
      </h1>

      {/* Main Legal & Platform Disclaimer */}
      <section className="space-y-4 text-base leading-relaxed text-gray-700 mb-8">
        <p>
          <strong className="text-gray-900">AppInfoHub</strong> is an independent software directory and review platform. All product names, logos, trademarks, and registered brand assets featured or referred to on <strong className="text-gray-900">appinfohub.com</strong> belong to their respective copyright holders.
        </p>
        <p>
          AppInfoHub is not affiliated with, sponsored by, or endorsed by Google Play, Apple App Store, Microsoft, or any third-party app developer. All APK files shared on our platform are 100% original, untouched, and scanned for safety to ensure a secure user experience.
        </p>
      </section>

      {/* App Uninstallation Instructions */}
      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          How to Uninstall Apps from Your Devices
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          If you wish to remove an application or game from your phone, follow the step-by-step instructions below for your operating system:
        </p>

        {/* Android */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Uninstalling on Android
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Open the <strong>Settings</strong> app on your device.</li>
            <li>Select <strong>Apps</strong> (or <strong>Apps & Notifications</strong> / <strong>Application Manager</strong>).</li>
            <li>Scroll through the list and tap the app you want to delete.</li>
            <li>Tap <strong>Uninstall</strong>, then tap <strong>OK</strong> to confirm.</li>
          </ol>
        </div>

        {/* iOS */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Uninstalling on iOS (iPhone / iPad)
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Locate the app icon on your Home Screen or in your App Library.</li>
            <li>Touch and hold the app icon until a menu pops up.</li>
            <li>Tap <strong>Remove App</strong>, then select <strong>Delete App</strong>.</li>
            <li>Tap <strong>Delete</strong> once more to confirm the removal.</li>
          </ol>
        </div>

        {/* Windows Phone */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Uninstalling on Windows Phone
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Go to your device's <strong>App List</strong> or <strong>Games List</strong>.</li>
            <li>Tap and hold the app you wish to remove until the options menu appears.</li>
            <li>Select <strong>Uninstall</strong> and confirm your choice when prompted.</li>
          </ol>
        </div>
      </div>

      {/* Support / Contact Section */}
      <div className="border-t border-gray-100 pt-6 mt-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Questions or DMCA Requests?
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          If you have questions regarding our content, privacy policies, or intellectual property rights, please feel free to contact our support team at:{' '}
          <a 
            href="mailto:support@appinfohub.com" 
            className="text-blue-600 hover:underline font-semibold"
          >
            support@appinfohub.com
          </a>
        </p>
      </div>

      {/* Breadcrumb Navigation Footer */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-6 border-t border-gray-100">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-medium">Disclaimer</span>
      </div>

    </div>
  );
}

export default Disclaimer;