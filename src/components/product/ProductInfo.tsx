'use client';

import { motion } from 'framer-motion';
import { Share2, Copy, Check, ExternalLink, Tag, Building2, Hash, Layers, Package, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Product, CATALOG_COLORS, TEXTURE_MAP } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [copied, setCopied] = useState(false);
  const catalogColor = CATALOG_COLORS[product.catalog];

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareProduct = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${product.code} - ${product.name}`,
        text: `Check out this laminate design from Artis: ${product.name}`,
        url: window.location.href,
      });
    } else {
      copyLink();
    }
  };

  const infoItems = [
    { icon: Hash, label: 'Product Code', value: product.code },
    { icon: Tag, label: 'Category', value: product.category || 'Uncategorized' },
    { icon: Layers, label: 'Catalog', value: product.catalog },
    ...(product.supplier
      ? [{ icon: Building2, label: 'Supplier', value: product.supplier }]
      : []),
    ...(product.supplierCode
      ? [{ icon: Hash, label: 'Supplier Code', value: product.supplierCode }]
      : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${catalogColor.bg} ${catalogColor.text} border ${catalogColor.border}`}>
            {product.catalog}
          </Badge>
          {!product.matched && (
            <Badge variant="outline" className="text-gray-500">
              New Design
            </Badge>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{product.code}</h1>
        <p className="text-2xl text-gray-600 capitalize">{product.name.toLowerCase()}</p>
      </div>

      <Separator />

      {/* Product Details with Stock Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Product Info */}
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Stock Metrics */}
        {(product.stockData || product.consumptionHistory) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200"
          >
            <div className="space-y-6">
              {/* Current Stock */}
              {product.stockData?.currentStock != null && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-amber-700" />
                    <p className="text-sm font-medium text-amber-900">Current Stock</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-amber-900">
                      {product.stockData.currentStock.toLocaleString()}
                    </span>
                    <span className="text-2xl text-amber-700">kg</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">
                    ≈ {Math.round(product.stockData.currentStock * 4).toLocaleString()} sheets
                  </p>
                </div>
              )}

              {/* Avg Consumption */}
              {product.stockData?.avgConsumption != null && (
                <div>
                  {product.stockData?.currentStock != null && (
                    <div className="border-t border-amber-200 mb-4" />
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-amber-700" />
                    <p className="text-sm font-medium text-amber-900">6-Month Avg</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-amber-900">
                      {product.stockData.avgConsumption.toFixed(1)}
                    </span>
                    <span className="text-xl text-amber-700">kg/mo</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">
                    ≈ {Math.round(product.stockData.avgConsumption * 4).toLocaleString()} sheets/mo
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Textures */}
      {product.lamital.textures.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Available Textures</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.lamital.textures.map((tex) => {
                const textureInfo = TEXTURE_MAP[tex];
                return (
                  <motion.div
                    key={tex}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <p className="font-mono font-semibold text-amber-700">{tex}</p>
                    {textureInfo && (
                      <>
                        <p className="text-sm font-medium text-gray-900">{textureInfo.name}</p>
                        <p className="text-xs text-gray-500">{textureInfo.description}</p>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={shareProduct}
          variant="outline"
          className="flex-1"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          onClick={copyLink}
          variant="outline"
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      {/* View on Lamital */}
      <a
        href={product.lamital.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button className="w-full bg-amber-600 hover:bg-amber-700">
          View Full Details on Lamital
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </a>
    </motion.div>
  );
}
