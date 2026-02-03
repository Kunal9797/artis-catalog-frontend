import catalogData from '@/data/catalog.json';
import { Product } from '@/types/product';

// Type assertion since we know the structure
const products = catalogData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getMatchedProducts(): Product[] {
  return products.filter(p => p.matched);
}

export function getProductByCode(code: string): Product | undefined {
  return products.find(p => p.code === code);
}

export function getProductsByCatalog(catalog: string): Product[] {
  return products.filter(p => p.catalog === catalog);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  // First try same category and catalog
  let related = products.filter(
    p => p.code !== product.code && p.catalog === product.catalog && p.category === product.category
  );
  
  // If not enough, add same category from other catalogs
  if (related.length < limit) {
    const sameCategory = products.filter(
      p => p.code !== product.code && p.category === product.category && p.catalog !== product.catalog
    );
    related = [...related, ...sameCategory];
  }
  
  // If still not enough, add same catalog
  if (related.length < limit) {
    const sameCatalog = products.filter(
      p => p.code !== product.code && p.catalog === product.catalog && !related.includes(p)
    );
    related = [...related, ...sameCatalog];
  }
  
  return related.slice(0, limit);
}

export function getUniqueCategories(): string[] {
  const categories = new Set<string>();
  products.forEach(p => {
    if (p.category) categories.add(p.category);
  });
  return Array.from(categories).sort();
}

export function getCatalogStats() {
  const stats = {
    total: products.length,
    matched: products.filter(p => p.matched).length,
    byCatalog: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
  };
  
  products.forEach(p => {
    stats.byCatalog[p.catalog] = (stats.byCatalog[p.catalog] || 0) + 1;
    if (p.category) {
      stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
    }
  });
  
  return stats;
}
