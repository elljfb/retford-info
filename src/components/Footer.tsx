'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Copyright */}
          <div>
            <Image
              src="/retfordinfo.png"
              alt="Retford.info Logo"
              width={48}
              height={48}
              unoptimized
              className="mb-4 rounded-full"
              style={{ background: 'transparent', objectFit: 'cover' }}
            />
            <p className="text-sm text-gray-400">
              © 2026 Retford.info. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/shops-and-businesses"
                  className="text-gray-300 hover:text-accent transition-colors no-underline"
                >
                  Shops & Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/eat-and-drink"
                  className="text-gray-300 hover:text-accent transition-colors no-underline"
                >
                  Eat & Drink
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accommodation"
                  className="text-gray-300 hover:text-accent transition-colors no-underline"
                >
                  Accommodation
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/things-to-do"
                  className="text-gray-300 hover:text-accent transition-colors no-underline"
                >
                  Things to Do
                </Link>
              </li>
            </ul>
          </div>

          {/* Advertise Section */}
          <div className="bg-accent-dark p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-white">Advertise Your Business</h3>
            <p className="text-sm text-gray-200 mb-4">
              Reach local customers! Get your business listed on Retford.info. Premium listings available from just £2/month.
            </p>
            <Link
              href="/advertise"
              className="inline-block bg-accent text-gray-900 px-4 py-2 rounded font-semibold hover:bg-white transition-colors no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Top of Page Button */}
        {showTopButton && (
          <div className="flex justify-center pt-8 border-t border-gray-700">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              <ArrowUp size={20} />
              Back to Top
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
