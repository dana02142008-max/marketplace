import { Product, User, Category, Review, Order } from '@/types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '💻', color: 'from-blue-500 to-cyan-400', gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30', count: 12450, subcategories: ['Laptops', 'Tablets', 'TVs', 'Cameras', 'Headphones', 'Smart Home'] },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: 'from-pink-500 to-rose-400', gradient: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30', count: 8320, subcategories: ['Women', 'Men', 'Kids', 'Shoes', 'Bags', 'Jewellery'] },
  { id: 'home', name: 'Home & Furniture', icon: '🛋️', color: 'from-amber-500 to-orange-400', gradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30', count: 6180, subcategories: ['Sofas', 'Beds', 'Tables', 'Kitchen', 'Decor', 'Garden'] },
  { id: 'cars', name: 'Cars & Vehicles', icon: '🚗', color: 'from-slate-600 to-gray-500', gradient: 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30', count: 4230, subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Boats', 'Parts', 'Accessories'] },
  { id: 'gaming', name: 'Gaming', icon: '🎮', color: 'from-violet-500 to-purple-400', gradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30', count: 3860, subcategories: ['Consoles', 'Games', 'PC Gaming', 'Controllers', 'VR', 'Collectibles'] },
  { id: 'phones', name: 'Phones', icon: '📱', color: 'from-green-500 to-emerald-400', gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30', count: 9740, subcategories: ['iPhones', 'Android', 'Cases', 'Chargers', 'Screen Protectors', 'Smartwatches'] },
  { id: 'luxury', name: 'Luxury', icon: '💎', color: 'from-yellow-500 to-amber-400', gradient: 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30', count: 1240, subcategories: ['Watches', 'Handbags', 'Jewellery', 'Art', 'Wine', 'Cars'] },
  { id: 'books', name: 'Books', icon: '📚', color: 'from-teal-500 to-cyan-400', gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30', count: 5490, subcategories: ['Fiction', 'Non-fiction', 'Textbooks', 'Comics', 'Children', 'Rare'] },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', color: 'from-orange-500 to-red-400', gradient: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30', count: 4120, subcategories: ['Gym Equipment', 'Cycling', 'Team Sports', 'Outdoor', 'Swimming', 'Yoga'] },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: 'from-fuchsia-500 to-pink-400', gradient: 'bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/30', count: 3280, subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tools', 'Wellness'] },
  { id: 'kids', name: 'Kids & Baby', icon: '🧸', color: 'from-sky-500 to-blue-400', gradient: 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30', count: 2940, subcategories: ['Toys', 'Clothing', 'Strollers', 'Car Seats', 'Feeding', 'School'] },
  { id: 'pets', name: 'Pets', icon: '🐾', color: 'from-lime-500 to-green-400', gradient: 'bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/30 dark:to-green-950/30', count: 1870, subcategories: ['Dogs', 'Cats', 'Fish', 'Birds', 'Food', 'Accessories'] },
  { id: 'art', name: 'Art & Collectibles', icon: '🎨', color: 'from-rose-500 to-pink-400', gradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30', count: 1560, subcategories: ['Paintings', 'Sculptures', 'Photography', 'Vintage', 'Coins', 'Stamps'] },
  { id: 'music', name: 'Musical Instruments', icon: '🎸', color: 'from-indigo-500 to-violet-400', gradient: 'bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30', count: 1230, subcategories: ['Guitars', 'Pianos', 'DJ', 'Studio', 'Wind', 'Percussion'] },
  { id: 'property', name: 'Property', icon: '🏠', color: 'from-emerald-500 to-teal-400', gradient: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30', count: 890, subcategories: ['Apartments', 'Houses', 'Rooms', 'Commercial', 'Holiday', 'Land'] },
  { id: 'free', name: 'Free Stuff', icon: '🎁', color: 'from-red-500 to-orange-400', gradient: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30', count: 2340, subcategories: ['Furniture', 'Clothes', 'Electronics', 'Books', 'Plants', 'Other'] },
  { id: 'vintage', name: 'Vintage', icon: '🕰️', color: 'from-stone-500 to-amber-400', gradient: 'bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-950/30 dark:to-amber-950/30', count: 3120, subcategories: ['Clothing', 'Jewellery', 'Furniture', 'Decor', 'Tech', 'Toys'] },
  { id: 'handmade', name: 'Handmade', icon: '🤝', color: 'from-pink-400 to-purple-400', gradient: 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30', count: 1680, subcategories: ['Jewellery', 'Clothing', 'Art', 'Home Decor', 'Candles', 'Ceramics'] },
  { id: 'hobbies', name: 'Hobbies', icon: '🎭', color: 'from-cyan-500 to-blue-400', gradient: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30', count: 2780, subcategories: ['Board Games', 'Models', 'Crafts', 'Photography', 'Fishing', 'RC Models'] },
  { id: 'services', name: 'Jobs & Services', icon: '💼', color: 'from-gray-600 to-slate-500', gradient: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30', count: 1430, subcategories: ['Tutoring', 'Cleaning', 'Repairs', 'Design', 'IT', 'Beauty'] },
  { id: 'restaurant', name: 'Restaurant Equipment', icon: '🍽️', color: 'from-red-500 to-orange-400', gradient: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30', count: 870, subcategories: ['Cooking Equipment', 'Refrigeration', 'Ovens & Grills', 'Food Prep', 'Furniture', 'POS Systems'] },
];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Sofia Andersson', username: 'sofia_sells', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=100&h=100&fit=crop&crop=face', location: 'Stockholm, Sweden', verified: true, rating: 4.9, reviewCount: 234, joinedDate: '2021-03-15', bio: 'Decluttering my life, one item at a time. Sustainability matters ♻️', responseTime: '< 1 hour', totalSales: 312, badges: [{ id: 'b1', label: 'Top Seller', icon: '⭐', color: 'yellow' }, { id: 'b2', label: 'Fast Shipper', icon: '🚀', color: 'blue' }], isOnline: true },
  { id: 'u2', name: 'Marcus Chen', username: 'marcus_tech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', location: 'Gothenburg, Sweden', verified: true, rating: 4.8, reviewCount: 189, joinedDate: '2020-07-22', bio: 'Tech enthusiast, always upgrading. Quality items only.', responseTime: '< 2 hours', totalSales: 245, badges: [{ id: 'b3', label: 'Verified', icon: '✓', color: 'green' }, { id: 'b4', label: 'Top Collector', icon: '🏆', color: 'gold' }], isOnline: false },
  { id: 'u3', name: 'Emma Lindqvist', username: 'emma_fashion', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', location: 'Malmö, Sweden', verified: true, rating: 5.0, reviewCount: 412, joinedDate: '2019-11-08', bio: 'Fashion lover & sustainable shopper. All items authentic & clean.', responseTime: '< 30 min', totalSales: 567, badges: [{ id: 'b5', label: 'Trusted Seller', icon: '🛡️', color: 'blue' }, { id: 'b6', label: 'Fast Responder', icon: '⚡', color: 'purple' }], isOnline: true },
  { id: 'u4', name: 'Lars Petersen', username: 'lars_vintage', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', location: 'Uppsala, Sweden', verified: false, rating: 4.6, reviewCount: 78, joinedDate: '2022-01-20', bio: 'Vintage & retro items. Each piece has a story.', responseTime: '< 4 hours', totalSales: 89, badges: [{ id: 'b7', label: 'Bargain Hunter', icon: '💰', color: 'green' }], isOnline: true },
  { id: 'u5', name: 'Nina Kovač', username: 'nina_home', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', location: 'Linköping, Sweden', verified: true, rating: 4.7, reviewCount: 156, joinedDate: '2021-09-14', bio: 'Interior enthusiast selling quality home pieces.', responseTime: '< 3 hours', totalSales: 198, badges: [{ id: 'b8', label: 'Trusted Seller', icon: '🛡️', color: 'blue' }], isOnline: false },
];

const productImages = {
  electronics: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4733?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop',
  ],
  phones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
  ],
};

export const mockProducts: Product[] = [
  { id: 'p1', title: 'MacBook Pro 14" M3 Pro — Excellent condition', description: 'Selling my MacBook Pro 14-inch with M3 Pro chip. Only used for 6 months, still in excellent condition. Includes original box and charger. Perfect for developers and creatives.', price: 1750, originalPrice: 2470, currency: 'BHD', images: productImages.electronics, category: 'electronics', subcategory: 'Laptops', condition: 'like_new', seller: mockUsers[1], location: 'Manama', distance: '2.4 km', createdAt: '2024-07-10', views: 2341, saves: 89, isNegotiable: true, hasDelivery: true, deliveryPrice: 5, isFeatured: true, isVerified: true, tags: ['apple', 'macbook', 'laptop', 'm3'], brand: 'Apple', priceHistory: [{ date: '2024-06-01', price: 1900 }, { date: '2024-07-01', price: 1800 }, { date: '2024-07-10', price: 1750 }] },
  { id: 'p2', title: 'Nike Air Jordan 1 Retro High OG — Size 43', description: 'Deadstock Jordan 1s in Chicago colorway. Never worn, kept in original box. Bought directly from Nike, have receipt.', price: 120, originalPrice: 85, currency: 'BHD', images: productImages.fashion, category: 'fashion', subcategory: 'Shoes', condition: 'new', seller: mockUsers[0], location: 'Riffa', distance: '0.8 km', createdAt: '2024-07-12', views: 1890, saves: 234, isNegotiable: false, hasDelivery: true, deliveryPrice: 3, isFeatured: true, isVerified: true, tags: ['nike', 'jordan', 'sneakers', 'deadstock'], brand: 'Nike', priceHistory: [] },
  { id: 'p3', title: 'Vintage Danish Teak Sofa — 1960s', description: 'Beautiful original Danish teak sofa from the 1960s. Recently reupholstered in premium boucle fabric. Solid frame, no wobble. A true mid-century masterpiece.', price: 850, currency: 'BHD', images: productImages.home, category: 'home', subcategory: 'Sofas', condition: 'good', seller: mockUsers[4], location: 'Muharraq', distance: '5 km', createdAt: '2024-07-08', views: 987, saves: 156, isNegotiable: true, hasDelivery: false, isFeatured: false, isVerified: false, tags: ['vintage', 'danish', 'teak', 'midcentury'], priceHistory: [] },
  { id: 'p4', title: 'PlayStation 5 + 3 Games Bundle', description: 'PS5 disc edition in perfect condition. Selling due to moving. Includes 3 top games: God of War Ragnarök, Spider-Man 2, Hogwarts Legacy. All cables and controller included.', price: 185, originalPrice: 270, currency: 'BHD', images: productImages.gaming, category: 'gaming', subcategory: 'Consoles', condition: 'like_new', seller: mockUsers[3], location: 'Isa Town', distance: '12 km', createdAt: '2024-07-11', views: 3421, saves: 412, isNegotiable: true, hasDelivery: true, deliveryPrice: 4, isFeatured: true, isVerified: true, tags: ['ps5', 'playstation', 'games', 'bundle'], brand: 'Sony', priceHistory: [{ date: '2024-07-05', price: 200 }, { date: '2024-07-11', price: 185 }] },
  { id: 'p5', title: 'iPhone 15 Pro Max 256GB — Natural Titanium', description: 'iPhone 15 Pro Max in Natural Titanium, 256GB. Face ID works perfectly. Battery health at 98%. Complete with original box and all accessories including unused EarPods.', price: 380, originalPrice: 520, currency: 'BHD', images: productImages.phones, category: 'phones', subcategory: 'iPhones', condition: 'like_new', seller: mockUsers[2], location: 'Salmabad', distance: '8 km', createdAt: '2024-07-09', views: 4567, saves: 678, isNegotiable: false, hasDelivery: true, deliveryPrice: 3, isFeatured: true, isVerified: true, tags: ['iphone', 'apple', 'pro', 'titanium'], brand: 'Apple', priceHistory: [{ date: '2024-06-15', price: 420 }, { date: '2024-07-09', price: 380 }] },
  { id: 'p6', title: 'Sony WH-1000XM5 Wireless Headphones', description: 'Industry-best noise cancelling headphones. Barely used, bought 3 months ago. Comes with all original accessories and case. Multipoint connection, 30hr battery life.', price: 75, originalPrice: 115, currency: 'BHD', images: [productImages.electronics[3]], category: 'electronics', subcategory: 'Headphones', condition: 'like_new', seller: mockUsers[1], location: 'Manama', distance: '3.1 km', createdAt: '2024-07-13', views: 1234, saves: 89, isNegotiable: true, hasDelivery: true, deliveryPrice: 3, isFeatured: false, isVerified: true, tags: ['sony', 'headphones', 'wireless', 'anc'], brand: 'Sony', priceHistory: [] },
  { id: 'p7', title: 'Acne Studios Wool Blazer — Size M', description: 'Beautiful Acne Studios blazer in charcoal grey wool. Season 2023. Worn once to a wedding. Perfect condition, no alterations.', price: 95, originalPrice: 190, currency: 'BHD', images: [productImages.fashion[2]], category: 'fashion', subcategory: 'Men', condition: 'like_new', seller: mockUsers[2], location: 'Salmabad', distance: '8 km', createdAt: '2024-07-07', views: 789, saves: 67, isNegotiable: true, hasDelivery: true, deliveryPrice: 3, isFeatured: false, isVerified: true, tags: ['acne studios', 'blazer', 'wool', 'designer'], brand: 'Acne Studios', priceHistory: [] },
  { id: 'p8', title: 'iPad Pro 12.9" M2 + Apple Pencil 2', description: 'iPad Pro 12.9-inch M2 chip, 128GB WiFi, Space Grey. Apple Pencil 2nd gen included. Keyboard Folio case also included. Perfect for artists and professionals.', price: 470, originalPrice: 720, currency: 'BHD', images: [productImages.electronics[2]], category: 'electronics', subcategory: 'Tablets', condition: 'good', seller: mockUsers[0], location: 'Riffa', distance: '1.2 km', createdAt: '2024-07-06', views: 2100, saves: 178, isNegotiable: false, hasDelivery: true, deliveryPrice: 4, isFeatured: true, isVerified: true, tags: ['ipad', 'apple', 'tablet', 'pencil'], brand: 'Apple', priceHistory: [] },
  { id: 'p9', title: 'Vintage Rolex Datejust 36 — 1985', description: 'Authentic 1985 Rolex Datejust 36mm in stainless steel with original blue dial. Service history available. Comes with period-correct oyster bracelet. All documentation.', price: 3200, currency: 'BHD', images: [productImages.fashion[0]], category: 'luxury', subcategory: 'Watches', condition: 'good', seller: mockUsers[3], location: 'Isa Town', distance: '15 km', createdAt: '2024-07-05', views: 5670, saves: 890, isNegotiable: true, hasDelivery: false, isFeatured: true, isVerified: true, tags: ['rolex', 'watch', 'vintage', 'luxury'], brand: 'Rolex', priceHistory: [] },
  { id: 'p10', title: 'Fender Stratocaster USA Standard 2019', description: 'American Standard Strat in Olympic White with maple neck. Bought new in 2019, played at home only. Includes original hardcase. Set up by a professional luthier.', price: 690, originalPrice: 910, currency: 'BHD', images: [productImages.electronics[0]], category: 'music', subcategory: 'Guitars', condition: 'like_new', seller: mockUsers[4], location: 'Muharraq', distance: '42 km', createdAt: '2024-07-04', views: 1456, saves: 234, isNegotiable: true, hasDelivery: true, deliveryPrice: 6, isFeatured: false, isVerified: false, tags: ['fender', 'stratocaster', 'guitar', 'electric'], brand: 'Fender', priceHistory: [] },
  { id: 'p11', title: 'Herman Miller Aeron Chair — Size B', description: 'Herman Miller Aeron chair in graphite, size B. Tilt limiter, lumbar support, adjustable arms. Like new condition, bought for home office. Best investment for your back.', price: 545, originalPrice: 1050, currency: 'BHD', images: [productImages.home[1]], category: 'home', subcategory: 'Tables', condition: 'like_new', seller: mockUsers[1], location: 'Manama', distance: '4.5 km', createdAt: '2024-07-03', views: 3210, saves: 345, isNegotiable: false, hasDelivery: false, isFeatured: true, isVerified: true, tags: ['herman miller', 'aeron', 'chair', 'ergonomic'], brand: 'Herman Miller', priceHistory: [] },
  { id: 'p12', title: 'Canon EOS R6 Mark II + RF 24-105mm', description: 'Canon EOS R6 Mark II body with RF 24-105mm f/4L lens. Only 3,400 shutter actuations. Perfect for videography and photography. Includes 2 batteries and charger.', price: 1520, originalPrice: 2290, currency: 'BHD', images: [productImages.electronics[1]], category: 'electronics', subcategory: 'Cameras', condition: 'like_new', seller: mockUsers[2], location: 'Salmabad', distance: '9.2 km', createdAt: '2024-07-02', views: 2345, saves: 289, isNegotiable: true, hasDelivery: true, deliveryPrice: 5, isFeatured: true, isVerified: true, tags: ['canon', 'camera', 'mirrorless', 'eos'], brand: 'Canon', priceHistory: [] },
];

export const mockReviews: Review[] = [
  { id: 'r1', reviewer: mockUsers[0], rating: 5, comment: 'Exactly as described! Quick shipping and great packaging. Highly recommended seller.', tags: ['Fast shipping', 'As described', 'Great packaging'], createdAt: '2024-07-01', type: 'buyer' },
  { id: 'r2', reviewer: mockUsers[2], rating: 5, comment: 'Perfect transaction! Item was in even better condition than expected. Will definitely buy again.', tags: ['As described', 'Fast response', 'Friendly'], createdAt: '2024-06-28', type: 'buyer' },
  { id: 'r3', reviewer: mockUsers[3], rating: 4, comment: 'Good seller, item was as described. Slight delay in shipping but communicated well.', tags: ['As described', 'Good communication'], createdAt: '2024-06-25', type: 'buyer' },
  { id: 'r4', reviewer: mockUsers[4], rating: 5, comment: 'Incredible item, packed perfectly. This seller is a gem!', tags: ['Top seller', 'Perfect packaging', 'Fast shipping'], createdAt: '2024-06-20', type: 'buyer' },
];

export const flashDeals: Product[] = mockProducts.slice(0, 4).map(p => ({ ...p, originalPrice: p.price * 1.4, price: Math.round(p.price * 0.8) }));
export const featuredProducts: Product[] = mockProducts.filter(p => p.isFeatured);
export const recentProducts: Product[] = [...mockProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
export const trendingProducts: Product[] = mockProducts.filter(p => p.views > 2000);

export function formatPrice(price: number, currency = 'BHD'): string {
  return new Intl.NumberFormat('ar-BH', { style: 'currency', currency, maximumFractionDigits: 3 }).format(price);
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function getDiscountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
