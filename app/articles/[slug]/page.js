import { formatArticleDate, getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import markdownToHtml from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
