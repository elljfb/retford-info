import { MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { getBusinessBySlug, getBusinesses } from '@/lib/businesses';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import dynamic from 'next/dynamic';
import { marked } from 'marked';
import Image from 'next/image';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-600">Loading map...</div>
});

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map(business => ({
    slug: business.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return {};
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(business.name)}&subtitle=${encodeURIComponent(business.category)}${business.subcategory ? `%20•%20${encodeURIComponent(business.subcategory)}` : ''}`;
  
  return {
    title: `${business.name} - Retford, Nottinghamshire`,
    description: business.description || `Contact and find ${business.name} in Retford`,
    openGraph: {
      title: `${business.name} - Retford, Nottinghamshire`,
      description: business.description || `Contact and find ${business.name} in Retford`,
      images: [ogImage],
      url: `${siteUrl}/business/${business.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${business.name} - Retford, Nottinghamshire`,
      description: business.description || `Contact and find ${business.name} in Retford`,
      images: [ogImage],
    },
  };
}

export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const business = await getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  const images = business.images ? business.images.split(',').map(img => img.trim()) : [];
  
  // Parse markdown description if it exists
  const descriptionHtml = business.description ? await marked.parse(business.description) : '';

  // Get background image for cover section
  const getCoverStyle = () => {
    // Premium businesses with images: use first image as cover
    if (business.is_premium && images.length > 0) {
      return { 
        backgroundImage: `url(${images[0]})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      };
    }
    // Basic listings: use category background
    if (!business.is_premium) {
      const category = business.category.toLowerCase();
      if (category === 'eat and drink') {
        return { backgroundImage: 'url(/businesses/eat-and-drink/eat-drink.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
      }
      if (category === 'shops and businesses') {
        return { backgroundImage: 'url(/businesses/shops-and-businesses/businesses.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
      }
      if (category === 'things to do') {
        return { backgroundImage: 'url(/businesses/things-to-do/things-to-do.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
      }
      if (category === 'accommodation') {
        return { backgroundImage: 'url(/businesses/accommodation/accommodation.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
      }
    }
    // Default gradient
    return {};
  };

  const coverStyle = getCoverStyle();

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description || `${business.name} in Retford, Nottinghamshire`,
    ...(business.address && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address,
        "addressLocality": "Retford",
        "addressRegion": "Nottinghamshire",
        "addressCountry": "GB"
      }
    }),
    ...(business.phone && { "telephone": business.phone }),
    ...(business.email && { "email": business.email }),
    ...(business.website && { "url": business.website }),
    ...(business.facebook && { "sameAs": [business.facebook] }),
    "priceRange": "$$"
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-accent to-blue-300 flex items-center justify-center"
        style={coverStyle}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{business.name}</h1>
          <div className="flex justify-center">
            <ShareButtons title={`${business.name} | Retford.info`} />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Business Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
          <p className="text-lg text-gray-600">{business.subcategory}</p>
        </div>

        {/* Image Carousel (Premium) */}
        {business.is_premium && images.length > 0 && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${business.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {business.is_premium ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 order-2 md:order-1">
              {business.description && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About {business.name}</h2>
                  <div 
                    className="text-gray-700 leading-relaxed markdown-content"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </section>
              )}
              {business.opening_hours && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{business.name} Opening Hours</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {business.opening_hours}
                  </p>
                </section>
              )}
            </div>
            {/* Sidebar */}
            <div className="md:col-span-1 order-1 md:order-2">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Contact {business.name}</h3>
                {business.phone && (
                  <div className="mb-4">
                    <a href={`tel:${business.phone}`} className="block w-full bg-accent text-white text-center px-6 py-3 rounded-lg hover:bg-accent-dark hover:text-white transition-colors font-semibold text-lg">
                      📞 {business.phone}
                    </a>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-700">
                    Please mention <span className="font-semibold">Retford.info</span> when contacting this business!
                  </p>
                </div>
                {business.email && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a href={`mailto:${business.email}`} className="text-accent-dark hover:underline break-all">
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Website</p>
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline break-all">
                      Visit Website
                    </a>
                  </div>
                )}
                {(business.facebook || business.instagram || business.twitter) && (
                  <div className="space-y-3">
                    {business.facebook && (
                      <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        <Facebook size={20} />
                        Facebook
                      </a>
                    )}
                    {business.instagram && (
                      <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-purple-600 to-pink-500 text-white text-center px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors font-semibold">
                        <Instagram size={20} />
                        Instagram
                      </a>
                    )}
                    {business.twitter && (
                      <a href={business.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-black text-white text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                        <Twitter size={20} />
                        Twitter / X
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Find {business.name}</h3>
                {business.address && (
                  <>
                    <div className="flex gap-2 text-gray-700 mb-4">
                      <MapPin className="flex-shrink-0 text-accent-dark mt-1" />
                      <address className="not-italic">
                        {business.address}
                      </address>
                    </div>
                    <div className="h-48 rounded-lg overflow-hidden">
                      <Map address={business.address} businessName={business.name} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {business.opening_hours && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {business.opening_hours}
                  </p>
                </section>
              )}
              <section>
                <h3 className="text-xl font-bold mb-4">Contact {business.name}</h3>
                <div className="space-y-3">
                  {business.phone && (
                    <div>
                      <a href={`tel:${business.phone}`} className="block w-full bg-accent text-white text-center px-6 py-3 rounded-lg hover:bg-accent-dark hover:text-white transition-colors font-semibold text-lg">
                        📞 {business.phone}
                      </a>
                    </div>
                  )}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700">
                      Please mention <span className="font-semibold">Retford.info</span> when contacting this business, it helps support us!
                    </p>
                  </div>
                  {business.email && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href={`mailto:${business.email}`} className="text-accent-dark hover:underline break-all">
                        {business.email}
                      </a>
                    </div>
                  )}
                  {business.website && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Website</p>
                      <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline break-all">
                        Visit Website
                      </a>
                    </div>
                  )}
                  {(business.facebook || business.instagram || business.twitter) && (
                    <div className="space-y-3">
                      {business.facebook && (
                        <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                          <Facebook size={20} />
                          Facebook
                        </a>
                      )}
                      {business.instagram && (
                        <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-purple-600 to-pink-500 text-white text-center px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors font-semibold">
                          <Instagram size={20} />
                          Instagram
                        </a>
                      )}
                      {business.twitter && (
                        <a href={business.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-black text-white text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                          <Twitter size={20} />
                          Twitter / X
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
              {business.address && (
                <section>
                  <h3 className="text-xl font-bold mb-4">Find {business.name}</h3>
                  <div className="flex gap-2 text-gray-700">
                    <MapPin className="flex-shrink-0 text-accent-dark mt-1" />
                    <address className="not-italic">
                      {business.address}
                    </address>
                  </div>
                </section>
              )}
            </div>
            <div>
              <div className="bg-blue-50 p-6 rounded-lg border border-accent">
                <h3 className="text-lg font-bold mb-2">Is this your business?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  This is a free basic listing. Upgrade to a premium listing for just <span className="font-bold">£2/month</span> and get:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Photos and a gallery</li>
                  <li>Opening hours</li>
                  <li>Website and social media links</li>
                  <li>Priority placement in category pages</li>
                </ul>
                <a href="/advertise" className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark hover:text-white transition-colors font-semibold">
                  See upgrade options
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
 

 
