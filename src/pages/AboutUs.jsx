import React from "react";
import AdsSection from "../components/AdsSection";

const sectionIcons = {
  who: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  what: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  values: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  info: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
  commitment: "https://cdn-icons-png.flaticon.com/512/1828/1828917.png",
  ads: "https://cdn-icons-png.flaticon.com/512/1828/1828915.png",
  ip: "https://cdn-icons-png.flaticon.com/512/1828/1828913.png",
  purpose: "https://cdn-icons-png.flaticon.com/512/1828/1828912.png",
  contact: "https://cdn-icons-png.flaticon.com/512/1828/1828916.png"
};

const AboutUs = () => (
  <div className="w-full max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4 text-center">About Us</h1>
    <div className="my-8"><AdsSection /></div>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.who} alt="Who We Are" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
    </div>
    <p className="text-lg text-gray-700 mb-6">
      AppInfoHub.com is an independent online platform dedicated to helping users discover, understand, and choose the best free apps and games across the digital ecosystem. Our mission is to simplify the process of finding trustworthy apps by providing clear, accurate, and unbiased information that users can rely on.
    </p>
    <div className="mb-6">
      <p className="text-gray-700 mb-2">We curate information across a wide range of categories:</p>
      <ul className="list-disc ml-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <li>Social & communication apps</li>
        <li>Personalization tools</li>
        <li>Productivity & utility applications</li>
        <li>Music, media & entertainment</li>
        <li>Games across various genres</li>
        <li>Lifestyle, photo editing, finance, and more</li>
      </ul>
      <p className="mt-2 text-gray-700">Our platform is designed for individuals, families, and everyday users who want a safe, straightforward way to explore popular apps and stay updated with the latest releases.</p>
    </div>
    <div className="my-8"><AdsSection /></div>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.what} alt="What We Do" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">What We Do</h2>
    </div>
    <ul className="list-disc ml-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <li><b>Detailed App Overviews:</b> Every app listing includes key details such as descriptions, features, update timelines, ratings, reviews, and safety considerations.</li>
      <li><b>Original Editorial Reviews:</b> Our review team writes 100% original content, based on independent analysis and publicly available information. We do not accept paid reviews or biased promotional content.</li>
      <li><b>APK Information for Free Apps:</b> For apps that offer APK versions, we provide only original, unmodified, and virus-free APK references sourced from trusted channels. We do not modify APK files, offer premium hacks, or alter digital signatures.</li>
      <li><b>User-Friendly Discovery Tools:</b> We aim to make app discovery simple and intuitive for all users � from beginners to tech-savvy individuals.</li>
    </ul>
    <div className="my-8"><AdsSection /></div>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.values} alt="Our Values" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
    </div>
    <ol className="list-decimal ml-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <li><b>Transparency:</b> We clearly disclose how information is gathered and do not mislead users with exaggerated claims or hidden promotions.</li>
      <li><b>Independence:</b> AppInfoHub.com is not affiliated with, endorsed by, or sponsored by any app developer, publisher, or software company unless explicitly stated.</li>
      <li><b>Safety & Integrity:</b> We do not provide modified apps, cracked versions, altered files, or harmful software. Any APK information offered is strictly original and provided for informational purposes.</li>
      <li><b>Compliance:</b> All content, statements, and presentation methods are aligned with Google Ads Policies, Google Play Developer Policies, Google Unwanted Software Policy, Microsoft Advertising Policies, Meta (Facebook/Instagram) Ad Standards, TikTok Ads Guidelines, GDPR, CCPA, CPRA, PIPEDA, and other global privacy frameworks, and general consumer protection and transparency laws. We also avoid restricted claims, deceptive behavior, or unsupported guarantees.</li>
    </ol>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.info} alt="How We Collect Info" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">How We Collect and Present Information</h2>
    </div>
    <p className="text-gray-700 mb-4">
      AppInfoHub.com gathers publicly available information such as app descriptions, update logs, developer statements, and user ratings. All editorial content is manually reviewed to ensure accuracy, neutrality, originality, compliance with ad-platform guidelines, user safety and clarity. We never request payment details, passwords, banking information, or sensitive personal data through our website.
    </p>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.commitment} alt="Our Commitment" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Our Commitment to Users</h2>
    </div>
    <ul className="list-disc ml-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <li>A Safe Browsing Experience</li>
      <li>Original & Credible Editorial Content</li>
      <li>No Misleading Content</li>
      <li>No Hidden Costs</li>
    </ul>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.ads} alt="Advertising Transparency" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Advertising Transparency</h2>
    </div>
    <p className="text-gray-700 mb-4">
      AppInfoHub.com does not manually control which ads users see. All advertisements displayed on the site are automatically served by Google Ads or other third-party ad networks based on user preferences, device behavior, and browsing patterns. We do not sell user data, partner directly with advertisers for sponsored placements, influence or alter the ad formats shown, or endorse third-party ads displayed on our pages. Users should verify details on any external website they visit via an advertisement.
    </p>
    <div className="my-8"><AdsSection /></div>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.ip} alt="Intellectual Property" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
    </div>
    <p className="text-gray-700 mb-4">
      All content, review text, design elements, and images on AppInfoHub.com belong to our editorial team and are protected by copyright. All trademarks, app logos, brand names, and icons belong to their respective owners.
    </p>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.purpose} alt="Our Purpose" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Our Purpose</h2>
    </div>
    <p className="text-gray-700 mb-4">
      The goal of AppInfoHub.com is to create a safe, transparent, and reliable resource for anyone looking to explore trending apps without confusion or risk. We strive to make app research simple by offering accurate information, clean browsing experience, honest reviews, ethical recommendations, and fast access to app insights.
    </p>
    <div className="flex items-center gap-4 mb-6">
      <img src={sectionIcons.contact} alt="Contact Us" className="w-10 h-10 md:w-14 md:h-14" />
      <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
    </div>
    <p className="text-gray-700 mb-2">
      We're always happy to connect with our users.<br />
      <span role="img" aria-label="email">📧</span> Email: <a href="mailto:support@appinfohub.com" className="text-blue-700 underline">support@appinfohub.com</a><br />
      If you have questions, suggestions, or need assistance accessing our content, feel free to reach out. We aim to respond promptly and helpfully.
    </p>
  </div>
);

export default AboutUs;



