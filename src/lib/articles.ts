import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  html: string;
  image?: string;
}

async function readArticlesFromDir(dir: string): Promise<Article[]> {
  const filePath = path.join(process.cwd(), 'data', dir);
  
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const files = fs.readdirSync(filePath).filter(f => f.endsWith('.md'));
  
  const articles = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(filePath, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { data, content: body } = matter(content);
      const html = await marked(body);

      return {
        slug: file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || body.slice(0, 150) + '...',
        content: body,
        html: html,
        image: data.image || undefined,
      };
    })
  );

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticles(): Promise<Article[]> {
  return readArticlesFromDir('articles');
}

export async function getNews(): Promise<Article[]> {
  return readArticlesFromDir('news');
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(a => a.slug === slug) || null;
}

export async function getNewsBySlug(slug: string): Promise<Article | null> {
  const news = await getNews();
  return news.find(n => n.slug === slug) || null;
}

export async function getLatestArticles(count: number = 10): Promise<Article[]> {
  const articles = await getArticles();
  return articles.slice(0, count);
}

export async function getLatestNews(count: number = 10): Promise<Article[]> {
  const news = await getNews();
  return news.slice(0, count);
}

export async function getRelatedArticles(slug: string, count: number = 2): Promise<Article[]> {
  const articles = await getArticles();
  const current = articles.find(a => a.slug === slug);
  
  if (!current) return [];

  return articles
    .filter(a => a.slug !== slug)
    .slice(0, count);
}

export async function getRelatedNews(slug: string, count: number = 2): Promise<Article[]> {
  const news = await getNews();
  const current = news.find(n => n.slug === slug);
  
  if (!current) return [];

  return news
    .filter(n => n.slug !== slug)
    .slice(0, count);
}
