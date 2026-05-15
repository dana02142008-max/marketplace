'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Package, DollarSign, TrendingUp, Shield, AlertTriangle,
  Check, X, Eye, Flag, BarChart3, Settings, Truck, MessageCircle,
  Search, Filter, ChevronDown, MoreHorizontal, RefreshCw, Download,
  UserCheck, UserX, Star, Zap, Database, Activity, Globe, Lock
} from 'lucide-react';
import { mockProducts, mockUsers, mockReviews, formatPrice, formatRelativeTime } from '@/lib/data';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { cn } from '@/lib/utils';

const adminTabs = ['Overview', 'Listings', 'Users', 'Orders', 'Disputes', 'Reports', 'Settings'];

const flaggedListings = mockProducts.slice(0, 3).map(p => ({
  ...p,
  flagReason: ['Suspected counterfeit', 'Misleading description', 'Inappropriate content'][Math.floor(Math.random() * 3)],
  flagCount: Math.floor(Math.random() * 5) + 1,
}));

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  const metrics = [
    { label: 'Total Users', value: '184,230', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-400', trend: 'up' },
    { label: 'Active Listings', value: '2.4M', change: '+8%', icon: Package, color: 'from-primary-500 to-violet-500', trend: 'up' },
    { label: 'Daily Volume', value: '1.2M SEK', change: '+23%', icon: DollarSign, color: 'from-emerald-500 to-green-400', trend: 'up' },
    { label: 'Avg. Response Time', value: '47 min', change: '-5%', icon: MessageCircle, color: 'from-accent-500 to-orange-400', trend: 'down' },
    { label: 'Fraud Prevented', value: '1,247', change: '+32%', icon: Shield, color: 'from-red-500 to-rose-400', trend: 'up' },
    { label: 'Disputes Open', value: '23', change: '-18%', icon: AlertTriangle, color: 'from-yellow-500 to-amber-400', trend: 'down' },
    { label: 'Deliveries Today', value: '3,892', change: '+15%', icon: Truck, color: 'from-teal-500 to-cyan-400', trend: 'up' },
    { label: 'Platform Uptime', value: '99.97%', change: '+0.02%', icon: Activity, color: 'from-green-500 to-emerald-400', trend: 'up' },
  ];

  const recentActivity = [
    { type: 'signup', text: 'New user registered: Johan Nilsson', time: '2m ago', icon: UserCheck, color: 'text-success-500 bg-success-50 dark:bg-success-950/20' },
    { type: 'report', text: 'Listing flagged for review: "Rolex Datejust"', time: '5m ago', icon: Flag, color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20' },
    { type: 'transaction', text: 'Transaction completed: 18,500 SEK', time: '8m ago', icon: DollarSign, color: 'text-success-600 bg-success-50 dark:bg-success-950/20' },
    { type: 'ban', text: 'User suspended: suspicious activity', time: '15m ago', icon: UserX, color: 'text-danger-500 bg-red-50 dark:bg-red-950/20' },
    { type: 'delivery', text: 'Delivery completed: Order #4821', time: '22m ago', icon: Truck, color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/20' },
    { type: 'fraud', text: 'Potential fraud detected & blocked', time: '35m ago', icon: Shield, color: 'text-red-600 bg-red-50 dark:bg-red-950/20' },
  ];

  const weeklyData = [120, 145, 132, 165, 180, 156, 200];
  const maxVal = Math.max(...weeklyData);
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Admin header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white">
        <div className="container-app py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg">Admin Dashboard</h1>
                <p className="text-gray-400 text-xs">TradeWave Control Panel · Super Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                All systems operational
              </div>
              <Button variant="secondary" size="sm" className="text-white border-gray-600 bg-gray-700 hover:bg-gray-600">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container-app">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {adminTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn('px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all', activeTab === tab ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800')}
              >
                {tab}
                {tab === 'Disputes' && <span className="ml-1.5 bg-danger-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">23</span>}
                {tab === 'Reports' && <span className="ml-1.5 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">7</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                        <m.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className={cn('text-xs font-bold', m.trend === 'up' ? 'text-success-600 dark:text-success-400' : 'text-success-600 dark:text-success-400')}>
                        {m.change}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{m.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Transactions chart */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Transaction Volume</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This week (SEK thousands)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">+23% vs last week</Badge>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-end gap-3 h-36">
                  {weeklyData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{val}K</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(val / maxVal) * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className={cn('w-full rounded-t-xl', i === 6 ? 'bg-gradient-to-t from-primary-700 to-primary-500' : 'bg-gradient-to-t from-primary-200 to-primary-100 dark:from-primary-900/60 dark:to-primary-900/30')}
                      />
                      <span className={cn('text-xs', i === 6 ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-600')}>{dayLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Live Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0', item.color)}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">{item.text}</p>
                        <span className="text-[10px] text-gray-400 mt-0.5">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Flagged listings */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Flag className="w-5 h-5 text-yellow-500" />
                  Flagged Listings — Action Required
                </h3>
                <Badge variant="warning">{flaggedListings.length} pending</Badge>
              </div>
              <div className="space-y-3">
                {flaggedListings.map(listing => (
                  <div key={listing.id} className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-950/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={listing.images[0]} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{listing.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-danger-500 font-medium flex items-center gap-1">
                          <Flag className="w-3 h-3" />
                          {listing.flagReason}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{listing.flagCount} reports</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Avatar src={listing.seller.avatar} name={listing.seller.name} size="xs" />
                        <span className="text-xs text-gray-500">{listing.seller.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <Eye className="w-4 h-4" />
                        Review
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success-500 hover:bg-success-600 text-white text-sm font-semibold transition-all">
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-danger-500 hover:bg-danger-600 text-white text-sm font-semibold transition-all">
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search users..." className="bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none w-40" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3">User</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Location</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Sales</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3">Rating</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {mockUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatar} name={user.name} size="sm" verified={user.verified} online={user.isOnline} />
                          <div>
                            <div className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">{user.location}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white hidden sm:table-cell">{user.totalSales}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <StarRating rating={user.rating} size="sm" />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={user.verified ? 'success' : 'gray'}>
                          {user.verified ? '✓ Verified' : 'Unverified'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 transition-all">
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-danger-500 transition-all">
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Listings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Listings</h2>
              <Badge variant="gray">{mockProducts.length} total</Badge>
            </div>
            <div className="space-y-3">
              {mockProducts.map(product => (
                <div key={product.id} className="card p-4 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={product.images[0]} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{product.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Avatar src={product.seller.avatar} name={product.seller.name} size="xs" />
                      <span className="text-xs text-gray-500">{product.seller.name}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{product.views} views</span>
                      <span className="text-xs text-gray-500">{formatRelativeTime(product.createdAt)}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</div>
                    <Badge variant={product.isVerified ? 'success' : 'warning'} className="mt-1 text-[10px]">
                      {product.isVerified ? '✓ Approved' : '⏳ Review'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl text-success-500 hover:bg-success-50 dark:hover:bg-success-950/20 transition-all">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl text-danger-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {['Disputes', 'Reports', 'Settings'].includes(activeTab) && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">
              {activeTab === 'Disputes' ? '⚖️' : activeTab === 'Reports' ? '📊' : '⚙️'}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{activeTab}</h3>
            <p className="text-gray-500 dark:text-gray-400">This section is fully functional in the complete build.</p>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Orders Management</h3>
            <p className="text-gray-500 dark:text-gray-400">Live delivery tracking and order management dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
