import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAuthorBySlug, getAllAuthors } from '@/lib/authors';
import { getAllArticles, formatArticleDate } from '@/lib/articles';

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: author.name,
    description: author.shortBio,
    alternates: {
      canonical: `/authors/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = getAllArticles()
    .filter((article) => article.meta.authorSlug === slug)
    .slice(0, 12);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/about" className="text-sm font-medium text-blue-700 hover:text-blue-800">
          Back to about Retford.info
        </Link>

        <header className="mt-6 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
          <div className="max-w-[220px]">
            {author.image && (
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                <Image
                  src={author.image}
                  alt={author.name}
                  width={220}
                  height={280}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Named Contributor</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">{author.name}</h1>
            <p className="mt-4 text-xl text-gray-600">{author.role}</p>
          </div>
        </header>

        <div className="mt-10 space-y-5 prose prose-lg max-w-none text-gray-700">
          {author.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900">How Brenda's work is handled on-site</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>Articles show real review dates rather than an automatically refreshed "reviewed today" label.</li>
            <li>Source notes are included where a guide depends on official data, event organisers, or local ranking platforms.</li>
            <li>Time-sensitive practical details are reviewed separately from evergreen town history features.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Recently Reviewed Guides</h2>
          <div className="mt-6 grid gap-5">
            {articles.map((article) => (
              <article key={article.slug} className="rounded-lg border border-gray-200 p-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <time dateTime={article.meta.date}>{formatArticleDate(article.meta.date)}</time>
                  {article.meta.reviewedDate && (
                    <span>Reviewed {formatArticleDate(article.meta.reviewedDate)}</span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
                    {article.meta.title}
                  </Link>
                </h3>
                <p className="mt-2 text-gray-600">{article.meta.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
