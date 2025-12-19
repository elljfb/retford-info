'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Article {
  title: string;
  slug: string;
  date: string;
}

interface NewsItem {
  title: string;
  link: string;
  source: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (isMenuOpen) {
      // Fetch latest articles and news when menu opens
      fetch('/api/latest-content')
        .then(res => res.json())
        .then(data => {
          setArticles(data.articles || []);
          setNews(data.news || []);
        })
        .catch(() => {
          // Fallback to empty arrays if API fails
          setArticles([]);
          setNews([]);
        });
    }
  }, [isMenuOpen]);

  const categories = [
    { name: 'Shops & Businesses', href: '/categories/shops-and-businesses' },
    { name: 'Eat & Drink', href: '/categories/eat-and-drink' },
    { name: 'Accommodation', href: '/categories/accommodation' },
    { name: 'Things to Do', href: '/categories/things-to-do' },
  ];

  const pages = [
    { name: 'What\'s On', href: '/whats-on' },
    { name: 'Car Parks', href: '/car-parks' },
    { name: 'Weather', href: '/weather' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Advertise', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-accent shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center gap-3 no-underline">
              <Image
                src="/retfordinfo.png"
                alt="Retford.info Logo"
                width={48}
                height={48}
                unoptimized
                className="rounded-full"
                style={{ background: 'transparent', objectFit: 'cover' }}
              />
              <div className="text-white font-bold text-xl hidden sm:block">
                Retford.info
              </div>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white text-accent px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Full Page Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent text-white p-3 rounded-lg hover:bg-accent-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Categories */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-accent">Categories</h2>
                <div className="space-y-3">
                  {categories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-lg text-gray-700 hover:text-accent hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pages */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-accent">Pages</h2>
                <div className="space-y-3">
                  {pages.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-lg text-gray-700 hover:text-accent hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Latest Content */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-accent">Latest Articles</h2>
                  <div className="space-y-3">
                    <Link
                      href="/articles"
                      className="block text-lg font-semibold text-gray-700 hover:text-accent hover:underline mb-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All Articles →
                    </Link>
                    {articles.slice(0, 3).map((article) => (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="block text-sm text-gray-600 hover:text-accent hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 text-accent">Latest News</h2>
                  <div className="space-y-3">
                    <Link
                      href="/news"
                      className="block text-lg font-semibold text-gray-700 hover:text-accent hover:underline mb-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All News →
                    </Link>
                    {news.slice(0, 3).map((item, index) => (
                      <a
                        key={`${item.source}-${index}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-gray-600 hover:text-accent hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
