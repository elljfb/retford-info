export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Retford.info. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "2 January 2026";

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-12">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Retford.info ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website retford.info.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect information about you in a variety of ways. The information we may collect on the website includes:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Personal Data</h3>
          <p className="text-gray-700 mb-4">
            Personally identifiable information, such as your name and email address, that you voluntarily give to us when you contact us through our contact form or subscribe to our newsletter (if applicable).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Usage Data</h3>
          <p className="text-gray-700 mb-4">
            Information automatically collected when you visit our website, including your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Use of Your Information</h2>
          <p className="text-gray-700 mb-4">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customised experience. Specifically, we may use information collected about you to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Respond to your enquiries and contact requests</li>
            <li className="mb-2">Improve our website and services</li>
            <li className="mb-2">Monitor and analyse usage and trends to improve your experience</li>
            <li className="mb-2">Send you administrative information, such as updates to our policies</li>
            <li className="mb-2">Generate aggregate data for analytics and website improvement</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4">
            We may use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Third-Party Websites</h2>
          <p className="text-gray-700 mb-4">
            The website may contain links to third-party websites and applications. We are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each website that collects personal information.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Advertising</h2>
          <p className="text-gray-700 mb-4">
            We may display third-party advertisements on our website. These advertisements may use cookies and other tracking technologies to collect information about your browsing activities in order to provide relevant advertising. We do not have control over these third-party cookies.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Security of Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use administrative, technical, and physical security measures to help protect your personal information. Whilst we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Your Data Protection Rights (GDPR)</h2>
          <p className="text-gray-700 mb-4">
            If you are a resident of the European Economic Area (EEA) or the United Kingdom, you have certain data protection rights. These include the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Access, update, or delete your personal information</li>
            <li className="mb-2">Rectification of inaccurate data</li>
            <li className="mb-2">Object to processing of your personal data</li>
            <li className="mb-2">Request restriction of processing your personal data</li>
            <li className="mb-2">Data portability</li>
            <li className="mb-2">Withdraw consent</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our website does not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700 mb-4">
            Email: <a href="mailto:info@retford.info" className="text-blue-600 hover:text-blue-700 font-medium">info@retford.info</a>
          </p>
        </div>
      </div>
    </div>
  );
}
