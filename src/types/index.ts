export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  bio: string;
  responseTime: string;
  totalSales: number;
  badges: Badge[];
  isOnline: boolean;
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  seller: User;
  location: string;
  distance?: string;
  createdAt: string;
  views: number;
  saves: number;
  isNegotiable: boolean;
  hasDelivery: boolean;
  deliveryPrice?: number;
  isFeatured: boolean;
  isVerified: boolean;
  tags: string[];
  brand?: string;
  priceHistory?: { date: string; price: number }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  count: number;
  subcategories: string[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'offer' | 'system';
  offerAmount?: number;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  product: Product;
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Review {
  id: string;
  reviewer: User;
  rating: number;
  comment: string;
  photos?: string[];
  tags: string[];
  createdAt: string;
  type: 'buyer' | 'seller';
}

export interface Order {
  id: string;
  product: Product;
  buyer: User;
  seller: User;
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'completed' | 'disputed';
  price: number;
  deliveryAddress?: string;
  trackingCode?: string;
  createdAt: string;
  estimatedDelivery?: string;
  courierName?: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  location?: string;
  radius?: number;
  hasDelivery?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'relevance' | 'popular';
}
