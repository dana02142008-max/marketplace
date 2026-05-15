'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, ArrowRight, MapPin, TrendingUp, Zap, Shield, Star } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { categories } from '@/lib/data';

const quickCategories = ['Electronics', 'Fashion', 'Gaming', 'Cars', 'Home', 'Phones'];

export function HeroSection() {
  const { searchQuery, setSearchQuery } = useStore();
  const [focused, setFocused] = useState(false);

  const stats = [
    { label: 'Active listings', value: '2.4M+', icon: '📦' },
    { label: 'Verified sellers', value: '180K+', icon: '✓' },
    { label: 'Cities covered', value: '340+', icon: '🏙️' },
    { label: 'Avg. response', value: '< 1h', icon: '⚡' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-900/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-100/20 dark:from-primary-900/10 to-transparent rounded-full" />
      </div>

      <div className="container-app relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" />
            The smarter way to buy & sell
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-4"
          >
            Find anything.
            <br />
            <span className="text-gradient">Sell in seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Sweden&apos;s most trusted marketplace with AI-powered listings, verified sellers, and same-day delivery. Millions of items near you.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-2xl mx-auto mb-6"
          >
            <div className={`flex items-center gap-3 px-5 py-4 rounded-3xl bg-white dark:bg-gray-800 transition-all duration-300 ${
              focused
                ? 'shadow-2xl ring-2 ring-primary-400 dark:ring-primary-500'
                : 'shadow-card hover:shadow-card-hover'
            }`}>
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base md:text-lg"
              />
              <div className="flex items-center gap-2 border-l border-gray-100 dark:border-gray-700 pl-3">
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <Link
                href={`/browse${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-2xl transition-all hover:shadow-glow active:scale-[0.98] flex-shrink-0"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-3 justify-center flex-wrap">
              <span className="text-xs text-gray-400 dark:text-gray-500">Popular:</span>
              {['MacBook', 'iPhone 15', 'PS5', 'Nike Air Force', 'Vintage lamp'].map(term => (
                <Link
                  key={term}
                  href={`/browse?q=${encodeURIComponent(term)}`}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors hover:underline"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {quickCategories.map((name, i) => {
              const cat = categories.find(c => c.name.includes(name));
              return (
                <Link
                  key={name}
                  href={`/browse?category=${cat?.id || name.toLowerCase()}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-soft hover:shadow-card border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <span>{cat?.icon || '📦'}</span>
                  {name}
                </Link>
              );
            })}
            <Link
              href="/browse"
              className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 transition-all hover:-translate-y-0.5"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Trust indicators / stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white dark:border-gray-700/50 shadow-soft">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {[
              { icon: Shield, text: 'Buyer Protection', color: 'text-success-500' },
              { icon: Star, text: 'Verified Sellers', color: 'text-yellow-500' },
              { icon: Zap, text: 'Instant Delivery', color: 'text-primary-500' },
              { icon: MapPin, text: 'Near You', color: 'text-accent-500' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Icon className={cn('w-4 h-4', color)} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
