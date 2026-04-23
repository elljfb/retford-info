import Link from 'next/link';
import { formatArticleDate, getAllArticles } from '@/lib/articles';

export const metadata = {
  title: "Retford in Nottinghamshire | Information for Residents and Visitors",
  description: "Retford.info is an independent local guide to Retford, Nottinghamshire, with reviewed articles on things to do, local history, practical information, and everyday life in the town.",
  alternates: {
    canonical: "/",
  },
};

const featuredGuides = [
  'one-day-in-retford-a-first-time-visitors-itinerary',
  'the-ultimate-retford-takeaway-guide',
  'is-retford-a-nice-place-to-live',
  'retford-and-the-mayflower-pilgrims',
];

export default function Home() {
  const articles = getAllArticles();
  const reviewedArticles = articles.filter((article) => article.meta.reviewedDate);
  const latestReviewed = reviewedArticles.slice(0, 3);
  const featuredArticles = featuredGuides
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean);
  const sourceCount = articles.reduce((total, article) => total + article.meta.sources.length, 0);

  return (
    <div className="bg-white">
      <section
        className="relative min-h-[72vh] flex items-end bg-gray-900"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.75)), url('/images/articles-cover.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Independent Local Guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Retford guides with real review dates, named authorship, and local context.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-blue-50">
            Retford.info covers the town as a place people actually use: where to go, what has changed, what is worth seeing, and which details still need checking with official sources.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Explore reviewed guides
            </Link>
            <Link
              href="/authors/brenda-cooper"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/50 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Meet the contributor
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-gray-900">{articles.length}</div>
              <div className="mt-1 text-sm text-gray-600">published guides</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{reviewedArticles.length}</div>
              <div className="mt-1 text-sm text-gray-600">with dated editorial review</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{sourceCount}</div>
              <div className="mt-1 text-sm text-gray-600">source notes currently shown</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">1</div>
              <div className="mt-1 text-sm text-gray-600">named local contributor page</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What makes this site useful</h2>
            <p className="mt-4 text-lg text-gray-600">
              This site works best when it is transparent about what is fixed, what is current, and what is still based on a wider local reading of the town rather than one official source.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Named authorship</h3>
              <p className="mt-3 text-gray-600">
                Articles now link to a real contributor page instead of hiding behind a generic site label.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Real review dates</h3>
              <p className="mt-3 text-gray-600">
                Time-sensitive guides show fixed review dates rather than pretending every page was checked today.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Source notes</h3>
              <p className="mt-3 text-gray-600">
                Where a guide depends on organisers, public listings, or official information, those checks are shown below the article.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Corrections welcome</h3>
              <p className="mt-3 text-gray-600">
                Readers can report changes and errors directly so practical pages can be reviewed rather than left to drift.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start with the strongest guides</h2>
              <p className="mt-4 text-lg text-gray-600">
                These are the pages most likely to help a first-time visitor, a new resident, or someone trying to make sense of Retford beyond a generic town summary.
              </p>
            </div>
            <Link href="/articles" className="text-blue-700 hover:text-blue-800 font-medium">
              View all articles
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <article key={article.slug} className="rounded-lg overflow-hidden bg-white border border-gray-200">
                {article.meta.image && (
                  <Link href={`/articles/${article.slug}`} className="block">
                    <div className="h-56 bg-gray-200 overflow-hidden">
                      <img
                        src={article.meta.image}
                        alt={article.meta.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <time dateTime={article.meta.date}>Published {formatArticleDate(article.meta.date)}</time>
                    {article.meta.reviewedDate && (
                      <span className="text-blue-700">Reviewed {formatArticleDate(article.meta.reviewedDate)}</span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-700 transition-colors">
                      {article.meta.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-gray-600">{article.meta.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {latestReviewed.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recently reviewed</h2>
              <p className="mt-4 text-lg text-gray-600">
                A small but growing set of guides now carries explicit review dates and source notes.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestReviewed.map((article) => (
                <article key={article.slug} className="rounded-lg border border-gray-200 p-6">
                  <div className="text-sm text-blue-700">
                    Reviewed {formatArticleDate(article.meta.reviewedDate)}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-700 transition-colors">
                      {article.meta.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-gray-600">{article.meta.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Help keep the practical pages accurate</h2>
          <p className="mt-4 text-xl text-blue-50 max-w-3xl">
            Local information changes quickly. If a venue closes, an event moves, or a guide needs correcting, please send it in so the next review pass starts from something real.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Contact Retford.info
            </Link>
            <Link
              href="/editorial-policy"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/40 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Read the editorial policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
