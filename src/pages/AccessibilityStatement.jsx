import React from "react";
import AdsSection from "../components/AdsSection";

const AccessibilityStatement = () => (
  <div className="w-full max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4 text-center">Accessibility Statement</h1>
    <p className="text-gray-700 mb-4 text-sm text-center">Last Updated: February 2026</p>
    <div className="my-8"><AdsSection /></div>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Our Accessibility Commitment</h2>
      <p>AppInfoHub.com strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which is the internationally recognized standard for web accessibility.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Ensuring the website is perceivable, operable, understandable, and robust</li>
        <li>Providing barrier-free access to content, navigation, and features</li>
        <li>Making the site compatible with assistive technologies</li>
        <li>Designing pages for readability, clarity, and ease of use</li>
      </ul>
      <p>We aim to provide a smooth and inclusive experience for people with visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">2. Accessibility Features on AppInfoHub.com</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>? Keyboard-friendly navigation</li>
        <li>? Screen reader compatibility</li>
        <li>? Clear text hierarchy & structure</li>
        <li>? Sufficient color contrast</li>
        <li>? Responsive & mobile-friendly design</li>
        <li>? Alt text for non-decorative images</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">3. Ongoing Improvements</h2>
      <p>Accessibility is an ongoing process. We regularly review our website to:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Identify accessibility gaps</li>
        <li>Address usability feedback</li>
        <li>Improve compatibility with new assistive technologies</li>
        <li>Enhance content readability and structure</li>
        <li>Ensure compliance with evolving accessibility laws</li>
      </ul>
      <p>We welcome user feedback to help us continue improving.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">4. Third-Party Content</h2>
      <p>AppInfoHub.com may include third-party ads, external links, and embedded content. We do not control the accessibility of external websites or third-party services. However, we aim to partner only with trusted platforms that follow accessibility standards.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">5. Known Limitations</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Occasional missing alt tags in older articles</li>
        <li>Third-party advertisement modules not fully controllable</li>
        <li>Plugin-based features that may not meet 100% WCAG compliance</li>
      </ul>
      <p>We are continuously working to resolve these limitations.</p>
    </section>
    <div className="my-8"><AdsSection /></div>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">6. Feedback & Accessibility Support</h2>
      <p>We welcome your feedback. If you encounter accessibility barriers or need assistance accessing content, please contact us:</p>
      <p className="font-semibold text-indigo-700">📧 support@appinfohub.com</p>
      <ul className="list-disc ml-6 mb-2">
        <li>The page URL</li>
        <li>The description of the issue</li>
        <li>The device and browser you are using</li>
        <li>Any assistive technologies involved (if applicable)</li>
      </ul>
      <p>We aim to respond within 1�2 business days.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">7. Enforcement</h2>
      <p>If you believe your accessibility rights are being violated and would like to seek formal resolution, please reach out to relevant regional authorities (e.g., ADA, GDPR Supervisory Authorities, or local accessibility regulators). We encourage contacting us first so we can resolve the matter quickly.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">8. Commitment to Continuous Accessibility</h2>
      <p>AppInfoHub.com is dedicated to creating an inclusive environment for all visitors. We continuously improve accessibility through:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Regular audits</li>
        <li>Staff training</li>
        <li>Updated content guidelines</li>
        <li>Modern web standards</li>
        <li>User feedback</li>
      </ul>
      <p>Your experience matters, and we appreciate your support in helping us maintain accessibility excellence.</p>
    </section>
    <AdsSection />
  </div>
);

export default AccessibilityStatement;



