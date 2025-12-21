import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface Business {
  name: string;
  slug: string;
  category: string;
  subcategory: string;
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
          .map(row => ({
            name: row.name,
            slug: row.slug,
            category: row.category,
            subcategory: row.subcategory,
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
          }));
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
  return businesses.filter(b => b.category.toLowerCase() === category.toLowerCase());
}

export async function getBusinessesBySubcategory(subcategory: string): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => b.subcategory.toLowerCase() === subcategory.toLowerCase());
}

export async function getCategories(): Promise<string[]> {
  const businesses = await getBusinesses();
  const categories = new Set(businesses.map(b => b.category));
  return Array.from(categories).sort();
}

export async function getSubcategoriesByCategory(category: string): Promise<string[]> {
  const businesses = await getBusinessesByCategory(category);
  const subcategories = new Set(businesses.map(b => b.subcategory));
  return Array.from(subcategories).sort();
}

export async function getPremiumBusinesses(): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => b.is_premium);
}

export async function getBasicBusinesses(): Promise<Business[]> {
  const businesses = await getBusinesses();
  return businesses.filter(b => !b.is_premium);
}
