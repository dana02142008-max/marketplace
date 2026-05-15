'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Package, Eye, MessageCircle, Star, Plus, BarChart2,
  DollarSign, ArrowUp, ArrowDown, Clock, Zap, Edit, Trash2,
  Bell, ShoppingBag, Heart, Award, ChevronRight, MoreHorizontal,
  Settings, Shield, CheckCircle2, XCircle, AlertCircle, Truck
} from 'lucide-react';
import { mockProducts, mockUsers, formatPrice, formatRelativeTime } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const tabs = ['Overview', 'Listings', 'Orders', 'Analytics', 'Earnings'];

const mockOrders = [
  { id: 'o1', product: mockProducts[0], buyer: mockUsers[2], status: 'delivered', price: 18500, date: '2024-07-12' },
  { id: 'o2', product: mockProducts[1], buyer: mockUsers[3], status: 'in_transit', price: 4200, date: '2024-07-13' },
  { id: 'o3', product: mockProducts[4], buyer: mockUsers[4], status: 'confirmed', price: 12500, date: '2024-07-14' },
  { id: 'o4', product: mockProducts[3], buyer: mockUsers[1], status: 'pending', price: 7200, date: '2024-07-14' },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'warning', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'primary', icon: CheckCircle2 },
  in_transit: { label: 'In Transit', color: 'primary', icon: Truck },
  delivered: { label: 'Delivered', color: 'success', icon: CheckCircle2 },
  disputed: { label: 'Disputed', color: 'danger', icon: AlertCircle },
};

const earningsData = [45, 78, 52, 90, 110, 95, 130, 115, 140, 125, 160, 145];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const user = mockUsers[0];

  const stats = [
    { label: 'Total Earnings', value: '147,500 SEK', change: '+23%', up: true, icon: DollarSign, color: 'from-emerald-500 to-green-400', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { label: 'Active Listings', value: '12', change: '+3', up: true, icon: Package, color: 'from-primary-500 to-violet-500', bg: 'bg-primary-50 dark:bg-primary-950/20' },
    { label: 'Total Views', value: '24,812', change: '+18%', up: true, icon: Eye, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { label: 'Response Rate', value: '98%', change: '+2%', up: true, icon: MessageCircle, color: 'from-accent-500 to-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/20' },
  ];

  const maxEarning = Math.max(...earningsData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container-app py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar src={user.avatar} name={user.name} size="lg" verified={user.verified} online />
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <StarRating rating={user.rating} showValue />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{user.reviewCount} reviews</span>
                  <div className="flex gap-1">
                    {user.badges.map(b => (
                      <Badge key={b.id} variant="primary">{b.icon} {b.label}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full" />
              </button>
              <Link href="/sell">
                <Button size="md" className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Listing
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn('px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all', activeTab === tab ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300')}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className={`card p-5 ${stat.bg}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className={cn('flex items-center gap-1 text-xs font-semibold', stat.up ? 'text-success-600 dark:text-success-400' : 'text-danger-500')}>
                        {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Earnings chart */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Earnings Overview</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Monthly earnings (SEK thousands)</p>
                  </div>
                  <Badge variant="success">+23% this month</Badge>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {earningsData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(val / maxEarning) * 100}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className={cn('w-full rounded-t-lg transition-all', i === earningsData.length - 1 ? 'bg-primary-600' : 'bg-primary-200 dark:bg-primary-900/40 hover:bg-primary-400 dark:hover:bg-primary-700')}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {monthLabels.map((m, i) => (
                    <span key={m} className={cn('text-[10px] flex-1 text-center', i === earningsData.length - 1 ? 'text-primary-600 font-bold' : 'text-gray-400 dark:text-gray-600')}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Achievement badges */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    { emoji: '⭐', label: 'Top Seller', desc: '500+ successful sales', earned: true },
                    { emoji: '🚀', label: 'Fast Shipper', desc: 'Ships within 24h', earned: true },
                    { emoji: '🛡️', label: 'Trusted Seller', desc: '100% positive feedback', earned: true },
                    { emoji: '💬', label: 'Quick Responder', desc: 'Reply < 1 hour', earned: true },
                    { emoji: '💎', label: 'Diamond Seller', desc: '1000+ sales (98/1000)', earned: false },
                  ].map(badge => (
                    <div key={badge.label} className={cn('flex items-center gap-3 p-3 rounded-2xl transition-all', badge.earned ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-gray-50 dark:bg-gray-800 opacity-60')}>
                      <span className="text-xl">{badge.emoji}</span>
                      <div className="flex-1">
                        <div className={cn('text-sm font-semibold', badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400')}>{badge.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</div>
                      </div>
                      {badge.earned && <CheckCircle2 className="w-4 h-4 text-yellow-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                <button onClick={() => setActiveTab('Orders')} className="text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {mockOrders.map(order => {
                  const s = statusConfig[order.status as keyof typeof statusConfig];
                  return (
                    <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        {order.product.images[0] && <img src={order.product.images[0]} alt="" className="object-cover w-full h-full" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{order.product.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Avatar src={order.buyer.avatar} name={order.buyer.name} size="xs" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{order.buyer.name}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{formatPrice(order.price)}</div>
                        <Badge variant={s.color as any} className="text-[10px] mt-1">
                          {s.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* My listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">My Listings</h3>
                <Link href="/sell"><Button size="sm"><Plus className="w-4 h-4" />New</Button></Link>
              </div>
              <div className="product-grid">
                {mockProducts.slice(0, 5).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Listings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Listings</h2>
              <Link href="/sell"><Button><Plus className="w-4 h-4" />New Listing</Button></Link>
            </div>
            <div className="space-y-3">
              {mockProducts.map(product => (
                <div key={product.id} className="card p-4 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={product.images[0]} alt="" className="object-cover w-full h-full" />
                    {product.isFeatured && <span className="absolute top-1 left-1 text-[10px] font-bold bg-primary-600 text-white px-1.5 py-0.5 rounded-lg">Featured</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{product.title}</h4>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><Eye className="w-3 h-3" />{product.views}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><Heart className="w-3 h-3" />{product.saves}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{formatRelativeTime(product.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={product.isVerified ? 'success' : 'gray'}>{product.isVerified ? 'Active' : 'Pending'}</Badge>
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-danger-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Orders</h2>
            <div className="space-y-4">
              {mockOrders.map(order => {
                const s = statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <div key={order.id} className="card p-5">
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={order.product.images[0]} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{order.product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar src={order.buyer.avatar} name={order.buyer.name} size="xs" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">Buyer: {order.buyer.name}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900 dark:text-white">{formatPrice(order.price)}</div>
                            <Badge variant={s.color as any} className="mt-1">
                              <s.icon className="w-3 h-3" />
                              {s.label}
                            </Badge>
                          </div>
                        </div>

                        {/* Order progress */}
                        <div className="mt-4">
                          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {['pending', 'confirmed', 'in_transit', 'delivered'].map((st, i) => {
                              const statuses = ['pending', 'confirmed', 'in_transit', 'delivered'];
                              const currentIndex = statuses.indexOf(order.status);
                              const stepIndex = statuses.indexOf(st);
                              const isDone = stepIndex <= currentIndex;
                              return (
                                <div key={st} className="flex items-center gap-2 flex-shrink-0">
                                  <div className={cn('w-2 h-2 rounded-full', isDone ? 'bg-success-500' : 'bg-gray-200 dark:bg-gray-700')} />
                                  <span className={cn('text-xs', isDone ? 'text-success-600 dark:text-success-400 font-medium' : 'text-gray-400 dark:text-gray-600')}>
                                    {statusConfig[st as keyof typeof statusConfig]?.label}
                                  </span>
                                  {i < 3 && <div className={cn('h-px w-6', isDone && stepIndex < currentIndex ? 'bg-success-400' : 'bg-gray-200 dark:bg-gray-700')} />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary-500" />
                  Top Performing Listings
                </h3>
                {mockProducts.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-sm font-bold text-gray-400 w-4">{i + 1}</span>
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={p.images[0]} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{p.views} views · {p.saves} saves</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(p.price)}</div>
                  </div>
                ))}
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary-500" />
                  Performance Summary
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Conversion rate', value: '8.4%', target: '84%', color: 'bg-primary-500' },
                    { label: 'Message response', value: '98%', target: '98%', color: 'bg-success-500' },
                    { label: 'Positive reviews', value: '100%', target: '100%', color: 'bg-yellow-500' },
                    { label: 'On-time shipping', value: '96%', target: '96%', color: 'bg-blue-500' },
                    { label: 'Listing quality', value: '92%', target: '92%', color: 'bg-violet-500' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.target }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn('h-full rounded-full', item.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Earnings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Earnings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Available to withdraw', value: '34,200 SEK', icon: DollarSign, color: 'text-success-600', bg: 'bg-success-50 dark:bg-green-950/20' },
                { label: 'In escrow', value: '8,900 SEK', icon: Shield, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-950/20' },
                { label: 'Total earned', value: '147,500 SEK', icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950/20' },
              ].map(item => (
                <div key={item.label} className={cn('card p-5', item.bg)}>
                  <item.icon className={cn('w-6 h-6 mb-3', item.color)} />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="card p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Ready to withdraw</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">34,200 SEK available · Instant bank transfer</p>
              </div>
              <Button size="lg">Withdraw funds</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
