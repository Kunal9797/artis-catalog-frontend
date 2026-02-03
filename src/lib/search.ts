import Fuse from 'fuse.js';
import { Product } from '@/types/product';

let fuseInstance: Fuse<Product> | null = null;

export function initSearch(products: Product[]): Fuse<Product> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(products, {
      keys: [
        { name: 'code', weight: 3 },
        { name: 'name', weight: 2 },
        { name: 'supplierCode', weight: 1.5 },
        { name: 'category', weight: 1 },
        { name: 'catalog', weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }
  return fuseInstance;
}

export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  if (!query || query.length < 2) return products;
  
  const fuse = initSearch(products);
  const results = fuse.search(query);
  return results.map(r => r.item);
}
