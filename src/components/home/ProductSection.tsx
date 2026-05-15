'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Flame, Star, Sparkles, Tag, Zap } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'flash' | 'featured';
  loading?: boolean;
}

export function ProductSection({
  title, subtitle, products, viewAllHref = '/browse', icon, variant = 'default', loading
}: ProductSectionProps) {
  const iconMap = {
    default: <Sparkles className="w-5 h-5 text-primary-500" />,
    flash: <Zap className="w-5 h-5 text-accent-500" />,
    featured: <Star className="w-5 h-5 text-yellow-500" />,
  };

  if (variant === 'flash') {
    return (
      <section className="py-8">
        <div className="container-app">
          <div className="relative bg-gradient-to-r from-accent-500 to-orange-600 rounded-4xl p-6 md:p-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-black/10 rounded-full translate-y-1/2" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-white" />
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white">{title}</h2>
                    <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                  </div>
                  {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
                </div>
                <Link href={viewAllHref} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold transition-all">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
                  : products.slice(0, 4).map((p, i) => (
                    <div key={p.id} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <ProductCard product={p} index={i} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container-app">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon || iconMap[variant]}
            <div>
              <h2 className="section-title">{title}</h2>
              {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <Link href={viewAllHref} className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:gap-3 transition-all">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="product-grid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 10).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
