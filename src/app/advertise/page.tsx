import Link from 'next/link';

export const metadata = {
  title: 'Advertise Your Business - Retford, Nottinghamshire',
  description: 'Get your business listed on Retford.info. Free and premium listing options available.',
};

export default function Advertise() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Advertise Your Business</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Get Listed on Retford.info</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Retford.info is the perfect place to promote your business to local customers and visitors.
          Whether you're a small shop, restaurant, hotel, or service provider, we've got a listing option
          that works for you.
        </p>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Basic Listing */}
          <div className="border-2 border-gray-300 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Basic Listing</h3>
            <p className="text-gray-600 mb-6">Free</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Business name and description</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Address and phone number</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Business category and location on map</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Call-to-action for customers</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block w-full text-center bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors no-underline"
            >
              Get Free Listing
            </Link>
          </div>

          {/* Premium Listing */}
          <div className="border-4 border-accent rounded-lg p-8 bg-blue-50 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-gray-900 px-4 py-1 rounded-full font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium Listing</h3>
            <p className="text-gray-600 mb-6">£2/month or £20/year</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Everything in Basic Listing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Link to your website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Photo gallery (up to 10 images)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Social media links</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Opening hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Email contact option</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-dark font-bold mt-1">✓</span>
                <span>Featured on category pages</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block w-full text-center bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors no-underline"
            >
              Get Premium Listing
            </Link>
          </div>
        </div>

        {/* How it Works */}
        <h2 className="text-3xl font-bold mb-6 mt-12">How It Works</h2>
        <div className="space-y-6 mb-12">
          <div className="flex gap-6">
            <div className="bg-accent text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-gray-700">
                Get in touch with us via the contact form to discuss your business and listing requirements.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-accent text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Set Up Your Listing</h3>
              <p className="text-gray-700">
                We'll help you create your business profile with photos, descriptions, and contact details.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-accent text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Go Live</h3>
              <p className="text-gray-700">
                Your business appears on Retford.info and starts reaching local customers immediately.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-accent text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Manage & Update</h3>
              <p className="text-gray-700">
                Keep your listing up-to-date with opening hours, special offers, and new photos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Listed?</h3>
          <p className="text-gray-700 mb-6">
            Contact us today to discuss your listing options and get your business on Retford.info!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-dark transition-colors no-underline"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </>
  );
}
