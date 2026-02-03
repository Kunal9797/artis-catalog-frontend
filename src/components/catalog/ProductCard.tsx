'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product, CATALOG_COLORS, TEXTURE_MAP } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const catalogColor = CATALOG_COLORS[product.catalog];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/product/${product.code}`}>
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          {/* Image Container */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            {!imageError ? (
              <>
                {/* Blur placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.lamital.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-4xl font-bold">{product.code}</span>
              </div>
            )}
            
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-3 shadow-lg transition-opacity"
              >
                <Eye className="h-5 w-5 text-gray-700" />
              </motion.div>
            </div>
            
            {/* Catalog Badge */}
            <div className="absolute top-2 left-2">
              <Badge className={`${catalogColor.bg} ${catalogColor.text} border ${catalogColor.border}`}>
                {product.catalog}
              </Badge>
            </div>
            
            {/* Textures */}
            {product.lamital.textures.length > 0 && (
              <div className="absolute bottom-2 right-2 flex gap-1">
                {product.lamital.textures.slice(0, 3).map((tex) => (
                  <span
                    key={tex}
                    className="bg-black/60 text-white text-xs px-1.5 py-0.5 rounded"
                    title={TEXTURE_MAP[tex]?.name || tex}
                  >
                    {tex}
                  </span>
                ))}
                {product.lamital.textures.length > 3 && (
                  <span className="bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    +{product.lamital.textures.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-amber-700 font-mono font-semibold text-lg">{product.code}</p>
                <h3 className="font-medium text-gray-900 truncate capitalize" title={product.name}>
                  {product.name.toLowerCase()}
                </h3>
              </div>
            </div>
            
            {product.category && (
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            )}
            
            {!product.matched && (
              <Badge variant="outline" className="mt-2 text-xs text-gray-400">
                New Design
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
