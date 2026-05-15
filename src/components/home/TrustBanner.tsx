'use client';
import { motion } from 'framer-motion';
import { Shield, Zap, CreditCard, Package, Star, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Buyer Protection',
    desc: 'Every purchase is protected. Get a refund if item is not as described.',
    gradient: 'from-green-500 to-emerald-400',
    bg: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
  },
  {
    icon: Zap,
    title: 'Same-day Delivery',
    desc: 'Order before 2pm for same-day delivery in 340+ cities.',
    gradient: 'from-primary-500 to-violet-500',
    bg: 'from-primary-50 to-violet-50 dark:from-primary-950/20 dark:to-violet-950/20',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    desc: 'Escrow system holds funds safely until you receive your item.',
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
  },
  {
    icon: Star,
    title: 'Verified Sellers',
    desc: 'ID-verified sellers with ratings and transaction history.',
    gradient: 'from-yellow-500 to-amber-400',
    bg: 'from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20',
  },
  {
    icon: HeartHandshake,
    title: 'Fair Offers',
    desc: 'Built-in offer system for transparent price negotiation.',
    gradient: 'from-pink-500 to-rose-400',
    bg: 'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20',
  },
  {
    icon: Package,
    title: 'AI Listings',
    desc: 'Sell in 30 seconds — AI generates title, description and price.',
    gradient: 'from-accent-500 to-orange-400',
    bg: 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
  },
];

export function TrustBanner() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Why TradeWave?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We rebuilt the marketplace experience from scratch. Safer, faster, and more fun than anything else out there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`bg-gradient-to-br ${f.bg} rounded-3xl p-6 border border-white dark:border-gray-700/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1 h-full`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-soft`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
