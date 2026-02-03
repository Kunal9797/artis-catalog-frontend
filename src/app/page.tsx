'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Sparkles, TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/catalog/ProductCard';
import { getAllProducts, getCatalogStats, getUniqueCategories } from '@/lib/products';
import { CATALOGS } from '@/types/product';

const catalogIcons = {
  'Artis 1MM': Sparkles,
  'Artvio': Layers,
  'Woodrica': TreeDeciduous,
};

const catalogDescriptions = {
  'Artis 1MM': 'Premium 1mm thickness for superior durability',
  'Artvio': 'Versatile 0.8mm designs for every space',
  'Woodrica': 'Natural wood aesthetics at affordable prices',
};

const catalogImages = {
  'Artis 1MM': '/artis-1mm-cover.png',
  'Artvio': '/artvio-cover.png',
  'Woodrica': '/woodrica-cover.png',
};

export default function HomePage() {
  const products = getAllProducts();
  const stats = getCatalogStats();
  const categories = getUniqueCategories();
  
  // Get featured products (one from each catalog, matched only)
  const featured = CATALOGS.map(catalog => 
    products.find(p => p.catalog === catalog && p.matched && p.lamital.imageUrl)
  ).filter(Boolean).slice(0, 6);

  // Fill with more matched products if needed
  const featuredProducts = [
    ...featured,
    ...products.filter(p => p.matched && !featured.includes(p)).slice(0, 6 - featured.length)
  ].slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#393735] text-white">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Warm gold blob - top right */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#fbce8a] rounded-full mix-blend-soft-light blur-3xl opacity-60 animate-pulse" />
          {/* Deep brown blob - bottom left */}
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#5c4d3c] rounded-full mix-blend-soft-light blur-3xl opacity-50" />
          {/* Subtle cream blob - center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d4c4a8] rounded-full mix-blend-soft-light blur-3xl opacity-30" />
          {/* Accent gold blob - bottom right */}
          <div className="absolute -bottom-16 right-1/4 w-72 h-72 bg-[#fbce8a] rounded-full mix-blend-soft-light blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[#fbce8a]/20 text-[#fbce8a] border-[#fbce8a]/30 mb-4">
                {stats.total}+ Premium Designs
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover the Perfect{' '}
                <span className="text-[#fbce8a]">
                  Laminate
                </span>{' '}
                for Your Space
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                Browse our complete collection of decorative laminates. From natural wood grains
                to elegant marbles and bold solid colors — find your perfect match.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/catalog">
                  <Button size="lg" className="bg-[#fbce8a] hover:bg-[#e5b978] text-black font-semibold">
                    Browse Catalog
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link href={`/catalog?category=${encodeURIComponent(category)}`}>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/90 hover:bg-[#fbce8a] hover:text-black transition-all cursor-pointer backdrop-blur-sm border border-white/20">
                        {category}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <Link href="/catalog">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#fbce8a]/20 text-[#fbce8a] hover:bg-[#fbce8a] hover:text-black transition-all cursor-pointer border border-[#fbce8a]/30">
                    View All →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>

      {/* Catalog Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {CATALOGS.map((catalog, index) => {
            const Icon = catalogIcons[catalog];
            return (
              <motion.div
                key={catalog}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/catalog?catalog=${encodeURIComponent(catalog)}`}>
                  <div className="group relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${catalogImages[catalog]})` }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#393735] via-[#393735]/60 to-transparent" />
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#fbce8a] rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[#393735]" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {catalog}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{catalogDescriptions[catalog]}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#fbce8a] font-medium">
                          {stats.byCatalog[catalog]} products
                        </span>
                        <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:text-[#fbce8a] transition-colors">
                          Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Popular designs from our collection</p>
            </div>
            <Link href="/catalog" className="hidden sm:block">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product!.code} product={product!} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/catalog">
              <Button variant="outline" className="w-full">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-[#393735] rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: stats.total + '+', label: 'Designs' },
              { value: CATALOGS.length, label: 'Collections' },
              { value: categories.length + '+', label: 'Categories' },
              { value: '10+', label: 'Textures' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold mb-2 text-[#fbce8a]">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
