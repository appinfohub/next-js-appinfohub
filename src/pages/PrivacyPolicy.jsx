import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Privacy Policy</h1>
      
      <p className="mb-6">
        The <strong className="text-gray-900">appinfohub.com (App Info Hub)</strong> is committed to protecting the privacy and security of all users who use our site. According to GDPR and EU user content policy, we update our cookies policy and privacy policy to explain how App Info Hub uses the data we collect from you when you use our website, how we will use it, and how to manage your cookies settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What Are Cookies?</h2>
      <p className="mb-6">
        Cookies are text files placed on your device to collect non-personal information like your device, operating system, browser type, and how you have interacted with our website. When you visit our website, we may collect information from you automatically through cookies or similar technology.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How Do We Use Cookies?</h2>
      <p className="mb-6">
        We use cookies to improve your experience on our website, including keeping you signed in, understanding how you use our website, and providing personalized advertising tailored to your interests. By default, your browser is set to allow cookies, but you can always choose to block cookies in your browser's settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What Types of Cookies Do We Use?</h2>
      
      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Necessary Cookies</h3>
          <p className="text-gray-700">
            Necessary Cookies are required to deliver the services you request on our website. These Cookies play an essential role in operating this site and displaying it correctly. These necessary Cookies cannot be disabled. Necessary cookies gather no information about your browsing habits.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analytics Cookies</h3>
          <p className="text-gray-700">
            We use Google Analytics Cookies to analyze and measure our audience, traffic, and engagement with the site. Upon your visit, cookies are automatically enabled on our site. You can opt out of these Analytics Cookies anytime by following the instructions below. For more information on how Google uses cookies, please check <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Interest-Based Advertising</h3>
          <p className="text-gray-700 mb-3">
            Interest-Based Advertising Cookies are used to analyze your interests and preferences, showing you personalized ads on this site or elsewhere and measuring the effectiveness of advertising. We, advertisers, ad-tech providers, and others may deploy these Interest-Based Advertising Cookies. You can withdraw your consent to Interest-Based Advertising Cookies by following the instructions below.
          </p>
          <p className="text-gray-700">
            If you withdraw your consent to Interest-Based Advertising Cookies, certain features may not function correctly. You will see non-personalized ads instead of those based on your interests.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-3">Third-Party Cookies</h3>
          <p className="text-gray-700 mb-6">
            Some of the cookies on the website are operated by third parties. Some third-party links are designed to automatically transmit users' information onto the third party's landing page when you choose to "click" upon a third party's advertisement or promotion. We have no control over these third parties or their use of cookies. Please check the websites of these third parties for detailed information on how they use cookies. Besides cookies, technologies like pixel tags, web beacons, and eTags may also improve our understanding of site traffic, visitor behavior, and promotional campaigns.
          </p>

          {/* Table representation exactly matching your layout */}
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 w-1/4">
                    Cookie
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 w-1/4">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="align-top">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium border-r border-gray-200">
                    Google Analytics, Google AdSense, DoubleClick
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                    Site analytics (Google Analytics)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                    Google operates the Google Display Network, a collection of millions of websites and mobile applications powered by display advertising, including many Google services like YouTube. Google also uses the DoubleClick digital advertising platform, the ad technology foundation, to create, transact, and manage digital advertising for the world's buyers, creators, and sellers. The DoubleClick platform includes the DoubleClick Advertising Exchange and DoubleClick Bid Manager. To learn more about how Google collects and uses information for online advertising, please visit{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Google Privacy & Terms
                    </a>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Opt out of Cookies?</h2>
      <p className="mb-4">
        We provide several opt-out solutions if you want to withdraw your consent. It should be noted that certain website features may not function correctly if you set your browser not to accept cookies. Besides, you will still see advertising, although it may not be tailored to your interests using information collected from cookies and similar technologies.
      </p>
      <p className="mb-6">
        If you don't want us to use cookies when you visit this site,{' '}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          click here
        </a>{' '}
        for information on changing your browser settings to reject cookies. Disabling these cookies won't turn off advertising on our websites, and you will see non-personalized ads instead of targeted ads.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">Google Analytics Cookies Opt-out</h3>
      <p className="mb-4">
        This{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          opt-out browser add-on
        </a>{' '}
        can be helpful if you want to turn off Google Analytics cookies.
      </p>
      <p className="mb-6">
        <a href="https://safety.google/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Google Safety Centre
        </a>{' '}
        also provides a tool enabling you to control the data used to serve ads.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-3">Other Cookies Controls</h3>
      <p className="mb-4">
        If you want to block other cookies, you can use the browser-level cookie controls. Most browsers allow you to manage your cookie settings, which can usually be found in the "Settings", "Options" or "Preferences" menu of your browser.
      </p>
      <ul className="list-disc pl-6 mb-8 space-y-2 text-blue-600">
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Manage cookie settings in Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Manage cookie settings in Firefox
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Manage cookie settings in Internet Explorer
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Manage cookie settings in Microsoft Edge
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Manage cookie settings in Safari iOS
          </a>
        </li>
      </ul>

      <hr className="my-8 border-gray-200" />

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Privacy Policy</h2>
      <p className="mb-6">
        Besides cookies technology, App Info Hub collects and manages user data according to the following policy. By using the website, you agree to the terms of this privacy policy.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">What Data Do We Collect?</h3>
      <p className="mb-6">
        We collect information about you and your device when you access our website. For instance, when visiting our website, we log your device operating system name and version, manufacturer and model, browser type, browser language, screen resolution, the website you visited before browsing our website, pages you viewed, how long you spent on a page, access times and information about your use of and actions on our website.
      </p>
      <p className="mb-6">
        This information allows us to optimize our website and ensure we provide the best possible experience for our users.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">How Do We Use the Data?</h3>
      <p className="mb-4">We may use your data as follows:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>to operate, maintain, and improve our website, products, and services;</li>
        <li>to manage and administer our rewards program and other promotions you participate in on our website;</li>
        <li>to send information, including technical notices, updates, security alerts, and support and administrative messages.</li>
      </ul>

      <h3 className="text-xl font-medium text-gray-900 mb-2">What Will We Do If Track Abuse Occurs?</h3>
      <p className="mb-6">
        We will disclose information we have when required by law, for example, in response to a court order. We may disclose such information in response to a law enforcement agency's request.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">Property Claims</h3>
      <p className="mb-6">
        The trademarks and logos of all the merchants displayed on the website are the property of their respective owners. The website is not affiliated or associated with any of them.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">Safety Concern</h3>
      <p className="mb-6">
        Please be assured that this site only provides free app reviews and original apk files download without cheating, modifications, or viruses. Your personal information will NOT be shared with any other third party without your permission.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">Policy Change</h3>
      <p className="mb-6">
        We may amend this privacy policy from time to time. Use of information we collect now is subject to the privacy policy in effect at the time such information is used. Users are bound by any changes to the privacy policy when they use the services after such changes have been first posted.
      </p>

      <h3 className="text-xl font-medium text-gray-900 mb-2">Contact Us</h3>
      <p className="mb-6">
        If you have any questions about this privacy policy or the data we hold on you, please do not hesitate to contact us through{' '}
        <a href="mailto:support@appinfohub.com" className="text-blue-600 hover:underline font-medium">
          support@appinfohub.com
        </a>
        .
      </p>
    </div>
  );
}

export default PrivacyPolicy;