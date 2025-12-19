export const metadata = {
  title: 'Privacy Policy | Retford.info',
};

export default function PrivacyPolicy() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="space-y-8 prose prose-sm max-w-none text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Retford.info ("we", "us", "our", or "the Site") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p>We may collect information about you in the following ways:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Information you provide directly (contact forms, business listings)</li>
              <li>Automatically collected information (IP address, browser type, pages visited)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze website usage and trends</li>
              <li>Detect and prevent fraudulent transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              information only when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Security of Your Information</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. To exercise
              these rights, please contact us using the information provided on our Contact page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@retford.info" className="text-accent-dark hover:underline">
                info@retford.info
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
