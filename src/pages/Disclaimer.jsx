import React from 'react';

function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Disclaimer</h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Original Content & Copyright</h2>
      <p className="mb-6">
        All content on <strong className="text-gray-900">appinfohub.com</strong> is original. The copyright for all app reviews and images belongs to our editorial team. Reproduction or redistribution without proper attribution is prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Compliance with Google Policies</h2>
      <p className="mb-6">
        All information on our website complies with the terms and conditions of Google Ads policies and the Google Unwanted Software policy. We follow these policies in the presentation and distribution of content and ads.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Device Safety</h2>
      <p className="mb-6">
        We do not perform any operations that alter your device or system settings. Using our website will not change any system settings on your phone.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Free Services & APK Integrity</h2>
      <p className="mb-6">
        All services provided on <strong className="text-gray-900">appinfohub.com</strong> are completely free. We only share original, virus‑free APK files of free apps and their corresponding app reviews. The APK files we provide are identical to the versions available on the Google Play Store and have not been modified. We will never request payment‑related information such as card numbers or passwords on our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Advertising & Third‑Party Content</h2>
      <p className="mb-6">
        We do not collaborate with advertisers. Advertisements shown on our site are served automatically by Google Ads based on user browsing behavior. <strong className="text-gray-900">appinfohub.com</strong> is not responsible for the content, accuracy, or display format of any third‑party advertisements.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Contact Us</h2>
      <p className="mb-6">
        If you have trouble going through our online content, please do not hesitate to contact us via{' '}
        <a href="mailto:support@appinfohub.com" className="text-blue-600 hover:underline font-medium">
          support@appinfohub.com
        </a>
        .
      </p>
    </div>
  );
}

export default Disclaimer;