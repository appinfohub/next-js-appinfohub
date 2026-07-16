import React from 'react';

function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">About Us</h1>

      <p className="mb-6">
        We are dedicated to providing users with information about the top free apps and games trending on the market. Our information covers various fields, including social, personalization, communication, music, and many other kinds of applications. You may easily find the information you want about the popular apps, which includes their descriptions, update times, ratings, reviews, along with other useful data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">About Our App Review</h2>
      <p className="mb-6">
        All content is original. The copyright of all app reviews and pictures belongs to our editorial team. Copying without attribution is forbidden.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Disclaimer</h2>
      <p className="mb-4">
        The trademarks and logos of all the merchants displayed on the website are the property of their respective owners. The website is not affiliated or associated with any of them.
      </p>
      <p className="mb-4">
        For any relevant queries, please get in touch with us via email, and we will reply to your messages in a timely manner.
      </p>
      <p className="mb-6">
        All the service we provide on <strong className="text-gray-900">appinfohub.com</strong> is completely FREE. We only share the original, virus-free apk files of free apps. All the apk files are the same as in Google Play Store without any modifications. Any information related to PAYMENT, including your card number or password, WILL NOT be required on our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Contact Us</h2>
      <p className="mb-6">
        If you have any questions or suggestions, feel free to contact us. Or you may report any problem on our website through email:{' '}
        <a href="mailto:support@appinfohub.com" className="text-blue-600 hover:underline font-medium">
          support@appinfohub.com
        </a>
        .
      </p>
    </div>
  );
}

export default AboutUs;