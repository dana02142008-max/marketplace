'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tag, Filter, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { mockProducts, categories } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';

const usedProducts = mockProducts.filter(p => ['good', 'fair', 'poor'].includes(p.condition));

const conditionInfo = {
  good: { label: 'Good', color: 'success' as const, desc: 'Minor signs of use, fully functional' },
  fair: { label: 'Fair', color: 'warning' as const, desc: 'Visible wear, works perfectly' },
  poor: { label: 'Acceptable', color: 'danger' as const, desc: 'Heavy wear, still functional' },
};

const highlights = [
  { icon: TrendingDown, label: 'Up to 70% off', desc: 'Compared to retail price', color: 'text-green-500' },
  { icon: CheckCircle, label: 'Verified sellers', desc: 'Trusted community members', color: 'text-primary-500' },
  { icon: Clock, label: 'Fast deals', desc: 'New items added daily', color: 'text-accent-500' },
];

export default function UsedPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 border-b border-amber-100 dark:border-amber-900/30">
        <div className="container-app py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">♻️</span>
              <Badge variant="accent">Used & Pre-owned</Badge>
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
              Quality Used Items
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Find great deals on pre-owned items from verified sellers. Every item inspected and honestly described.
            </p>
            <div className="flex flex-wrap gap-4">
              {highlights.map(h => (
                <div key={h.label} className="flex items-center gap-2 bg-white dark:bg-gray-800/60 rounded-xl px-4 py-2.5 shadow-soft">
                  <h.icon className={`w-4 h-4 ${h.color}`} />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{h.label}</div>
                    <div className="text-xs text-gray-500">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Condition guide */}
      <div className="container-app py-6">
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 self-center mr-1">Condition:</span>
          {Object.entries(conditionInfo).map(([key, info]) => (
            <Link
              key={key}
              href={`/browse?condition=${key}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
            >
              <Badge variant={info.color}>{info.label}</Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{info.desc}</span>
            </Link>
          ))}
        </div>

        {/* Products grid */}
        {usedProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                {usedProducts.length} used items available
              </h2>
              <Link href="/browse?condition=good,fair,poor" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="product-grid">
              {usedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No used items at the moment</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}

        {/* Browse by category */}
        <div className="mt-12">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">Browse used by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
                <Link
                  href={`/browse?category=${cat.id}&condition=good,fair,poor`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all group text-center"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
