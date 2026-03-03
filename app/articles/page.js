import Link from 'next/link';
import { formatArticleDate, getAllArticles } from '@/lib/articles';

export const metadata = {
  title: "Articles",
  description: "Browse our collection of informative articles and guides about Retford, Nottinghamshire. Discover local attractions, history, and things to do.",
};

export default function Articles() {
  const articles = getAllArticles();

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Articles & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore our comprehensive collection of articles about Retford, covering local attractions, history, events, and practical information for visitors and residents.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-700 transition-colors">
                      {article.meta.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{article.meta.description}</p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500" dateTime={article.meta.date}>
                      {formatArticleDate(article.meta.date)}
                    </time>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
