import Link from 'next/link';
import { getBusinessesByCategory, getCategories, getSubcategoriesByCategory } from '@/lib/businesses';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import dynamic from 'next/dynamic';

const MultiMap = dynamic(() => import('@/components/MultiMap'), {
  ssr: false,
  loading: () => <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center text-gray-600">Loading map...</div>
});

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(category => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.replace(/-/g, ' ');
  const formattedCategoryName = categoryName.replace(/\b\w/g, l => l.toUpperCase()).replace(/ And /g, ' and ');
  
  const ogImage = `/api/og?title=${encodeURIComponent(formattedCategoryName)}&subtitle=${encodeURIComponent('Retford, Nottinghamshire')}`;

  return {
    title: `${formattedCategoryName} in Retford, Nottinghamshire`,
    description: `Browse ${formattedCategoryName.toLowerCase()} in Retford. Local listings and reviews.`,
    openGraph: {
      title: `${formattedCategoryName} in Retford, Nottinghamshire`,
      description: `Browse ${formattedCategoryName.toLowerCase()} in Retford. Local listings and reviews.`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedCategoryName} in Retford, Nottinghamshire`,
      description: `Browse ${formattedCategoryName.toLowerCase()} in Retford. Local listings and reviews.`,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.replace(/-/g, ' ');
  const businesses = await getBusinessesByCategory(categoryName);

  if (businesses.length === 0) {
    notFound();
  }

  const subcategories = await getSubcategoriesByCategory(categoryName);
  const premiumBusinesses = businesses.filter(b => b.is_premium);

  const categoryEmojis: { [key: string]: string } = {
    'shops-and-businesses': '🏪',
    'eat-and-drink': '🍽️',
    'accommodation': '🏨',
    'things-to-do': '🎭',
    'restaurants': '🍴',
    'cafes': '☕',
    'pubs': '🍺',
  };

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
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {categoryEmojis[params.slug] || '📍'} {categoryName.replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <div className="flex justify-center">
            <ShareButtons title={`${categoryName.replace(/\b\w/g, l => l.toUpperCase())} in Retford | Retford.info`} />
          </div>
        </div>
      </section>

      {/* Category Intro */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6">
          {categoryName.replace(/\b\w/g, l => l.toUpperCase())} in Retford
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
          Discover the best {categoryName.toLowerCase()} options in Retford. From local favorites to new
          discoveries, find everything you need to make the most of your time in our vibrant community.
        </p>
      </section>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-3xl font-bold mb-6">Categories within {categoryName.replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((subcategory) => {
              const subcategorySlug = subcategory.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const businessCount = businesses.filter(b => b.subcategory === subcategory).length;
              
              return (
                <Link
                  key={subcategory}
                  href={`/categories/${params.slug}/${subcategorySlug}`}
                  className="group"
                >
                  <div className="bg-gray-100 h-32 rounded-lg flex flex-col items-center justify-center hover:bg-accent hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-center px-4 group-hover:text-white">
                      {subcategory}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 group-hover:text-white">
                      {businessCount} {businessCount === 1 ? 'listing' : 'listings'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Premium Listings */}
      {premiumBusinesses.length > 0 && (
        <>
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

          {/* Map of Premium Businesses */}
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold mb-6">Find Our Featured Businesses</h3>
            <div className="h-96 rounded-lg overflow-hidden">
              <MultiMap 
                locations={premiumBusinesses.filter(b => b.address).map(b => ({
                  name: b.name,
                  address: b.address
                }))}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
