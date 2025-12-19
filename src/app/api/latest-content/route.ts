import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';
import { getLatestAggregatedNews } from '@/lib/rss-feeds';

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
    });
  } catch (error) {
    console.error('Error fetching latest content:', error);
    return NextResponse.json({ articles: [], news: [] });
  }
}
