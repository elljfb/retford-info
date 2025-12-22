import Link from 'next/link';
import { Home, Search, MapPin } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found - Retford, Nottinghamshire',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <>
      {/* Cover Section */}
      <section className="relative w-full h-96 bg-gradient-to-r from-accent to-blue-300 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-semibold">Page Not Found</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-xl text-gray-700 mb-12">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <Home className="w-12 h-12 text-accent-dark mb-4" />
            <h3 className="text-lg font-bold mb-2">Go Home</h3>
            <p className="text-gray-600 text-sm">Return to the homepage</p>
          </Link>

          <Link
            href="/categories/shops-and-businesses"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <Search className="w-12 h-12 text-accent-dark mb-4" />
            <h3 className="text-lg font-bold mb-2">Browse Businesses</h3>
            <p className="text-gray-600 text-sm">Explore local businesses</p>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <MapPin className="w-12 h-12 text-accent-dark mb-4" />
            <h3 className="text-lg font-bold mb-2">About Retford</h3>
            <p className="text-gray-600 text-sm">Learn about the town</p>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Popular Pages</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/articles" className="text-accent-dark hover:underline font-semibold">
              Articles
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/news" className="text-accent-dark hover:underline font-semibold">
              News
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/whats-on" className="text-accent-dark hover:underline font-semibold">
              What's On
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/weather" className="text-accent-dark hover:underline font-semibold">
              Weather
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/car-parks" className="text-accent-dark hover:underline font-semibold">
              Car Parks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
