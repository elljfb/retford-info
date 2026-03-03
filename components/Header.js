'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800">
              <Image src="/images/retford-info.png" alt="Retford.info logo" width={40} height={40} className="rounded" />
              Retford.info
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors">
              About
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-blue-700 transition-colors">
              Articles
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-700 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-700"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Articles
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
