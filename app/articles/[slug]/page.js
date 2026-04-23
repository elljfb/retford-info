import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatArticleDate, getAllArticles, getArticleBySlug } from '@/lib/articles';
import { getAuthorBySlug } from '@/lib/authors';
import markdownToHtml from '@/lib/markdown';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !article.meta.published) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.meta.title,
    description: article.meta.description,
    keywords: article.meta.keywords || [],
    authors: [{ name: article.meta.author }],
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.date,
      modifiedTime: article.meta.reviewedDate || article.meta.updatedDate || article.meta.date,
      url: `https://retford.info/articles/${slug}`,
      images: article.meta.image ? [article.meta.image] : [],
    },
    robots: {
      index: !article.meta.noindex,
      follow: true,
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !article.meta.published) {
    notFound();
  }

  const relatedArticles = getAllArticles()
    .filter((item) => item.slug !== slug && !item.meta.noindex)
    .slice(0, 3);
  const author = getAuthorBySlug(article.meta.authorSlug);
  const content = await markdownToHtml(article.content);

  return (
    <div className="bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Back to articles
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <time dateTime={article.meta.date}>Published {formatArticleDate(article.meta.date)}</time>
            {article.meta.reviewedDate && (
              <time dateTime={article.meta.reviewedDate}>
                Reviewed {formatArticleDate(article.meta.reviewedDate)}
              </time>
            )}
            {article.meta.updatedDate && (
              <time dateTime={article.meta.updatedDate}>
                Updated {formatArticleDate(article.meta.updatedDate)}
              </time>
            )}
          </div>
          {article.meta.image && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={article.meta.image}
                alt={article.meta.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-5">
              <p className="text-sm text-gray-700">
                <strong>Author:</strong>{' '}
                {author ? (
                  <Link href={`/authors/${author.slug}`} className="text-blue-700 hover:text-blue-800">
                    {author.name}
                  </Link>
                ) : (
                  article.meta.author
                )}
              </p>
              {author?.shortBio && (
                <p className="mt-2 text-sm text-gray-700">{author.shortBio}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-5">
              <h2 className="text-base font-semibold text-gray-900">How this article was handled</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {article.meta.reviewedDate && <li>Last editorial review: {formatArticleDate(article.meta.reviewedDate)}.</li>}
                {article.meta.sources.length > 0 && <li>Includes {article.meta.sources.length} source note{article.meta.sources.length > 1 ? 's' : ''} below.</li>}
                {!article.meta.reviewedDate && <li>This guide still needs a dated review pass for time-sensitive details.</li>}
              </ul>
            </div>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {article.meta.reportingNote && (
          <section className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Reporting Note</h2>
            <p className="text-gray-700">{article.meta.reportingNote}</p>
          </section>
        )}

        {article.meta.sources.length > 0 && (
          <section className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sources and Checks</h2>
            <ul className="space-y-3 text-gray-700">
              {article.meta.sources.map((source) => (
                <li key={`${source.title}-${source.url || source.note || 'source'}`}>
                  {source.url ? (
                    <a href={source.url} className="font-medium text-blue-700 hover:text-blue-800">
                      {source.title}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-900">{source.title}</span>
                  )}
                  {source.note && <span className="text-gray-600"> - {source.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Corrections and Updates</h2>
          <p className="text-gray-700">
            If you spot an error or have updated local information, please see our{' '}
            <Link href="/editorial-policy" className="text-blue-600 hover:text-blue-700 font-medium">
              editorial policy
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              contact us
            </Link>.
          </p>
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.slug}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/articles/${relatedArticle.slug}`} className="block">
                    {relatedArticle.meta.image ? (
                      <div className="relative h-40">
                        <img
                          src={relatedArticle.meta.image}
                          alt={relatedArticle.meta.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-100" />
                    )}
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                      <Link
                        href={`/articles/${relatedArticle.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {relatedArticle.meta.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
