'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/catalog/SearchBar';
import FilterPanel from '@/components/catalog/FilterPanel';
import ProductGrid from '@/components/catalog/ProductGrid';
import { getAllProducts, getUniqueCategories } from '@/lib/products';
import { useFilterStore } from '@/lib/store';
import { CatalogType } from '@/types/product';

function CatalogContent() {
  const searchParams = useSearchParams();
  const products = getAllProducts();
  const categories = getUniqueCategories();
  const { setSearchQuery, toggleCatalog, toggleCategory, catalogs, categories: selectedCategories } = useFilterStore();

  // Handle URL params on mount
  useEffect(() => {
    const q = searchParams.get('q');
    const catalog = searchParams.get('catalog');
    const category = searchParams.get('category');

    // Reset filters first, then apply URL params
    if (q || catalog || category) {
      // Clear existing selections
      catalogs.forEach(c => toggleCatalog(c));
      selectedCategories.forEach(c => toggleCategory(c));
      setSearchQuery('');
    }

    if (q) {
      setSearchQuery(q);
    }

    if (catalog) {
      toggleCatalog(catalog as CatalogType);
    }

    if (category) {
      toggleCategory(category);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Product Catalog
            </h1>
            <p className="text-gray-500">
              Explore our complete collection of premium decorative laminates
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <SearchBar />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter (Desktop) */}
          <FilterPanel categories={categories} />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
