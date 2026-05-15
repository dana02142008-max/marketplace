'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Zap, Shield, Package, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { formatPrice, getDiscountPercent } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal' | 'featured';
  className?: string;
  index?: number;
}

const conditionLabels = {
  new: 'New',
  like_new: 'Like New',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

const conditionColors = {
  new: 'success',
  like_new: 'success',
  good: 'primary',
  fair: 'warning',
  poor: 'gray',
} as const;

export function ProductCard({ product, variant = 'default', className, index = 0 }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useStore();
  const isWished = wishlist.includes(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={cn('card-interactive flex gap-4 p-3 group', className)}
      >
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
          <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="112px" />
          {discount > 0 && (
            <div className="absolute top-1.5 left-1.5 bg-danger-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
              -{discount}%
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 py-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{product.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{product.location}</span>
            {product.distance && <span>· {product.distance}</span>}
          </div>
        </div>
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
          className={cn('flex-shrink-0 self-start mt-1 w-8 h-8 flex items-center justify-center rounded-xl transition-all', isWished ? 'text-danger-500' : 'text-gray-300 hover:text-danger-400')}
        >
          <Heart className={cn('w-4 h-4', isWished && 'fill-current')} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={cn('group', className)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="card-interactive overflow-hidden">
          {/* Image */}
          <div
            className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800"
            onMouseEnter={() => product.images.length > 1 && setCurrentImage(1)}
            onMouseLeave={() => setCurrentImage(0)}
          >
            {!imageLoaded && <div className="skeleton absolute inset-0" />}
            <Image
              src={product.images[currentImage] || product.images[0]}
              alt={product.title}
              fill
              className={cn('object-cover transition-all duration-500 group-hover:scale-105', imageLoaded ? 'opacity-100' : 'opacity-0')}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />

            {/* Overlay badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="bg-danger-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                  -{discount}%
                </span>
              )}
              {product.condition === 'new' && (
                <span className="bg-success-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                  NEW
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                  ⭐ FEATURED
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
              className={cn(
                'absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-sm',
                isWished
                  ? 'bg-danger-500 text-white scale-100'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-danger-500 scale-90 group-hover:scale-100',
                'backdrop-blur-sm'
              )}
            >
              <Heart className={cn('w-4 h-4', isWished && 'fill-current')} />
            </button>

            {/* Image dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.preventDefault(); setCurrentImage(i); }}
                    className={cn('w-1.5 h-1.5 rounded-full transition-all', i === currentImage ? 'bg-white w-3' : 'bg-white/60')}
                  />
                ))}
              </div>
            )}

            {/* Quick stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3 text-white text-xs">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{product.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{product.saves}</span>
                {product.hasDelivery && <span className="flex items-center gap-1"><Package className="w-3 h-3" />Delivery</span>}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{product.distance || product.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant={conditionColors[product.condition]} className="text-[10px] py-0.5 px-1.5">
                  {conditionLabels[product.condition]}
                </Badge>
                {product.isVerified && (
                  <Shield className="w-3.5 h-3.5 text-success-500" />
                )}
              </div>
            </div>

            {/* Seller quick info */}
            <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-800 flex items-center gap-1.5">
              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {product.seller.avatar && <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" sizes="20px" />}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{product.seller.name}</span>
              {product.seller.verified && <Shield className="w-3 h-3 text-primary-500 flex-shrink-0" />}
              {product.hasDelivery && (
                <span className="ml-auto flex items-center gap-0.5 text-[10px] text-success-600 dark:text-success-400 font-medium">
                  <Zap className="w-3 h-3" />
                  Ship
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 rounded-lg" />
        <div className="skeleton h-4 w-2/3 rounded-lg" />
        <div className="skeleton h-5 w-1/2 rounded-lg" />
        <div className="skeleton h-3 w-3/4 rounded-lg" />
      </div>
    </div>
  );
}
