'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { mockProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const savedProducts = mockProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container-app py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Heart className="w-7 h-7 text-danger-500 fill-danger-500" />
              Saved Items
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{savedProducts.length} items saved</p>
          </div>
          {savedProducts.length > 0 && (
            <Button variant="secondary" size="md">
              <ShoppingBag className="w-4 h-4" />
              Buy all
            </Button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-7xl mb-6">💝</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. We'll let you know if the price drops!
            </p>
            <Link href="/browse">
              <Button size="lg">Start browsing</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="product-grid">
            {savedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
