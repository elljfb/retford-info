import { NextResponse } from 'next/server';
import { getLatestArticles } from '@/lib/articles';

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') || '0');
  const limit = parseInt(searchParams.get('limit') || '30');

  const allArticles = await getLatestArticles(1000); // Get all articles
  const paginatedArticles = allArticles.slice(offset, offset + limit);
  const hasMore = offset + limit < allArticles.length;

  return NextResponse.json(
    {
      articles: paginatedArticles,
      hasMore,
      total: allArticles.length,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
