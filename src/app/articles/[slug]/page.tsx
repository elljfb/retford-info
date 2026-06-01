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
  const publishedTime = new Date(article.date).toISOString();
  const newsKeywords = [
    article.title,
    'Retford',
    'Nottinghamshire',
    'local news',
    'community',
  ].join(', ');

  const ogImage = article.image
    ? new URL(article.image, siteUrl).toString()
    : `/api/og?title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent('Article')}`;

  return {
    title: `${article.title} - Retford Local News`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - Retford Local News`,
      description: article.excerpt,
      images: [ogImage],
      type: 'article',
      publishedTime,
      authors: ['Retford.info'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} - Retford Local News`,
      description: article.excerpt,
      images: [ogImage],
    },
    other: [
      { name: 'news_keywords', content: newsKeywords },
      { property: 'article:published_time', content: publishedTime },
      { property: 'article:section', content: 'Local News' },
    ],
  };
}

export default async function ArticlePage({ params }: { params: ArticleParams }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, 4);

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

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          <div className="lg:flex-[0_0_66.67%] lg:max-w-[66.67%]">
            {/* Article Meta */}
            <article className="post type-post status-publish format-standard hentry">
              <time className="text-gray-500">{formatDate(article.date)}</time>

              {/* Article Content */}
              <div
                className="entry-content article-content text-gray-700 mb-12 mt-6"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </article>

            {/* Back to Articles */}
            <div className="mt-12 pt-12 border-t border-gray-300">
              <Link
                href="/articles"
                prefetch={false}
                className="inline-block bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors no-underline"
              >
                &larr; Back to Articles
              </Link>
            </div>
          </div>

          <div
            id="sidebar_btf"
            data-ad-slot="sidebar_btf"
            data-journey-target="sidebar_btf"
            style={{ flexBasis: '33.33%' }}
            className="sidebar_btf w-full lg:w-auto"
          >
            <aside className="wp-block-template-part sidebar_btf lg:sticky lg:top-8 space-y-8">
              {relatedArticles.length > 0 && (
                <section aria-labelledby="related-articles-heading">
                  <h2 id="related-articles-heading" className="text-xl font-bold mb-4">
                    Suggested Posts
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                    {relatedArticles.map(related => (
                      <Link
                        key={related.slug}
                        href={`/articles/${related.slug}`}
                        prefetch={false}
                        className="group block no-underline"
                      >
                        <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-accent-dark hover:shadow-md">
                          <div className="aspect-[16/9] bg-gray-100">
                            <img
                              src={related.image || '/articles/articles-cover.jpg'}
                              alt=""
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <time className="text-xs text-gray-500">{formatDate(related.date)}</time>
                            <h3 className="mt-2 text-base font-bold leading-snug text-gray-900 group-hover:text-accent-dark">
                              {related.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                              {related.excerpt}
                            </p>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
