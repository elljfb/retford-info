import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface Business {
  name: string;
  slug: string;
  category: string | string[]; // Can be single or multiple categories
  subcategory: string | string[]; // Can be single or multiple subcategories
  address: string;
  phone: string;
  is_premium: boolean;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  description?: string;
  images?: string;
  opening_hours?: string;
}

export function getBusinessValues(value: string | string[] | undefined): string[] {
  const values = Array.isArray(value) ? value : [value];
  return values.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function slugifyBusinessValue(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function formatBusinessSlug(value: string) {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/ And /g, ' and ');
}

export async function getBusinesses(): Promise<Business[]> {
  const filePath = path.join(process.cwd(), 'data', 'businesses.csv');
  
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      complete: (results) => {
        const businesses = (results.data as any[])
          .filter(row => row.name) // Filter out empty rows
          .map(row => {
            // Helper function to parse semicolon-separated values
            const parseMultiple = (value: string) => {
              if (!value || value.trim() === '') return '';
              const items = value.split(';').map(item => item.trim()).filter(item => item);
              return items.length > 1 ? items : items[0] || '';
            };

            return {
              name: row.name,
              slug: row.slug,
              category: parseMultiple(row.category),
              subcategory: parseMultiple(row.subcategory),
              address: row.address,
              phone: row.phone,
              is_premium: row.is_premium?.toUpperCase() === 'TRUE' || row.is_premium === '1',
              email: row.email || undefined,
              website: row.website || undefined,
              facebook: row.facebook || undefined,
              instagram: row.instagram || undefined,
              twitter: row.twitter || undefined,
              description: row.description || undefined,
              images: row.images || undefined,
              opening_hours: row.opening_hours || undefined,
            };
          });
        resolve(businesses);
      },
      error: (error: unknown) => {
        reject(error);
      },
    });
  });
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const businesses = await getBusinesses();
  return businesses.find(b => b.slug === slug) || null;
}

export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => {
    const categories = getBusinessValues(b.category);
    return categories.some(cat => cat.toLowerCase() === category.toLowerCase());
  });
}

export async function getBusinessesBySubcategory(subcategory: string): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => {
    const subcategories = getBusinessValues(b.subcategory);
    return subcategories.some(sub => sub.toLowerCase() === subcategory.toLowerCase());
  });
}

export async function getCategories(): Promise<string[]> {
  const businesses = await getBusinesses();
  const categoriesSet = new Set<string>();
  
  businesses.forEach(b => {
    const categories = getBusinessValues(b.category);
    categories.forEach(cat => categoriesSet.add(cat));
  });
  
  return Array.from(categoriesSet).sort();
}

export async function getSubcategoriesByCategory(category: string): Promise<string[]> {
  const businesses = await getBusinessesByCategory(category);
  const subcategoriesSet = new Set<string>();
  
  businesses.forEach(b => {
    const subcategories = getBusinessValues(b.subcategory);
    subcategories.forEach(sub => subcategoriesSet.add(sub));
  });
  
  return Array.from(subcategoriesSet).sort();
}

export async function getPremiumBusinesses(): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => b.is_premium);
}

export async function getBasicBusinesses(): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => !b.is_premium);
}
