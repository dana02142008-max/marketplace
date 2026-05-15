'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data';

export function CategoryGrid() {
  const featured = categories.slice(0, 8);
  const rest = categories.slice(8, 20);

  return (
    <section className="py-12">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">20 categories, millions of items</p>
          </div>
          <Link href="/browse" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:gap-3 transition-all">
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured categories — large */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/browse?category=${cat.id}`}>
                <div className={`${cat.gradient} rounded-3xl p-5 hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-white/50 dark:border-gray-700/30`}>
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{cat.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.count.toLocaleString()} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Remaining categories — compact */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
          {rest.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link href={`/browse?category=${cat.id}`}>
                <div className="flex items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group border border-gray-100 dark:border-gray-800">
                  <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
          <Link href="/browse">
            <div className="flex items-center gap-2 p-3 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all cursor-pointer group border border-primary-100 dark:border-primary-800/50">
              <span className="text-xl">➕</span>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400 truncate">More</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
