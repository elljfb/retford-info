import { NextResponse } from 'next/server';
import { getArticles, getNews } from '@/lib/articles';

export async function GET() {
  try {
    const articles = await getArticles();
    const news = await getNews();

    return NextResponse.json({
      articles: articles.slice(0, 3).map(a => ({
        title: a.title,
        slug: a.slug,
        date: a.date,
      })),
      news: news.slice(0, 3).map(n => ({
        title: n.title,
        slug: n.slug,
        date: n.date,
      })),
    });
  } catch (error) {
    console.error('Error fetching latest content:', error);
    return NextResponse.json({ articles: [], news: [] });
  }
}
