'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Image
                src="/artis-logo.png"
                alt="Artis Laminates"
                width={140}
                height={46}
                className="h-12 w-auto brightness-0 invert"
              />
            </motion.div>
            <p className="text-gray-400 max-w-md mb-4">
              Premium decorative laminates for modern interiors. Explore our collection
              of 300+ designs in wood, marble, solid colors, and more.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://artislaminates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1"
              >
                Main Website <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://lamital.in/artislaminates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1"
              >
                Lamital <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/catalog?catalog=Artis+1MM" className="text-gray-400 hover:text-white transition-colors">
                  Artis 1MM
                </Link>
              </li>
              <li>
                <Link href="/catalog?catalog=Artvio" className="text-gray-400 hover:text-white transition-colors">
                  Artvio
                </Link>
              </li>
              <li>
                <Link href="/catalog?catalog=Woodrica" className="text-gray-400 hover:text-white transition-colors">
                  Woodrica
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Yamunanagar, Haryana, India</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919729037977" className="text-sm hover:text-white transition-colors">
                  +91 97290 37977
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@artislaminates.com" className="text-sm hover:text-white transition-colors">
                  info@artislaminates.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Artis Laminates. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2 md:mt-0">
            Product Catalog v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
