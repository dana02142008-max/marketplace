'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, Package, Tag, Star, Shield, Check } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { mockUsers, formatRelativeTime } from '@/lib/data';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 'n1', type: 'offer', icon: Tag, color: 'text-accent-500 bg-orange-50 dark:bg-orange-950/20', title: 'New offer received', body: 'Marcus Chen made an offer of 17,500 SEK on your MacBook Pro', time: '2024-07-14', read: false, user: mockUsers[1] },
  { id: 'n2', type: 'message', icon: MessageCircle, color: 'text-primary-500 bg-primary-50 dark:bg-primary-950/20', title: 'New message', body: 'Emma Lindqvist: "Is the iPhone still available?"', time: '2024-07-14', read: false, user: mockUsers[2] },
  { id: 'n3', type: 'save', icon: Heart, color: 'text-danger-500 bg-red-50 dark:bg-red-950/20', title: 'Item saved', body: '23 people saved your PlayStation 5 listing today', time: '2024-07-13', read: false, user: null },
  { id: 'n4', type: 'order', icon: Package, color: 'text-success-500 bg-success-50 dark:bg-success-950/20', title: 'Order delivered', body: 'Your order has been delivered successfully. Leave a review!', time: '2024-07-12', read: true, user: null },
  { id: 'n5', type: 'review', icon: Star, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20', title: 'New review', body: 'Sofia Andersson left you a 5-star review ⭐⭐⭐⭐⭐', time: '2024-07-11', read: true, user: mockUsers[0] },
  { id: 'n6', type: 'priceAlert', icon: Tag, color: 'text-success-500 bg-success-50 dark:bg-success-950/20', title: 'Price drop alert!', body: 'An item on your wishlist dropped by 15%', time: '2024-07-10', read: true, user: null },
  { id: 'n7', type: 'verification', icon: Shield, color: 'text-primary-500 bg-primary-50 dark:bg-primary-950/20', title: 'Account verified ✓', body: 'Your identity has been verified. Your trust badge is now live!', time: '2024-07-08', read: true, user: null },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-app py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Bell className="w-7 h-7 text-primary-500" />
              Notifications
            </h1>
            {unreadCount > 0 && <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p>}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              <Check className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
              className={cn('card p-4 flex items-start gap-4 cursor-pointer transition-all', !notif.read && 'border-l-4 border-l-primary-500')}
            >
              <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0', notif.color)}>
                <notif.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={cn('text-sm font-semibold', !notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300')}>{notif.title}</h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatRelativeTime(notif.time)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{notif.body}</p>
                {notif.user && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar src={notif.user.avatar} name={notif.user.name} size="xs" />
                    <span className="text-xs text-gray-500">{notif.user.name}</span>
                  </div>
                )}
              </div>
              {!notif.read && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
