import { getAllArticles } from '@/lib/articles';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  const articles = getAllArticles();

  const staticRoutes = [
    '',
    '/about',
    '/articles',
    '/authors/brenda-cooper',
    '/contact',
    '/editorial-policy',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const urls = [
    ...staticRoutes.map((route) => `${baseUrl}${route}`),
    ...articles
      .filter((article) => !article.meta.noindex)
      .map((article) => `${baseUrl}/articles/${article.slug}`),
  ];

  return new Response(`${urls.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
