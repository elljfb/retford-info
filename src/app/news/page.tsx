import { getAggregatedNews } from '@/lib/rss-feeds';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Local News - Retford, Nottinghamshire',
  description: 'Stay updated with the latest news from Retford and surrounding areas',
  openGraph: {
    title: 'Local News - Retford, Nottinghamshire',
    description: 'Stay updated with the latest news from Retford and surrounding areas',
    images: [`${siteUrl}/api/og?title=Latest%20News&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local News - Retford, Nottinghamshire',
    description: 'Stay updated with the latest news from Retford and surrounding areas',
    images: [`${siteUrl}/api/og?title=Latest%20News&subtitle=Retford.info`],
  },
};

export default async function NewsPage() {
  const news = await getAggregatedNews(30);

  return (
    <>
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/news/news-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">📰 Retford News</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <h2 className="text-4xl font-bold mb-6">Retford News</h2>
          <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700">
            Want to know what's happening in Retford? Welcome to our news page, which brings together the latest news 
            from local and regional sources to keep you informed about your community.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Retford's local newspapers include the <strong>Retford Times</strong> and the <strong>Worksop Guardian</strong>. 
            The local radio station is <strong>BBC Radio Nottingham</strong>, which covers news from across North Nottinghamshire. 
            For regional news, <strong>BBC East Midlands</strong> provides coverage of the wider area.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            You may also want to visit our <a href="/whats-on" className="text-accent-dark hover:underline font-semibold">What's On</a> page, 
            which lists Retford's upcoming events, or explore our <a href="/articles" className="text-accent-dark hover:underline font-semibold">Articles</a> section 
            for in-depth features about the town and local community.
          </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <a
                key={`${article.source}-${index}`}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {article.image && (
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                {!article.image && (
                  <div className="h-48 bg-gradient-to-br from-accent to-blue-300 flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-dark">{article.source}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <time className="text-xs text-gray-500">{formatDate(article.pubDate)}</time>
                  <h2 className="text-lg font-bold my-2 group-hover:text-accent-dark line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  <span className="inline-block mt-3 text-accent-dark text-sm font-semibold group-hover:underline">
                    Read on {article.source} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
