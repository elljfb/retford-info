import Link from 'next/link';
import { getLatestNews } from '@/lib/articles';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Latest News | Retford.info',
  description: 'Stay updated with the latest news from Retford.',
};

export default async function NewsPage() {
  const news = await getLatestNews(10);

  return (
    <>
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/news/news-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-6xl font-bold mb-4">📰 Latest News</h1>
        </div>
      </section>

      {/* News List */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {news.map(article => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="block group"
              >
                <article className="border-b border-gray-300 pb-8 hover:bg-gray-50 p-4 rounded transition-colors">
                  <time className="text-sm text-gray-500">{formatDate(article.date)}</time>
                  <h2 className="text-3xl font-bold my-2 group-hover:text-accent-dark">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-accent-dark font-semibold group-hover:underline">
                    Read More →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
