'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { useFilterStore } from '@/lib/store';
import { searchProducts } from '@/lib/search';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { catalogs, categories, showUnmatched, searchQuery, sortBy, sortOrder } = useFilterStore();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by matched status
    if (!showUnmatched) {
      filtered = filtered.filter(p => p.matched);
    }

    // Filter by catalogs
    if (catalogs.length > 0) {
      filtered = filtered.filter(p => catalogs.includes(p.catalog));
    }

    // Filter by categories
    if (categories.length > 0) {
      filtered = filtered.filter(p => categories.includes(p.category));
    }

    // Search
    if (searchQuery) {
      filtered = searchProducts(filtered, searchQuery);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'code':
          comparison = a.code.localeCompare(b.code, undefined, { numeric: true });
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
        case 'name':
        default:
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, catalogs, categories, showUnmatched, searchQuery, sortBy, sortOrder]);

  if (filteredProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <Package className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md">
          Try adjusting your filters or search terms to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
        </p>
      </div>
      
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.code} product={product} index={index % 20} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
