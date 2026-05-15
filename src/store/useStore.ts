'use client';
import { create } from 'zustand';
import { Product, User } from '@/types';
import { mockUsers } from '@/lib/data';

interface AppState {
  currentUser: User | null;
  theme: 'light' | 'dark';
  wishlist: string[];
  cartItems: string[];
  notifications: number;
  searchQuery: string;
  isLoggedIn: boolean;

  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  login: () => void;
  logout: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: mockUsers[0],
  theme: 'light',
  wishlist: ['p2', 'p5', 'p9'],
  cartItems: [],
  notifications: 3,
  searchQuery: '',
  isLoggedIn: true,

  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId],
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  login: () => set({ isLoggedIn: true, currentUser: mockUsers[0] }),
  logout: () => set({ isLoggedIn: false, currentUser: null }),
}));
