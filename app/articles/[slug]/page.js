import { formatArticleDate, getAllArticles, getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import markdownToHtml from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.meta.title,
    description: article.meta.description,
    keywords: article.meta.keywords || [],
    authors: [{ name: "Retford.info" }],
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.date,
      url: `https://retford.info/articles/${slug}`,
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const relatedArticles = getAllArticles()
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const reviewedDate = new Date();
  const reviewedDateIso = reviewedDate.toISOString().split('T')[0];
  
  if (!article) {
    notFound();
  }
  
  const content = await markdownToHtml(article.content);

  return (
    <div className="bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            ← Back to Articles
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.meta.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-8">
            <time dateTime={article.meta.date}>{formatArticleDate(article.meta.date)}</time>
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
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-5">
            <p className="text-sm text-gray-700">
              <strong>Author:</strong> Retford.info Editorial Team
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Last reviewed:</strong>{' '}
              <time dateTime={reviewedDateIso}>{formatArticleDate(reviewedDateIso)}</time>
            </p>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Corrections and Updates</h2>
          <p className="text-gray-700">
            We aim for accuracy and keep articles under review. If you spot an error or have updated local information, please see our{' '}
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
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
