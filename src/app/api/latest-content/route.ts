import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getLatestAggregatedNews } from '@/lib/rss-feeds';

export const revalidate = 3600;

export async function GET() {
  try {
    const articles = await getArticles();
    const news = await getLatestAggregatedNews(3);

    return NextResponse.json({
      articles: articles.slice(0, 3).map(a => ({
        title: a.title,
        slug: a.slug,
        date: a.date,
      })),
      news: news.map(n => ({
        title: n.title,
        link: n.link,
        source: n.source,
      })),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching latest content:', error);
    return NextResponse.json(
      { articles: [], news: [] },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  }
}
