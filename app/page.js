import Link from 'next/link';
import { formatArticleDate, getAllArticles } from '@/lib/articles';

export const metadata = {
  title: "Retford in Nottinghamshire | Information for Residents and Visitors",
  description: "Welcome to Retford.info, your comprehensive guide to Retford, Nottinghamshire. Discover local attractions, history, events, and things to do.",
};

export default function Home() {
  const articles = getAllArticles().slice(0, 6);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Retford
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the charm of this historic Nottinghamshire market town. Your complete guide to local attractions, history, and things to do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Explore Articles
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Retford Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Discover Historic Retford
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Nestled in the heart of North Nottinghamshire, Retford is a thriving market town with over 1,000 years of recorded history. Mentioned in the Domesday Book of 1086, this ancient settlement has evolved from a medieval trading centre into a modern community while retaining its historic character and charm.
                </p>
                <p className="mb-4">
                  Retford has long been an important market and coaching town in North Nottinghamshire, with heritage landmarks including St Swithun&apos;s Church, the historic market square, and elegant Georgian streets.
                </p>
                <p className="mb-4">
                  The town has strong transport links via the A1, A620 and A638, plus direct rail services to London, Doncaster, Lincoln and beyond. Retford town centre combines traditional market character with independent shops, cafes, and everyday services.
                </p>
                <p>
                  Whether you're planning to visit for the rich historical heritage, explore the surrounding countryside and nature reserves, or discover local attractions, Retford provides an authentic English market town experience with modern amenities and warm community spirit.
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Location:</strong>
                      <span className="text-gray-600"> North Nottinghamshire, England. District: Bassetlaw</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Population:</strong>
                      <span className="text-gray-600"> Market town serving the wider Bassetlaw area</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Heritage:</strong>
                      <span className="text-gray-600"> Founded before 1086, Domesday Book entry</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Transport:</strong>
                      <span className="text-gray-600"> Rail station with services to major cities</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Nickname:</strong>
                      <span className="text-gray-600"> Historic market town</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Retford Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Visit Retford?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From historic landmarks to natural beauty, Retford offers diverse attractions for every visitor
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rich History & Heritage</h3>
              <p className="text-gray-600">
                Explore St Swithun&apos;s Church, Bassetlaw Museum, and Retford&apos;s historic streets to discover the town&apos;s local heritage.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Beauty & Parks</h3>
              <p className="text-gray-600">
                Enjoy nearby green spaces including Kings&apos; Park, Idle Valley Nature Reserve, and walks along the Chesterfield Canal.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Shopping & Markets</h3>
              <p className="text-gray-600">
                Traditional market town with two shopping centres, regular outdoor markets, independent retailers, and a vibrant town centre atmosphere with cafes and restaurants.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Heritage</h3>
              <p className="text-gray-600">
                Discover Retford&apos;s market-town character through its civic buildings, churches, and long-standing local traditions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Location</h3>
              <p className="text-gray-600">
                Ideally positioned between Sheffield, Nottingham, and Lincoln. Easy access via A-roads and direct rail links make Retford a perfect base for exploring the region.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community & Culture</h3>
              <p className="text-gray-600">
                Welcoming community with regular events, festivals, local pubs, sports facilities, and a strong sense of local identity. Experience authentic English market town life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-xl text-gray-600">
                Discover more about Retford through our informative guides
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {article.meta.image && (
                    <Link href={`/articles/${article.slug}`}>
                      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                        <img
                          src={article.meta.image}
                          alt={article.meta.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link href={`/articles/${article.slug}`} className="hover:text-blue-700 transition-colors">
                        {article.meta.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.meta.description}</p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500" dateTime={article.meta.date}>
                        {formatArticleDate(article.meta.date)}
                      </time>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Plan Your Visit to Retford
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive guides to make the most of your time in this historic Nottinghamshire town.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
