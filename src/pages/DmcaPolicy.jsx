import React from "react";
import AdsSection from "../components/AdsSection";

const DmcaPolicy = () => (
  <div className="w-full max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4 text-center">DMCA Policy</h1>
    <p className="text-gray-700 mb-4 text-sm text-center">Last Updated: February 2026</p>
    <div className="my-8"><AdsSection /></div>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Our Content Practices</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>AppInfoHub.com provides original editorial content, app descriptions, app feature summaries, and general informational material.</li>
        <li>We do not host copyrighted applications, modified APKs, paid content, or premium software.</li>
        <li>All APK references are for informational purposes only, pointing to original, unmodified, safe versions.</li>
        <li>Any copyrighted trademarks, app names, icons, or brand assets are the property of their respective owners.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">2. Copyright Infringement Claims</h2>
      <p>If you believe any material on AppInfoHub.com violates your copyright, you may submit a formal DMCA takedown request. To be valid, your DMCA notice must include the following:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>? 1. Your Contact Information: Provide your full legal name, organization (if applicable), mailing address, phone number, and valid email address.</li>
        <li>? 2. Identification of the Copyrighted Work: Describe the copyrighted material you believe has been infringed.</li>
        <li>? 3. Identification of the Infringing Content: Include the exact URL(s) on AppInfoHub.com where the allegedly infringing content appears.</li>
        <li>? 4. Statement of Good Faith: A declaration such as "I have a good-faith belief that the use of the copyrighted material described above is not authorized by the copyright owner, its agent, or the law."</li>
        <li>? 5. Accuracy & Authority Statement: A statement such as "The information in this notice is accurate, and I am the copyright owner or authorized to act on behalf of the owner."</li>
        <li>? 6. Electronic or Physical Signature: Type your full name at the end of the notice to serve as your electronic signature.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">3. DMCA Takedown Notice Submission</h2>
      <p>Please submit DMCA notices to:</p>
      <p className="font-semibold text-indigo-700">📧 support@appinfohub.com</p>
      <p>Subject Line: DMCA Takedown Request</p>
      <p>We recommend sending from an official business or organization email for verification purposes.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">4. How We Respond to DMCA Notices</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Review the claim for completeness and accuracy.</li>
        <li>Remove or disable access to the allegedly infringing material if the claim is valid.</li>
        <li>Notify the user or team member responsible for the content (if applicable).</li>
        <li>Maintain records of all DMCA communications.</li>
        <li>We reserve the right to reject incomplete or fraudulent notices.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">5. Counter-Notification (If Applicable)</h2>
      <p>If content has been removed or disabled due to a DMCA claim and you believe the removal was in error, you may submit a counter-notification. A valid counter-notification must include:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Your full contact information</li>
        <li>Identification of the removed content and its previous URL</li>
        <li>A statement under penalty of perjury that the removal was a mistake</li>
        <li>Consent to the jurisdiction of your local court</li>
        <li>Your electronic signature</li>
      </ul>
      <p>Upon receiving a valid counter-notification, we may restore the content unless the original complainant initiates legal action within 10�14 business days.</p>
    </section>
    <div className="my-8"><AdsSection /></div>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">6. Repeat Infringement Policy</h2>
      <p>AppInfoHub.com may restrict or permanently block access to users or contributors who repeatedly violate copyright laws or submit unauthorized content.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">7. No Legal Advice</h2>
      <p>This DMCA Policy is for informational purposes only and does not constitute legal advice. For legal guidance, please consult a qualified attorney.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">8. Questions About This Policy</h2>
      <p>If you have questions about our DMCA process or need assistance submitting a notice, you may contact us at:</p>
      <p className="font-semibold text-indigo-700">📧 support@appinfohub.com</p>
      <p>We aim to respond promptly to all legitimate requests.</p>
    </section>
    <AdsSection />
  </div>
);

export default DmcaPolicy;



