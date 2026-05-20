import React from "react";

import AdsSection from "../components/AdsSection";
import AppsSection from "../components/AppsSection";

const faqs = [
  {
    q: "What Is a ZIP File and How Does It Work?",
    a: "A ZIP file is a compressed archive that can contain multiple files or folders within it, bundled together to take up less space. The ZIP format uses lossless compression algorithms to reduce file size without losing any data. When you unzip a ZIP file, the original files and folders are restored to their original state."
  },
  {
    q: "How Do I Use Your Online ZIP Tool to Compress Files?",
    a: "To compress files using our online ZIP tool, simply click the 'Zip a Folder' button on top of the page. You can then click or drag files from your device into the designated area. Once your files are uploaded, click 'Zip and Download' and your files will be zipped into a single archive, which will be automatically downloaded to your device after the process."
  },
  {
    q: "How Can I Unzip Files Using Your Online Tool?",
    a: "To unzip files, click the 'Unzip a File' button on the page. Click or drag files from your device into the designated area to upload your ZIP file. Our tool will then process the ZIP file and display the contents. Once the extract process finishes, the unzipped files will be automatically downloaded to your device."
  },
  {
    q: "Is There a Size Limit for Files I Can Zip or Unzip Using Your Tool?",
    a: "Our online zip and unzip tool currently supports files of all sizes for both compression and extracting. However, in order to ensure smooth processing and to manage server resources effectively, files you upload should better be up to 100MB. Once the uploading files exceed the limit, it might slow the process."
  },
  {
    q: "Are Files Zipped or Unzipped Using Your Tool Safe and Private?",
    a: "The safety and privacy of your files are of utmost importance to our website. Files uploaded to our online zip/unzip tool are processed on secure servers and are not accessed or stored beyond what is necessary to provide the service. Once the zipping or unzipping process is complete, files will no longer be accessible from our system."
  }
];

const topApps = [
  { name: "Easy Homescreen", category: "Personalization", rating: 4.0 },
  { name: "Whatnot: Shop, Sell, Connect", category: "Shopping", rating: 4.7 },
  { name: "WhatsApp Messenger", category: "Communication", rating: 4.7 },
  { name: "EdgeAura", category: "Personalization", rating: 3.6 },
  { name: "Microsoft Copilot", category: "Productivity", rating: 4.7 },
  { name: "Peacock TV: Stream TV & Movies", category: "Entertainment", rating: 4.5 },
  { name: "ChatGPT", category: "Productivity", rating: 4.8 },
  { name: "CapCut - Video Editor", category: "Video", rating: 3.4 },
  { name: "The NBC App - Stream TV Shows", category: "Entertainment", rating: 4.2 },
  { name: "Instagram", category: "Social", rating: 4.0 }
];

const ZipUnzipPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Zip & Unzip Online Free</h1>
      <p className="text-lg text-gray-700 mb-4">No cost but only efficiency<br />Fast and secure<br />No downloads, no hassle</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-lg flex-1">Zip a Folder</button>
        <button className="bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800 font-bold px-8 py-4 rounded-2xl shadow-lg hover:from-blue-200 hover:to-blue-400 transition text-lg flex-1">Unzip a File</button>
      </div>
      <AdsSection />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-700 mb-2">1</span>
          <h3 className="font-semibold text-lg mb-1">Zip or Unzip</h3>
          <p className="text-gray-600 text-sm text-center">Select the function you need: compress or extract.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-700 mb-2">2</span>
          <h3 className="font-semibold text-lg mb-1">Upload and Wait</h3>
          <p className="text-gray-600 text-sm text-center">Upload a folder or ZIP file, and wait for the process.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-700 mb-2">3</span>
          <h3 className="font-semibold text-lg mb-1">Download the File</h3>
          <p className="text-gray-600 text-sm text-center">The file will be automatically downloaded when finished.</p>
        </div>
      </div>
      <AdsSection />
      <div className="mb-8">
        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">Discover more</button>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="mb-8">
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-semibold text-lg text-blue-700 mb-1">{faq.q}</h3>
            <p className="text-gray-700 text-base">{faq.a}</p>
          </div>
        ))}
      </div>
      <AdsSection />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Apps</h2>
    
    <AppsSection category="Top Apps" /> 
    </div>
  );
};

export default ZipUnzipPage;

