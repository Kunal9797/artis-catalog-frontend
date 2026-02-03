import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import StockInfo from '@/components/product/StockInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductByCode, getRelatedProducts, getAllProducts } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{ code: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    code: product.code,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { code } = await params;
  const product = getProductByCode(code);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.code} - ${product.name}`,
    description: `${product.name} from the ${product.catalog} collection. ${product.category ? `Category: ${product.category}.` : ''} Premium decorative laminate from Artis.`,
    openGraph: {
      title: `${product.code} - ${product.name} | Artis Laminates`,
      description: `Premium ${product.category || 'decorative'} laminate from ${product.catalog}`,
      images: [product.lamital.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { code } = await params;
  const product = getProductByCode(code);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/catalog">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-4 w-4" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <ProductImage product={product} />

            {/* Info */}
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Stock & Consumption */}
        <div className="mt-8">
          <StockInfo product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
