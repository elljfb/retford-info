import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block">
              <Image src="/images/retford-info.png" alt="Retford.info logo" width={80} height={80} className="rounded mb-2" />
              <div className="text-2xl font-bold text-blue-700">Retford.info</div>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Your complete guide to Retford, Nottinghamshire. Discover local attractions, history, events, and everything you need to know about this charming market town.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-700 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-700 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Local Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal & Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/editorial-policy" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Retford.info - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
