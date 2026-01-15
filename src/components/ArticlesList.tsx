'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

interface ArticlesListProps {
  initialArticles: Article[];
  totalCount: number;
}

export default function ArticlesList({ initialArticles, totalCount }: ArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length < totalCount);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/articles?offset=${articles.length}&limit=30`);
      const data = await response.json();
      
      setArticles([...articles, ...data.articles]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No articles yet. Check back soon!</p>
        </div>
      ) : (
        <>
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

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load More Articles'}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
