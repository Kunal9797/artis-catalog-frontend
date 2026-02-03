'use client';

import { motion } from 'framer-motion';
import { Filter, X, RotateCcw, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useFilterStore } from '@/lib/store';
import { CATALOGS, CATALOG_COLORS, CatalogType } from '@/types/product';

interface FilterPanelProps {
  categories: string[];
}

function FilterContent({ categories }: FilterPanelProps) {
  const {
    catalogs,
    categories: selectedCategories,
    showUnmatched,
    toggleCatalog,
    toggleCategory,
    setShowUnmatched,
    resetFilters,
  } = useFilterStore();

  const activeFiltersCount = catalogs.length + selectedCategories.length + (showUnmatched ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filters ({activeFiltersCount})
        </Button>
      )}

      {/* Catalogs */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Catalog</h3>
        <div className="space-y-2">
          {CATALOGS.map((catalog) => {
            const colors = CATALOG_COLORS[catalog];
            const isSelected = catalogs.includes(catalog);
            return (
              <motion.button
                key={catalog}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCatalog(catalog)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border-2`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`font-medium ${isSelected ? colors.text : 'text-gray-700'}`}>
                  {catalog}
                </span>
                {isSelected && (
                  <X className={`h-4 w-4 ${colors.text}`} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Category</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Show Unmatched Toggle */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer group">
          <Checkbox
            checked={showUnmatched}
            onCheckedChange={(checked) => setShowUnmatched(checked as boolean)}
          />
          <div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Show new designs
            </span>
            <p className="text-xs text-gray-500">
              Include uncategorized products
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default function FilterPanel({ categories }: FilterPanelProps) {
  const { viewMode, setViewMode, sortBy, setSortBy, sortOrder, toggleSortOrder, catalogs, categories: selectedCategories, filteredCount } = useFilterStore();
  const activeFiltersCount = catalogs.length + selectedCategories.length;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-20 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
          </div>
          <FilterContent categories={categories} />
        </div>
      </aside>

      {/* Mobile Filter Bar - Compact sticky mini-bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b py-2 px-4 -mx-4 mb-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Filter button + result count */}
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative h-8 px-3">
                  <Filter className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center bg-amber-600 text-[10px]">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent categories={categories} />
              </div>
            </SheetContent>
          </Sheet>
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{filteredCount}</span> products
            </span>
          </div>

          {/* Right: Compact sort + view controls */}
          <div className="flex items-center gap-1.5">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'code' | 'category')}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSortOrder}>
              <ArrowUpDown className={`h-3.5 w-3.5 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </Button>

            <div className="hidden sm:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => setViewMode('list')}
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
