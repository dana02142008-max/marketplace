'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Shield, MessageCircle, Package, Star } from 'lucide-react';
import { mockUsers, mockProducts, mockReviews, formatRelativeTime } from '@/lib/data';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';

export default function SellerProfilePage() {
  const params = useParams();
  const seller = mockUsers.find(u => u.id === params.id) || mockUsers[0];
  const sellerProducts = mockProducts.filter(p => p.seller.id === seller.id || p.seller.id !== seller.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Cover */}
      <div className="h-48 bg-gradient-to-r from-primary-500 via-violet-500 to-accent-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>

      <div className="container-app max-w-4xl">
        <div className="-mt-16 relative z-10 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="relative">
              <Avatar src={seller.avatar} name={seller.name} size="xl" verified={seller.verified} online={seller.isOnline} />
            </div>
            <div className="flex-1 pt-4 sm:pt-16">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{seller.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">@{seller.username}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <StarRating rating={seller.rating} showValue size="md" />
                    <span className="text-sm text-gray-500">({seller.reviewCount} reviews)</span>
                  </div>
                </div>
                <Button size="md">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm max-w-lg">{seller.bio}</p>
            </div>
          </div>
        </div>

        <div className="py-6 grid grid-cols-3 sm:grid-cols-5 gap-4 border-b border-gray-100 dark:border-gray-800">
          {[
            { label: 'Sales', value: seller.totalSales, icon: Package },
            { label: 'Rating', value: seller.rating, icon: Star },
            { label: 'Reviews', value: seller.reviewCount, icon: Star },
            { label: 'Response', value: seller.responseTime, icon: MessageCircle },
          ].map(item => (
            <div key={item.label} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">{seller.location.split(',')[0]}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Location</div>
          </div>
        </div>

        {/* Badges */}
        <div className="py-6 flex flex-wrap gap-2 border-b border-gray-100 dark:border-gray-800">
          {seller.badges.map(badge => (
            <div key={badge.id} className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold border border-primary-100 dark:border-primary-800/30">
              <span className="text-base">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
          {seller.verified && (
            <div className="flex items-center gap-2 px-4 py-2 bg-success-50 dark:bg-green-950/20 text-success-700 dark:text-success-400 rounded-full text-sm font-semibold border border-success-100 dark:border-green-900/30">
              <Shield className="w-4 h-4" />
              ID Verified
            </div>
          )}
        </div>

        {/* Listings */}
        <div className="py-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Listings</h2>
          <div className="product-grid">
            {sellerProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* Reviews */}
        <div className="py-8 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map(review => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={review.reviewer.avatar} name={review.reviewer.name} size="sm" />
                  <div className="flex-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{review.reviewer.name}</span>
                    <StarRating rating={review.rating} className="mt-0.5" />
                  </div>
                  <span className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {review.tags.map(tag => <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">{tag}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
