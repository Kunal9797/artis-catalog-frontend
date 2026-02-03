'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Product } from '@/types/product';

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg"
        >
          {!imageError ? (
            <>
              {/* Loading placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.lamital.imageUrl}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <span className="text-gray-400 text-6xl font-bold">{product.code}</span>
                <p className="text-gray-400 mt-2">Image unavailable</p>
              </div>
            </div>
          )}

          {/* Zoom Button */}
          {!imageError && imageLoaded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
            >
              <ZoomIn className="h-5 w-5 text-gray-700" />
            </motion.button>
          )}
        </motion.div>

        {/* View on Lamital Link */}
        <div className="mt-4 flex justify-center">
          <a
            href={product.lamital.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors"
          >
            View on Lamital <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.lamital.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setIsZoomed(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-2xl font-bold">{product.code}</p>
              <p className="text-lg opacity-80">{product.name}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
