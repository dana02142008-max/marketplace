'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, Grid3X3, List, Search, X, ChevronDown,
  MapPin, Package, Zap, Filter, Check
} from 'lucide-react';
import { mockProducts, categories, formatPrice } from '@/lib/data';
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

const conditions = [
  { id: 'new', label: 'New' },
  { id: 'like_new', label: 'Like New' },
  { id: 'good', label: 'Good' },
  { id: 'fair', label: 'Fair' },
];

const sortOptions = [
  { id: 'relevance', label: 'Most Relevant' },
  { id: 'newest', label: 'Newest First' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'popular', label: 'Most Popular' },
];

function BrowsePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');
  const [hasDelivery, setHasDelivery] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockProducts];
      if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
      if (selectedConditions.length > 0) filtered = filtered.filter(p => selectedConditions.includes(p.condition));
      if (hasDelivery) filtered = filtered.filter(p => p.hasDelivery);
      if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      switch (sortBy) {
        case 'price_asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price_desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'popular': filtered.sort((a, b) => b.views - a.views); break;
        case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      }

      setProducts(filtered);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedConditions, hasDelivery, searchQuery, priceRange, sortBy]);

  const activeFiltersCount = [
    selectedCategory, selectedConditions.length > 0, hasDelivery,
    priceRange[0] > 0 || priceRange[1] < 100000
  ].filter(Boolean).length;

  const currentSort = sortOptions.find(s => s.id === sortBy);
  const currentCategory = categories.find(c => c.id === selectedCategory);

  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Category</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('')}
            className={cn('flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all', !selectedCategory ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800')}
          >
            <span>All Categories</span>
            {!selectedCategory && <Check className="w-4 h-4" />}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
              className={cn('flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all', selectedCategory === cat.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800')}
            >
              <span className="flex items-center gap-2">{cat.icon} {cat.name}</span>
              {selectedCategory === cat.id && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Condition</h3>
        <div className="grid grid-cols-2 gap-2">
          {conditions.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedConditions(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id])}
              className={cn('px-3 py-2 rounded-xl text-sm font-medium border transition-all', selectedConditions.includes(c.id) ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600')}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Min</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="input-field text-sm py-2"
              placeholder="0"
            />
          </div>
          <div className="text-gray-400 mt-4">—</div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Max</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="input-field text-sm py-2"
              placeholder="100000"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {[1000, 5000, 10000, 20000].map(p => (
            <button key={p} onClick={() => setPriceRange([0, p])} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
              &lt;{formatPrice(p)}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Delivery</h3>
        <button
          onClick={() => setHasDelivery(!hasDelivery)}
          className={cn('flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border w-full transition-all', hasDelivery ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300')}
        >
          <Zap className="w-4 h-4" />
          Delivery available
          {hasDelivery && <Check className="w-4 h-4 ml-auto" />}
        </button>
      </div>

      {/* Clear */}
      {activeFiltersCount > 0 && (
        <button
          onClick={() => { setSelectedCategory(''); setSelectedConditions([]); setPriceRange([0, 100000]); setHasDelivery(false); }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-danger-500 hover:bg-red-50 dark:hover:bg-red-950/20 border border-danger-200 dark:border-danger-800/50 transition-all"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Sticky search/sort bar */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 py-3">
        <div className="container-app flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 max-w-lg flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary-400 focus-within:border-transparent transition-all">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && <button onClick={() => setSearchQuery('')}><X className="w-4 h-4 text-gray-400" /></button>}
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border transition-all', showFilters || activeFiltersCount > 0 ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700')}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:block">Filters</span>
            {activeFiltersCount > 0 && (
              <span className={cn('w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center', showFilters ? 'bg-white text-primary-600' : 'bg-primary-600 text-white')}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <span className="hidden sm:block">{currentSort?.label}</span>
              <span className="sm:hidden">Sort</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', showSortDropdown && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 p-1"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setSortBy(option.id); setShowSortDropdown(false); }}
                      className={cn('flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all', sortBy === option.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800')}
                    >
                      {option.label}
                      {sortBy === option.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={cn('p-2 transition-all', viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={cn('p-2 transition-all', viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-app py-6">
        {/* Breadcrumb / result summary */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Searching...' : `${products.length} results`}
          </span>
          {currentCategory && (
            <span className="badge-primary flex items-center gap-1">
              {currentCategory.icon} {currentCategory.name}
              <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          {searchQuery && (
            <span className="badge-primary flex items-center gap-1">
              &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          {selectedConditions.map(c => (
            <span key={c} className="badge-gray flex items-center gap-1">
              {conditions.find(x => x.id === c)?.label}
              <button onClick={() => setSelectedConditions(prev => prev.filter(x => x !== c))}><X className="w-3 h-3 ml-1" /></button>
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters — desktop */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 280 }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="w-[280px] card p-5 sticky top-36">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </h2>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <FiltersPanel />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-3'}>
                {Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSelectedCategory(''); setSelectedConditions([]); setPriceRange([0, 100000]); setHasDelivery(false); setSearchQuery(''); }}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={viewMode === 'grid' ? 'product-grid' : 'space-y-3'}
                >
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} variant={viewMode === 'list' ? 'horizontal' : 'default'} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {!loading && products.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button className="btn-secondary px-8">Load more listings</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <BrowsePage />
    </Suspense>
  );
}
