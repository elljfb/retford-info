import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'About Retford.info',
  description: 'Learn about Retford.info and our mission to support the local community.',
  openGraph: {
    title: 'About Retford.info',
    description: 'Learn about Retford.info and our mission to support the local community.',
    images: [`${siteUrl}/api/og?title=About%20Us&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Retford.info',
    description: 'Learn about Retford.info and our mission to support the local community.',
    images: [`${siteUrl}/api/og?title=About%20Us&subtitle=Retford.info`],
  },
};

export default function About() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">About Retford.info</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <div className="entry-content">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Retford.info was created to be the go-to resource for everything happening in Retford, Nottinghamshire.
            We're dedicated to supporting local businesses, keeping residents informed, and fostering a sense of
            community pride.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6 mt-12">Why Choose Retford.info?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">For Locals</h3>
            <p className="text-gray-700">
              Discover the best businesses, restaurants, and attractions in Retford. Stay updated with local news
              and events happening in our vibrant community.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">For Visitors</h3>
            <p className="text-gray-700">
              Find accommodation, dining options, and attractions to make the most of your visit to Retford.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">For Businesses</h3>
            <p className="text-gray-700">
              Get listed on Retford.info and reach local customers. Premium listings include website links,
              photos, and social media integration.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Community-Driven</h3>
            <p className="text-gray-700">
              We're committed to supporting the local economy and promoting the best of what Retford has to offer.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 mt-12">Support Local</h2>
        <div className="entry-content">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            When you visit businesses listed on Retford.info, you're supporting our local economy. Don't forget to
            mention us when you contact them—it helps us continue providing this service to the community!
          </p>
        </div>

        <div className="entry-content bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
          <p className="text-gray-700">
            <strong>Please note:</strong> We are currently in the process of manually adding businesses to Retford.info. 
            If your favourite local business isn't listed yet, we're working on it! Businesses can also get in touch to 
            be added to the directory.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Get Your Business Listed</h3>
          <p className="text-gray-700 mb-6">
            Want to get your business on Retford.info? We offer both free basic listings and premium listings
            with additional features like photos, website links, and opening hours.
          </p>
          <Link
            href="/advertise"
            className="inline-block bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors no-underline"
          >
            Learn About Listings
          </Link>
        </div>
      </div>
    </>
  );
}
