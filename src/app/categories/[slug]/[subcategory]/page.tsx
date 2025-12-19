import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { getBusinessesByCategory, getCategories, getSubcategoriesByCategory } from '@/lib/businesses';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';

export async function generateStaticParams() {
  const categories = await getCategories();
  const params = [];
  
  for (const category of categories) {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const subcategories = await getSubcategoriesByCategory(category);
    
    for (const subcategory of subcategories) {
      const subcategorySlug = subcategory.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      params.push({
        slug: categorySlug,
        subcategory: subcategorySlug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string; subcategory: string } }) {
  const subcategoryName = params.subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const categoryName = params.slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${subcategoryName} in Retford, Nottinghamshire`,
    description: `Browse ${subcategoryName} in the ${categoryName} category. Local listings and reviews.`,
  };
}

export default async function SubcategoryPage({ params }: { params: { slug: string; subcategory: string } }) {
  const categoryName = params.slug.replace(/-/g, ' ');
  
  const allBusinesses = await getBusinessesByCategory(categoryName);
  // Match by comparing slugified versions
  const businesses = allBusinesses.filter(b => {
    const businessSubcategorySlug = b.subcategory.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return businessSubcategorySlug === params.subcategory;
  });
  
  // Get the actual subcategory name from the first business
  const subcategoryName = businesses.length > 0 ? businesses[0].subcategory : params.subcategory.replace(/-/g, ' ');

  if (businesses.length === 0) {
    notFound();
  }

  const premiumBusinesses = businesses.filter(b => b.is_premium);
  const basicBusinesses = businesses.filter(b => !b.is_premium);

  // Background images for categories
  const getCategoryBackground = () => {
    if (params.slug === 'eat-and-drink') {
      return { backgroundImage: 'url(/businesses/eat-and-drink/eat-drink.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (params.slug === 'shops-and-businesses') {
      return { backgroundImage: 'url(/businesses/shops-and-businesses/businesses.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (params.slug === 'things-to-do') {
      return { backgroundImage: 'url(/businesses/things-to-do/things-to-do.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (params.slug === 'accommodation') {
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
        <div className="relative text-center text-white z-10">
          <h1 className="text-6xl font-bold mb-6">
            {subcategoryName.replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <div className="flex justify-center">
            <ShareButtons title={`${subcategoryName.replace(/\b\w/g, l => l.toUpperCase())} in Retford | Retford.info`} />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <div className="text-sm text-gray-600">
          <Link href="/" className="hover:text-accent-dark">Home</Link>
          {' / '}
          <Link href={`/categories/${params.slug}`} className="hover:text-accent-dark">
            {categoryName.replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
          {' / '}
          <span className="text-gray-900 font-semibold">
            {subcategoryName.replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
      </section>

      {/* Subcategory Intro */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold mb-6">
          {subcategoryName.replace(/\b\w/g, l => l.toUpperCase())} in Retford
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
          Explore our selection of {subcategoryName.toLowerCase()} in Retford. 
          Find the perfect {subcategoryName.toLowerCase()} for your needs.
        </p>
      </section>

      {/* Premium Listings */}
      {premiumBusinesses.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold mb-6 text-accent-dark">Featured Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumBusinesses.map(business => (
              <Link
                key={business.slug}
                href={`/business/${business.slug}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-accent to-blue-300 h-48 rounded-lg flex items-center justify-center text-white font-bold text-xl hover:shadow-lg transition-shadow">
                  {business.name}
                </div>
                <h4 className="text-lg font-semibold mt-3 group-hover:text-accent-dark">
                  {business.name}
                </h4>
                <p className="text-gray-600 text-sm">{business.subcategory}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Basic Listings */}
      {basicBusinesses.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold mb-6">All Listings</h3>
          <div className="space-y-4">
            {basicBusinesses.map(business => (
              <Link
                key={business.slug}
                href={`/business/${business.slug}`}
                className="block group"
              >
                <div className="border border-gray-300 rounded-lg p-4 hover:border-accent-dark hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-accent-dark">
                        {business.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{business.subcategory}</p>
                    </div>
                    {business.is_premium && (
                      <span className="bg-accent text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
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
