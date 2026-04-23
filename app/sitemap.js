import { getAllArticles } from '@/lib/articles';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  const articles = getAllArticles();

  const routes = [
    '',
    '/about',
    '/articles',
    '/authors/brenda-cooper',
    '/contact',
    '/editorial-policy',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/articles' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/articles' ? 0.9 : 0.7,
  }));

  const articleUrls = articles
    .filter((article) => !article.meta.noindex)
    .map((article) => {
      const parsedDate = new Date(article.meta.reviewedDate || article.meta.updatedDate || article.meta.date);
      const lastModified = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      };
    });

  return [...routes, ...articleUrls];
}
