'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/lib/store';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  // Sync from global state
  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleClear = useCallback(() => {
    setLocalQuery('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by code, name, or supplier code..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500"
        />
        <AnimatePresence>
          {(localQuery || isSearching) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search hints */}
      <AnimatePresence>
        {!localQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 flex flex-wrap gap-2 text-xs text-gray-400"
          >
            <span>Try:</span>
            <button
              onClick={() => setLocalQuery('1318')}
              className="text-amber-600 hover:text-amber-700"
            >
              1318
            </button>
            <button
              onClick={() => setLocalQuery('oak')}
              className="text-amber-600 hover:text-amber-700"
            >
              oak
            </button>
            <button
              onClick={() => setLocalQuery('marble')}
              className="text-amber-600 hover:text-amber-700"
            >
              marble
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
