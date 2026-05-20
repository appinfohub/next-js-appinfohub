
import React from 'react';
import AdsSection from '../components/AdsSection';


const overviewItems = [
  'What Are Cookies?',
  'How Do We Use Cookies?',
  'What Types of Cookies Do We Use?',
  'Necessary Cookies',
  'Analytics Cookies',
  'Interest-Based Advertising',
  'Third-Party Cookies',
  'How to Opt out of Cookies?',
  'Google Analytics Cookies Opt-out',
  'Other Cookies Controls',
  'Privacy Policy',
  'What Data Do We Collect?',
  'How Do We Use the Data?',
  'What Will We Do If Track Abuse Occurs?',
  'Property Claims',
  'Safety Concern',
  'Policy Change',
  'Contact Us',
];


const PrivacyPolicy = () => (
  <div className="w-full max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4 text-center">Privacy Policy</h1>
    <div className="my-8"><AdsSection /></div>
    <p className="text-gray-700 mb-4 text-sm text-center">Last Updated: February 2026</p>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <p>We may collect limited technical and usage-based information automatically when you access our website.</p>
      <h3 className="font-semibold mt-4">1.1 Automatically Collected Data</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Device type, model, and operating system</li>
        <li>Browser type, version, and language</li>
        <li>IP address (non-precise)</li>
        <li>Screen resolution and device identifiers</li>
        <li>Pages visited and time spent on each page</li>
        <li>Click patterns, scrolling, and navigation behavior</li>
        <li>Referring URLs</li>
        <li>General geographic region (city-level or country-level)</li>
      </ul>
      <p>This data helps us maintain site performance and improve user experience.</p>
      <h3 className="font-semibold mt-4">1.2 Cookies & Tracking Technologies</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Cookies</li>
        <li>Web beacons</li>
        <li>Pixel tags</li>
        <li>eTags</li>
        <li>Local storage technologies</li>
      </ul>
      <p>These tools help analyze traffic, personalize browsing, support security, and display relevant advertising. You can manage or block cookies at any time via your browser settings.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">2. Use of Collected Information</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Website Functionality: To operate, maintain, and improve site performance, navigation, and accessibility.</li>
        <li>Analytics: To analyze traffic patterns, measure engagement, and optimize content.</li>
        <li>Advertising: To display non-intrusive, interest-based ads served by trusted networks such as Google Ads.</li>
        <li>Communication: To send technical notices, service updates, and respond to user inquiries.</li>
        <li>Security: To detect, prevent, and address fraud, abuse, or harmful activities.</li>
      </ul>
      <p>We do not sell, rent, or trade personal data under any circumstances.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">3. Cookies Policy</h2>
      <h3 className="font-semibold mt-4">3.1 Types of Cookies We Use</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Necessary Cookies:</b> Enable core website functions and ensure smooth operation. Cannot be disabled.</li>
        <li><b>Analytics Cookies:</b> Used to understand how users interact with the website. We primarily use Google Analytics.</li>
        <li><b>Advertising Cookies:</b> Used by third-party ad networks to show relevant ads and measure performance.</li>
        <li><b>Third-Party Cookies:</b> Some cookies originate from external partners (e.g., Google Ads). We do not control these cookies.</li>
      </ul>
      <h3 className="font-semibold mt-4">3.2 How to Manage or Opt Out of Cookies</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>You may block or delete cookies through your browser:</li>
        <li>Chrome � Settings ? Privacy</li>
        <li>Firefox � Preferences ? Privacy & Security</li>
        <li>Edge � Settings ? Cookies & Site Permissions</li>
        <li>Safari � Preferences ? Privacy</li>
        <li>To disable Google Analytics: Google provides an official browser add-on allowing you to opt out of Analytics tracking.</li>
        <li>To disable interest-based ads: Use Google Ads Settings or industry tools such as YourAdChoices.</li>
        <li>Disabling cookies will not stop ads entirely � you will see non-personalized ads instead.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">4. How We Protect Your Data</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Secure servers</li>
        <li>Strict data-access controls</li>
        <li>Encryption where appropriate</li>
        <li>Continuous security monitoring</li>
      </ul>
      <p>We do not request sensitive data such as:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>? Credit or debit card information</li>
        <li>? Passwords</li>
        <li>? Banking details</li>
        <li>? Biometric identifiers</li>
      </ul>
      <p>AppInfoHub.com does not alter your device settings or install any software.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">5. Advertising & Third-Party Services</h2>
      <p>AppInfoHub.com does not work directly with advertisers. All ads are served automatically by trusted ad networks such as Google Ads. We do not control the content or accuracy of third-party ads. Clicking an external advertisement may redirect you to a third-party website with its own privacy practices. We recommend reviewing each third party�s privacy and cookie policy.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">6. Children�s Privacy</h2>
      <p>Our platform is not intended for individuals under the age of 13. We do not knowingly collect personal data from children. If we learn that information has been collected from a minor, we will delete it promptly.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">7. International Data Transfers</h2>
      <p>Your data may be processed on servers located outside your country. By using our website, you consent to such transfers as permitted by applicable law.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Access your data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion (right to be forgotten)</li>
        <li>Restrict or object to processing</li>
        <li>Opt out of targeted advertising</li>
        <li>Request copies of stored information</li>
        <li>Withdraw cookie consent at any time</li>
      </ul>
      <p>To exercise these rights, contact us using the information below.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">9. Policy Updates</h2>
      <p>We may update this Privacy Policy periodically to reflect changes in laws, updates in technology, website improvements, and advertising requirements. The �Last Updated� date will always indicate when the latest version was implemented.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, you may contact us at:</p>
      <p className="font-semibold text-indigo-700">📧 support@appinfohub.com</p>
      <p>We respond promptly and responsibly to all inquiries.</p>
    </section>
    <AdsSection />
  </div>
);

export default PrivacyPolicy;



