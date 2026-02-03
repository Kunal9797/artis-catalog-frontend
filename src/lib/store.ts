import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CatalogType } from '@/types/product';

interface FilterState {
  catalogs: CatalogType[];
  categories: string[];
  showUnmatched: boolean;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'code' | 'category';
  sortOrder: 'asc' | 'desc';
}

interface FilterActions {
  toggleCatalog: (catalog: CatalogType) => void;
  toggleCategory: (category: string) => void;
  setShowUnmatched: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: 'name' | 'code' | 'category') => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
}

type FilterStore = FilterState & FilterActions;

const initialState: FilterState = {
  catalogs: [],
  categories: [],
  showUnmatched: false,
  searchQuery: '',
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      toggleCatalog: (catalog) =>
        set((state) => ({
          catalogs: state.catalogs.includes(catalog)
            ? state.catalogs.filter((c) => c !== catalog)
            : [...state.catalogs, catalog],
        })),
      
      toggleCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category)
            ? state.categories.filter((c) => c !== category)
            : [...state.categories, category],
        })),
      
      setShowUnmatched: (show) => set({ showUnmatched: show }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sort) => set({ sortBy: sort }),
      toggleSortOrder: () =>
        set((state) => ({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' })),
      
      resetFilters: () => set(initialState),
    }),
    {
      name: 'artis-catalog-filters',
      partialize: (state) => ({
        viewMode: state.viewMode,
        showUnmatched: state.showUnmatched,
      }),
    }
  )
);
