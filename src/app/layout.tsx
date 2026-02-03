import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Artis Laminates Catalog | Premium Decorative Laminates',
    template: '%s | Artis Laminates',
  },
  description:
    'Browse 300+ premium decorative laminate designs from Artis. Explore wood, marble, solid colors, and abstract patterns for modern interiors.',
  keywords: [
    'laminates',
    'decorative laminates',
    'wood laminates',
    'marble laminates',
    'Artis',
    'Artvio',
    'Woodrica',
    'interior design',
    'furniture',
    'India',
  ],
  authors: [{ name: 'Artis Laminates' }],
  openGraph: {
    title: 'Artis Laminates Catalog',
    description: 'Premium decorative laminates for modern interiors',
    url: 'https://catalog.artislaminates.com',
    siteName: 'Artis Laminates',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artis Laminates Catalog',
    description: 'Premium decorative laminates for modern interiors',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-gray-50`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
