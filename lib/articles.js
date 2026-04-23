import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAuthorBySlug } from '@/lib/authors';

const articlesDirectory = path.join(process.cwd(), 'articles');

function getDayOrdinal(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  const lastDigit = day % 10;
  if (lastDigit === 1) return `${day}st`;
  if (lastDigit === 2) return `${day}nd`;
  if (lastDigit === 3) return `${day}rd`;
  return `${day}th`;
}

export function formatArticleDate(value) {
  if (!value) return '';

  const isoMatch = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let date;

  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    date = new Date(Date.UTC(year, month, day));
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const day = date.getUTCDate();
  const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  return `${getDayOrdinal(day)} ${month} ${year}`;
}

function normalizeArticleMeta(meta = {}) {
  const author = getAuthorBySlug(meta.authorSlug || 'brenda-cooper');
  const normalizeDateField = (value) => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toISOString().split('T')[0];
    }

    return value || null;
  };

  const normalizeSources = (sources = []) => {
    if (!Array.isArray(sources)) {
      return [];
    }

    return sources
      .map((source) => {
        if (typeof source === 'string') {
          return {
            title: source,
          };
        }

        if (!source || typeof source !== 'object') {
          return null;
        }

        return {
          title: source.title || source.label || '',
          url: source.url || '',
          note: source.note || '',
        };
      })
      .filter((source) => source && source.title);
  };

  const normalizedMeta = {
    ...meta,
    date: normalizeDateField(meta.date),
    description: meta.description || meta.excerpt || '',
    author: meta.author || author?.name || 'Brenda Cooper',
    authorSlug: meta.authorSlug || author?.slug || 'brenda-cooper',
    reviewedDate: normalizeDateField(meta.reviewedDate),
    updatedDate: normalizeDateField(meta.updatedDate),
    noindex: meta.noindex === true,
    reportingNote: meta.reportingNote || '',
    sources: normalizeSources(meta.sources),
    published: meta.published !== false,
  };

  return normalizedMeta;
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  const files = fs.readdirSync(articlesDirectory);
  // Only return .md files, exclude directories and hidden files
  return files.filter(file => file.endsWith('.md') && !file.startsWith('.'));
}

export function getArticleBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: normalizeArticleMeta(data),
    content,
  };
}

export function getAllArticles() {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(article => article !== null && article.meta.published)
    .sort((article1, article2) => {
      const date1 = new Date(article1.meta.date);
      const date2 = new Date(article2.meta.date);
      return date2 - date1; // Sort descending (newest first)
    });
  return articles;
}
