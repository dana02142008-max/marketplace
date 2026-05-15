'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Shield, ArrowRight, Package, MessageCircle } from 'lucide-react';
import { mockUsers } from '@/lib/data';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export function FeaturedSellers() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Top Sellers</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Trusted by thousands of buyers</p>
          </div>
          <Link href="/sellers" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:gap-3 transition-all">
            Browse sellers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockUsers.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/seller/${user.id}`}>
                <div className="card-interactive p-5 text-center group">
                  <div className="relative inline-block mb-3">
                    <Avatar src={user.avatar} name={user.name} size="lg" verified={user.verified} online={user.isOnline} />
                    {user.badges[0] && (
                      <div className="absolute -top-1 -right-1 text-base">{user.badges[0].icon}</div>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">{user.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">@{user.username}</p>

                  <StarRating rating={user.rating} showValue className="justify-center mb-2" />

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user.reviewCount} reviews</p>

                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {user.badges.slice(0, 2).map(badge => (
                      <Badge key={badge.id} variant="primary" className="text-[10px]">
                        {badge.icon} {badge.label}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{user.totalSales}</div>
                      <div className="text-[10px] text-gray-500">Sales</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{user.responseTime}</div>
                      <div className="text-[10px] text-gray-500">Response</div>
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all flex items-center justify-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Message
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
