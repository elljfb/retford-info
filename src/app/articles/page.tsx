import { getLatestArticles } from '@/lib/articles';
import ArticlesList from '@/components/ArticlesList';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Latest Articles for Retford, Nottinghamshire',
  description: 'Read the latest articles and stories from Retford.',
  openGraph: {
    title: 'Latest Articles for Retford, Nottinghamshire',
    description: 'Read the latest articles and stories from Retford.',
    images: [`${siteUrl}/api/og?title=Latest%20Articles&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Articles for Retford, Nottinghamshire',
    description: 'Read the latest articles and stories from Retford.',
    images: [`${siteUrl}/api/og?title=Latest%20Articles&subtitle=Retford.info`],
  },
};

export default async function ArticlesPage() {
  const initialArticles = await getLatestArticles(30);
  const totalArticles = await getLatestArticles(1000);

  return (
    <>
      {/* Cover Section */}
      <section 
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/articles/articles-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">📝 Retford Articles</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <h2 className="text-4xl font-bold mb-6">Retford Articles</h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Welcome to our articles section, featuring in-depth stories and features about Retford and the local community. 
              Our articles cover local events, community highlights, business profiles, and everything that makes Retford special.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              These are locally written pieces that celebrate the people, places, and events that make our town unique. 
              From historical insights to modern developments, our articles provide a closer look at life in Retford.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Organising a local event?</strong> We'd love to cover it! If you want us to write about your community event, 
              fundraiser, or local initiative, please <a href="/contact" className="text-accent-dark hover:underline font-semibold">contact us</a>. 
              We offer free coverage for genuine local community events and are always looking for stories that matter to Retford residents.
            </p>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <ArticlesList initialArticles={initialArticles} totalCount={totalArticles.length} />
      </section>
    </>
  );
}
