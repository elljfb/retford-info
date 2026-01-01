import Link from 'next/link';
import { getLatestArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Latest Articles for Retford, Nottinghamshire',
  description: 'Read the latest articles and stories from Retford.',
  openGraph: {
    title: 'Latest Articles for Retford, Nottinghamshire',
    description: 'Read the latest articles and stories from Retford.',
    images: [`${siteUrl}/api/og?title=Latest%20Articles&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Articles for Retford, Nottinghamshire',
    description: 'Read the latest articles and stories from Retford.',
    images: [`${siteUrl}/api/og?title=Latest%20Articles&subtitle=Retford.info`],
  },
};

export default async function ArticlesPage() {
  const articles = await getLatestArticles(10);

  return (
    <>
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/articles/articles-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">📝 Retford Articles</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <h2 className="text-4xl font-bold mb-6">Retford Articles</h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Welcome to our articles section, featuring in-depth stories and features about Retford and the local community. 
              Our articles cover local events, community highlights, business profiles, and everything that makes Retford special.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              These are locally written pieces that celebrate the people, places, and events that make our town unique. 
              From historical insights to modern developments, our articles provide a closer look at life in Retford.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Organising a local event?</strong> We'd love to cover it! If you want us to write about your community event, 
              fundraiser, or local initiative, please <a href="/contact" className="text-accent-dark hover:underline font-semibold">contact us</a>. 
              We offer free coverage for genuine local community events and are always looking for stories that matter to Retford residents.
            </p>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {article.image && (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!article.image && (
                  <div className="h-48 bg-gradient-to-br from-accent to-blue-300 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                )}
                <div className="p-4">
                  <time className="text-xs text-gray-500">{formatDate(article.date)}</time>
                  <h2 className="text-lg font-bold my-2 group-hover:text-accent-dark line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="inline-block mt-3 text-accent-dark text-sm font-semibold group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
