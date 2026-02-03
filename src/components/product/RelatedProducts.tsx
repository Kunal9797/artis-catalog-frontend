'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/catalog/ProductCard';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({ products, title = 'Related Products' }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        {title}
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <ProductCard key={product.code} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
