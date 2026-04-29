import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import {
  formatBusinessSlug,
  getBusinessesByCategory,
  getBusinessValues,
  getCategories,
  getSubcategoriesByCategory,
  slugifyBusinessValue,
} from '@/lib/businesses';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import NextImage from 'next/image';

type SubcategoryParams = Promise<{ slug: string; subcategory: string }>;

export async function generateStaticParams() {
  const categories = await getCategories();
  const params = [];
  
  for (const category of categories) {
    const categorySlug = slugifyBusinessValue(category);
    const subcategories = await getSubcategoriesByCategory(category);
    
    for (const subcategory of subcategories) {
      const subcategorySlug = slugifyBusinessValue(subcategory);
      params.push({
        slug: categorySlug,
        subcategory: subcategorySlug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: SubcategoryParams }) {
  const { slug, subcategory } = await params;
  const subcategoryName = formatBusinessSlug(subcategory);
  const categoryName = formatBusinessSlug(slug);
  
  const ogImage = `/api/og?title=${encodeURIComponent(subcategoryName)}&subtitle=${encodeURIComponent(categoryName)}`;
  
  return {
    title: `${subcategoryName} in Retford, Nottinghamshire`,
    description: `Browse ${subcategoryName} in the ${categoryName} category. Local listings and reviews.`,
    openGraph: {
      title: `${subcategoryName} in Retford, Nottinghamshire`,
      description: `Browse ${subcategoryName} in the ${categoryName} category. Local listings and reviews.`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${subcategoryName} in Retford, Nottinghamshire`,
      description: `Browse ${subcategoryName} in the ${categoryName} category. Local listings and reviews.`,
      images: [ogImage],
    },
  };
}

export default async function SubcategoryPage({ params }: { params: SubcategoryParams }) {
  const { slug, subcategory } = await params;
  const categoryName = slug.replace(/-/g, ' ');
  
  const allBusinesses = await getBusinessesByCategory(categoryName);
  // Match by comparing slugified versions - handle both single and array subcategories
  const businesses = allBusinesses.filter(b => {
    const subcategories = getBusinessValues(b.subcategory);
    return subcategories.some(sub => {
      const businessSubcategorySlug = slugifyBusinessValue(sub);
      return businessSubcategorySlug === subcategory;
    });
  });
  
  // Get the actual subcategory name from the first business that matches
  let subcategoryName = subcategory.replace(/-/g, ' ');
  if (businesses.length > 0) {
    const firstBusiness = businesses[0];
    const subcategories = getBusinessValues(firstBusiness.subcategory);
    const matchingSub = subcategories.find(sub => {
      const subSlug = slugifyBusinessValue(sub);
      return subSlug === subcategory;
    });
    if (matchingSub) subcategoryName = matchingSub;
  }

  if (businesses.length === 0) {
    notFound();
  }

  const premiumBusinesses = businesses.filter(b => b.is_premium);
  const basicBusinesses = businesses.filter(b => !b.is_premium);

  // Background images for categories
  const getCategoryBackground = () => {
    if (slug === 'eat-and-drink') {
      return { backgroundImage: 'url(/businesses/eat-and-drink/eat-drink.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (slug === 'shops-and-businesses') {
      return { backgroundImage: 'url(/businesses/shops-and-businesses/businesses.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (slug === 'things-to-do') {
      return { backgroundImage: 'url(/businesses/things-to-do/things-to-do.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (slug === 'accommodation') {
      return { backgroundImage: 'url(/businesses/accommodation/accommodation.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return {};
  };
  
  const backgroundStyle = getCategoryBackground();

  return (
    <>
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {subcategoryName.replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </h1>
          <div className="flex justify-center">
            <ShareButtons title={`${subcategoryName.replace(/\b\w/g, (l: string) => l.toUpperCase())} in Retford | Retford.info`} />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <div className="text-sm text-gray-600">
          <Link href="/" className="hover:text-accent-dark">Home</Link>
          {' / '}
          <Link href={`/categories/${slug}`} className="hover:text-accent-dark">
            {categoryName.replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </Link>
          {' / '}
          <span className="text-gray-900 font-semibold">
            {subcategoryName.replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </span>
        </div>
      </section>

      {/* Subcategory Intro */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold mb-6">
          {subcategoryName.replace(/\b\w/g, (l: string) => l.toUpperCase())} in Retford
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
          Explore our selection of {subcategoryName.toLowerCase()} in Retford, making it easier to find the right option for your needs. Whether you are comparing local businesses, looking for a trusted provider, or simply exploring what is available in the area, this page brings together a range of {subcategoryName.toLowerCase()} serving Retford and the surrounding areas, helping you make an informed choice based on your preferences and requirements.</p>
      </section>

      {/* Premium Listings */}
      {premiumBusinesses.length > 0 && (
        <>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold mb-6 text-accent-dark">Featured Businesses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumBusinesses.map(business => {
                const images = business.images ? business.images.split(',').map(img => img.trim()) : [];
                const hasImage = images.length > 0;
                
                return (
                  <Link
                    key={business.slug}
                    href={`/business/${business.slug}`}
                    className="group"
                  >
                    <div className="relative h-48 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {hasImage ? (
                        <>
                          <NextImage
                            src={images[0]}
                            alt={business.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <span className="text-white font-bold text-xl text-center px-4">{business.name}</span>
                          </div>
                        </>
                      ) : (
                        <div className="bg-gradient-to-br from-accent to-blue-300 h-full flex items-center justify-center text-white font-bold text-xl">
                          {business.name}
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mt-3 group-hover:text-accent-dark">
                      {business.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {Array.isArray(business.subcategory) 
                        ? business.subcategory.join(' • ') 
                        : business.subcategory}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Basic Listings */}
      {basicBusinesses.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold mb-6">All Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {basicBusinesses.map(business => (
              <Link
                key={business.slug}
                href={`/business/${business.slug}`}
                className="block group"
              >
                <div className="border border-gray-300 rounded-lg p-4 hover:border-accent-dark hover:shadow-md transition-all h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-accent-dark">
                        {business.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {Array.isArray(business.subcategory) 
                          ? business.subcategory.join(' • ') 
                          : business.subcategory}
                      </p>
                    </div>
                    {business.is_premium && (
                      <span className="bg-accent text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
                    {business.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={16} /> {business.phone}
                      </span>
                    )}
                    {business.address && (
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {business.address}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
