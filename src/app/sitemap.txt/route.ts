import { getBusinesses, getCategories, getSubcategoriesByCategory, slugifyBusinessValue } from '@/lib/businesses';
import { getArticles, getNews } from '@/lib/articles';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://retford.info';

  const urls: string[] = [];

  // Static pages
  urls.push(baseUrl);
  urls.push(`${baseUrl}/about`);
  urls.push(`${baseUrl}/contact`);
  urls.push(`${baseUrl}/advertise`);
  urls.push(`${baseUrl}/articles`);
  urls.push(`${baseUrl}/news`);
  urls.push(`${baseUrl}/whats-on`);
  urls.push(`${baseUrl}/car-parks`);
  urls.push(`${baseUrl}/weather`);
  urls.push(`${baseUrl}/privacy`);
  urls.push(`${baseUrl}/terms`);

  // Category pages
  const categories = await getCategories();
  for (const category of categories) {
    const categorySlug = slugifyBusinessValue(category);
    urls.push(`${baseUrl}/categories/${categorySlug}`);
  }

  // Subcategory pages
  for (const category of categories) {
    const categorySlug = slugifyBusinessValue(category);
    const subcategories = await getSubcategoriesByCategory(category);
    
    for (const subcategory of subcategories) {
      const subcategorySlug = slugifyBusinessValue(subcategory);
      urls.push(`${baseUrl}/categories/${categorySlug}/${subcategorySlug}`);
    }
  }

  // Business pages
  const businesses = await getBusinesses();
  for (const business of businesses) {
    urls.push(`${baseUrl}/business/${business.slug}`);
  }

  // Article pages
  const articles = await getArticles();
  for (const article of articles) {
    urls.push(`${baseUrl}/articles/${article.slug}`);
  }

  // News pages
  const news = await getNews();
  for (const article of news) {
    urls.push(`${baseUrl}/news/${article.slug}`);
  }

  // Join all URLs with newlines
  const txtContent = urls.join('\n');

  return new NextResponse(txtContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
