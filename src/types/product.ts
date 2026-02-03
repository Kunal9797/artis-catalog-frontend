export interface Product {
  code: string;
  name: string;
  catalog: 'Artis 1MM' | 'Artvio' | 'Woodrica';
  category: string;
  supplier: string;
  supplierCode: string;
  currentStock: number | null;
  matched: boolean;
  lamital: {
    url: string;
    imageUrl: string;
    textures: string[];
  };
  inventoryCatalogs?: string[];
  stockData?: {
    currentStock: number | null;
    avgConsumption: number | null;
    stockStatus: string | null;
    monthsRemaining: number | null;
    lastUpdated: string | null;
  } | null;
  consumptionHistory?: {
    monthlyData: Array<{
      month: string;
      consumption: number;
    }>;
    totalConsumption: number | null;
    averageMonthly: number | null;
    trend: string | null;
  } | null;
}

export type CatalogType = 'Artis 1MM' | 'Artvio' | 'Woodrica';

export const CATALOGS: CatalogType[] = ['Artis 1MM', 'Artvio', 'Woodrica'];

export const CATEGORIES = [
  'Wooden',
  'Marble',
  'Plain Colours',
  'Abstract',
  'Acrylic',
  'Metallic',
  'Stone',
  'Sparkle',
  'Pastel',
] as const;

export type CategoryType = typeof CATEGORIES[number];

export const TEXTURE_MAP: Record<string, { name: string; description: string }> = {
  'SMT': { name: 'Smooth Matt', description: 'Silky smooth matte finish' },
  'FT': { name: 'Fine Texture', description: 'Subtle textured surface' },
  'CG': { name: 'Coarse Grain', description: 'Bold wood-like texture' },
  'LX': { name: 'Luxury', description: 'Premium high-gloss finish' },
  'FB': { name: 'Fiber', description: 'Natural fiber texture' },
  'SF': { name: 'Soft Feel', description: 'Velvety soft-touch surface' },
  'SYN': { name: 'Synchronized', description: 'Texture matches the design' },
  'HG': { name: 'High Gloss', description: 'Mirror-like shine' },
  'SG': { name: 'Super Gloss', description: 'Ultra-reflective finish' },
};

export const CATALOG_COLORS: Record<CatalogType, { bg: string; text: string; border: string }> = {
  'Artis 1MM': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  'Artvio': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'Woodrica': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
};
