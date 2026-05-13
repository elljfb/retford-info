import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  const articles = await getArticles();
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const recentArticles = articles.filter((article) => {
    const publishedDate = new Date(article.date);
    return publishedDate > cutoff;
  });

  const urlEntries = recentArticles
    .map((article) => {
      const loc = `${baseUrl}/articles/${article.slug}`;
      const publicationDate = new Date(article.date).toISOString();
      const keywords = escapeXml([
        article.title,
        'Retford',
        'Nottinghamshire',
        'local news',
        'community',
      ].join(', '));

      return `  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Retford.info</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${keywords}</news:keywords>
    </news:news>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urlEntries}\n</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
