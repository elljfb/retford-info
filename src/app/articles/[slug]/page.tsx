import Link from 'next/link';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';

type ArticleParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: ArticleParams }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  
  const ogImage = article.image 
    ? new URL(article.image, siteUrl).toString()
    : `/api/og?title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent('Article')}`;
  
  return {
    title: `${article.title} - Retford, Nottinghamshire`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - Retford, Nottinghamshire`,
      description: article.excerpt,
      images: [ogImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} - Retford, Nottinghamshire`,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: ArticleParams }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const relatedArticles = await getRelatedArticles(slug, 2);

  if (!article) {
    notFound();
  }

  return (
    <div className="single-post">
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: `url(${article.image || '/articles/articles-cover.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
          <div className="flex justify-center">
            <ShareButtons title={`${article.title} | Retford.info`} />
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Article Meta */}
        <article className="post type-post status-publish format-standard hentry">
          <time className="text-gray-500">{formatDate(article.date)}</time>

          {/* Article Content */}
          <div
            className="entry-content article-content text-gray-700 mb-12 mt-6"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-12 border-t border-gray-300">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(related => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  className="group"
                >
                  <div className="border border-gray-300 rounded-lg p-4 hover:border-accent-dark hover:shadow-md transition-all h-full">
                    <time className="text-sm text-gray-500">{formatDate(related.date)}</time>
                    <h3 className="text-lg font-bold mt-2 group-hover:text-accent-dark">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Articles */}
        <div className="mt-12 pt-12 border-t border-gray-300">
          <Link
            href="/articles"
            className="inline-block bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors no-underline"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
