'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Clock, AlertCircle, ChevronRight, Search } from 'lucide-react';
import { mockProducts, mockUsers, formatPrice, formatRelativeTime } from '@/lib/data';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const mockOrders = [
  { id: 'o1', product: mockProducts[0], seller: mockUsers[1], status: 'delivered', price: 18500, date: '2024-07-12', tracking: 'TW-9284710' },
  { id: 'o2', product: mockProducts[1], seller: mockUsers[2], status: 'in_transit', price: 4200, date: '2024-07-13', tracking: 'TW-8371924' },
  { id: 'o3', product: mockProducts[4], seller: mockUsers[3], status: 'confirmed', price: 12500, date: '2024-07-14', tracking: 'TW-7462018' },
  { id: 'o4', product: mockProducts[3], seller: mockUsers[4], status: 'pending', price: 7200, date: '2024-07-15', tracking: null },
];

const statusConfig: Record<string, { label: string; color: 'success' | 'primary' | 'warning' | 'accent'; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'warning', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'primary', icon: CheckCircle2 },
  in_transit: { label: 'In Transit', color: 'accent', icon: Truck },
  delivered: { label: 'Delivered', color: 'success', icon: CheckCircle2 },
};

const tabs = ['All Orders', 'Pending', 'In Transit', 'Delivered'];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter(o => {
    const matchTab = activeTab === 'All Orders' || statusConfig[o.status]?.label === activeTab;
    const matchSearch = o.product.title.toLowerCase().includes(search.toLowerCase()) || o.tracking?.includes(search);
    return matchTab && matchSearch;
  });

  return (
    <div className="container-app py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your purchases</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn('px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all', activeTab === tab
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders or tracking number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No orders found</p>
          </div>
        )}
        {filtered.map((order, i) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                <img src={order.product.images[0]} alt={order.product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{order.product.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar src={order.seller.avatar} name={order.seller.name} size="xs" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{order.seller.name}</span>
                    </div>
                  </div>
                  <Badge variant={status.color}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(order.price)}</div>
                    {order.tracking && (
                      <div className="text-xs text-gray-400 mt-0.5">Tracking: {order.tracking}</div>
                    )}
                  </div>
                  <Link
                    href={`/product/${order.product.id}`}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
