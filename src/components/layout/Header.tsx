'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, MessageCircle, Heart, Sun, Moon, Menu, X,
  Plus, ChevronDown, MapPin, Sparkles, TrendingUp, Package,
  Settings, LogOut, User as UserIcon, ShieldCheck, BarChart3
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { categories } from '@/lib/data';

export function Header() {
  const { currentUser, theme, toggleTheme, wishlist, notifications, searchQuery, setSearchQuery } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const suggestions = ['MacBook Pro', 'iPhone 15', 'Nike Jordan', 'PS5', 'Vintage sofa', 'Canon camera'];
  const trendingSearches = ['PS5 bundle', 'iPhone 15 Pro', 'Vintage Rolex', 'Herman Miller'];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-100 dark:border-gray-800/50">
      <div className="container-app">
        <div className="flex items-center gap-3 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
              Trade<span className="text-gradient">Wave</span>
            </span>
          </Link>

          {/* Used section link */}
          <Link href="/used" className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all flex-shrink-0">
            <span>♻️</span>
            Used
          </Link>

          {/* Categories dropdown — desktop */}
          <div className="hidden lg:block relative">
            <button
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Menu className="w-4 h-4" />
              Categories
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-[560px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 grid grid-cols-4 gap-1"
                >
                  {categories.slice(0, 16).map(cat => (
                    <Link
                      key={cat.id}
                      href={`/browse?category=${cat.id}`}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group text-center"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-1">{cat.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-200 ${
              isSearchFocused
                ? 'border-primary-400 bg-white dark:bg-gray-800 shadow-glow ring-2 ring-primary-100 dark:ring-primary-900/30'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60'
            }`}>
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 border-l border-gray-200 dark:border-gray-700 pl-2 ml-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Stockholm</span>
              </div>
            </div>

            {/* Search suggestions dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2 px-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-accent-500" />
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Trending</span>
                    </div>
                    {trendingSearches.map(s => (
                      <Link key={s} href={`/browse?q=${encodeURIComponent(s)}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{s}</span>
                      </Link>
                    ))}
                    <div className="flex items-center gap-2 px-2 mt-3 mb-2">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Suggestions</span>
                    </div>
                    {suggestions.slice(0, 4).map(s => (
                      <Link key={s} href={`/browse?q=${encodeURIComponent(s)}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Search className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{s}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:text-gray-900 dark:hover:text-white">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </Link>

            {/* Messages */}
            <Link href="/messages" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:text-gray-900 dark:hover:text-white">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </Link>

            {/* Notifications */}
            <Link href="/notifications" className="relative w-9 h-9 hidden sm:flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:text-gray-900 dark:hover:text-white">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{notifications}</span>
              )}
            </Link>

            {/* Sell button */}
            <Link href="/sell" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm rounded-xl transition-all hover:shadow-glow active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              <span>Sell</span>
            </Link>

            {/* Profile */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <Avatar src={currentUser?.avatar} name={currentUser?.name || 'User'} size="sm" verified={currentUser?.verified} />
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 hidden sm:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <Avatar src={currentUser?.avatar} name={currentUser?.name || 'User'} size="md" verified={currentUser?.verified} />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">{currentUser?.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">@{currentUser?.username}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      {[
                        { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
                        { href: '/profile', icon: UserIcon, label: 'My Profile' },
                        { href: '/orders', icon: Package, label: 'Orders' },
                        { href: '/admin', icon: ShieldCheck, label: 'Admin Panel' },
                        { href: '/settings', icon: Settings, label: 'Settings' },
                      ].map(item => (
                        <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                          <item.icon className="w-4 h-4 text-gray-500" />
                          {item.label}
                        </Link>
                      ))}
                      <hr className="my-2 border-gray-100 dark:border-gray-800" />
                      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-danger-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all w-full">
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900"
          >
            <div className="container-app py-4 grid grid-cols-4 gap-2">
              {categories.slice(0, 12).map(cat => (
                <Link
                  key={cat.id}
                  href={`/browse?category=${cat.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 text-center">{cat.name}</span>
                </Link>
              ))}
            </div>
            <div className="container-app pb-4 flex gap-2">
              <Link href="/sell" onClick={() => setIsMenuOpen(false)} className="flex-1 btn-primary justify-center text-sm py-3">
                <Plus className="w-4 h-4" />
                Sell an Item
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
