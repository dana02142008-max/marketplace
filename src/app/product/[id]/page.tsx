'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Share2, Shield, Zap, MapPin, Clock, Eye, ChevronLeft,
  ChevronRight, Star, Package, MessageCircle, CreditCard, ArrowLeft,
  CheckCircle2, Tag, TrendingDown, Flag, ChevronDown, BarChart2,
  Truck, Info, ZoomIn
} from 'lucide-react';
import { mockProducts, mockReviews, formatPrice, formatRelativeTime, getDiscountPercent } from '@/lib/data';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { CryptoPaymentModal } from '@/components/payment/CryptoPaymentModal';
import { FiatPaymentModal } from '@/components/payment/FiatPaymentModal';
import { cn } from '@/lib/utils';

const conditionInfo = {
  new: { label: 'Brand New', color: 'success', desc: 'Never used, original packaging' },
  like_new: { label: 'Like New', color: 'success', desc: 'Used once or twice, perfect condition' },
  good: { label: 'Good', color: 'primary', desc: 'Light signs of use, fully functional' },
  fair: { label: 'Fair', color: 'warning', desc: 'Noticeable signs of use, works fine' },
  poor: { label: 'Poor', color: 'danger', desc: 'Heavy use, defects present' },
} as const;

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { wishlist, toggleWishlist } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showFiatModal, setShowFiatModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerSent, setOfferSent] = useState(false);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  useEffect(() => {
    const found = mockProducts.find(p => p.id === params.id);
    if (found) {
      setProduct(found);
      setOfferAmount(String(Math.round(found.price * 0.9)));
    }
  }, [params.id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isWished = wishlist.includes(product.id);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;
  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  const cond = conditionInfo[product.condition];

  const handleOffer = () => {
    setOfferSent(true);
    setTimeout(() => { setShowOfferModal(false); setOfferSent(false); }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back button */}
      <div className="container-app pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </button>
      </div>

      <div className="container-app py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(prev => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage(prev => (prev + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && <span className="bg-danger-500 text-white text-sm font-bold px-3 py-1 rounded-xl">-{discount}%</span>}
                {product.isFeatured && <span className="bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-xl">⭐ FEATURED</span>}
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn('w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110', isWished ? 'bg-danger-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:text-danger-500')}
                >
                  <Heart className={cn('w-5 h-5', isWished && 'fill-current')} />
                </button>
                <button className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-all hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={cn('transition-all rounded-full', i === activeImage ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60')} />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn('flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all', i === activeImage ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600')}
                  >
                    <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}

            {/* Safety info */}
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-2xl border border-green-100 dark:border-green-900/30">
              <Shield className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">Buyer Protection Active</p>
                <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">Funds held in escrow until you confirm receipt. Full refund if item not as described.</p>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Category breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/browse" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Browse</Link>
              <span>›</span>
              <Link href={`/browse?category=${product.category}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors capitalize">{product.category}</Link>
              <span>›</span>
              <span className="text-gray-400 dark:text-gray-500 truncate">{product.subcategory}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Price + discount */}
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-base text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-bold text-success-600">Save {formatPrice(product.originalPrice - product.price)}</span>
                </div>
              )}
              {product.isNegotiable && (
                <Badge variant="accent">Negotiable</Badge>
              )}
            </div>

            {/* Price history */}
            {product.priceHistory && product.priceHistory.length > 0 && (
              <button
                onClick={() => setShowPriceHistory(!showPriceHistory)}
                className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium"
              >
                <TrendingDown className="w-4 h-4" />
                Price dropped {discount}% · See history
                <ChevronDown className={cn('w-4 h-4 transition-transform', showPriceHistory && 'rotate-180')} />
              </button>
            )}
            <AnimatePresence>
              {showPriceHistory && product.priceHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-2">
                    {product.priceHistory.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{new Date(entry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        <span className={cn('font-semibold', entry.price === product.price ? 'text-success-600' : 'text-gray-700 dark:text-gray-300')}>{formatPrice(entry.price)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Key details */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Tag, label: 'Condition', value: cond.label, color: 'text-success-600' },
                { icon: MapPin, label: 'Location', value: `${product.location}${product.distance ? ` · ${product.distance}` : ''}`, color: 'text-accent-500' },
                { icon: Clock, label: 'Listed', value: formatRelativeTime(product.createdAt), color: 'text-primary-500' },
                { icon: Eye, label: 'Views', value: product.views.toLocaleString(), color: 'text-gray-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <item.icon className={cn('w-4 h-4 flex-shrink-0', item.color)} />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery info */}
            {product.hasDelivery && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <Truck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Delivery available</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">{product.deliveryPrice ? `${formatPrice(product.deliveryPrice)} · Est. 1-3 business days` : 'Free delivery available'}</p>
                </div>
                <Badge variant="primary">Tracked</Badge>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <Button size="xl" onClick={() => setShowFiatModal(true)} className="w-full text-base font-bold bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-glow">
                <CreditCard className="w-5 h-5" />
                Buy Now — {formatPrice(product.price)}
              </Button>
              <button
                onClick={() => setShowCryptoModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
              >
                <span className="text-lg">🔐</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">Pay with Crypto</span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-md font-mono">ETH</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-md font-mono">SOL</span>
                </div>
              </button>
              <div className="grid grid-cols-2 gap-3">
                {product.isNegotiable && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setShowOfferModal(true)}
                    className="font-semibold"
                  >
                    <Tag className="w-4 h-4" />
                    Make Offer
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="lg"
                  className={cn('font-semibold', !product.isNegotiable && 'col-span-2')}
                  onClick={() => router.push('/messages')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Message Seller
                </Button>
              </div>
            </div>

            {/* Seller card */}
            <div className="card p-5">
              <Link href={`/seller/${product.seller.id}`}>
                <div className="flex items-center gap-4 mb-4 group">
                  <Avatar src={product.seller.avatar} name={product.seller.name} size="lg" verified={product.seller.verified} online={product.seller.isOnline} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.seller.name}</h3>
                      {product.seller.verified && <Shield className="w-4 h-4 text-primary-500" />}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{product.seller.username}</p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={product.seller.rating} showValue />
                    <p className="text-xs text-gray-500 mt-0.5">{product.seller.reviewCount} reviews</p>
                  </div>
                </div>
              </Link>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Sales', value: product.seller.totalSales },
                  { label: 'Response', value: product.seller.responseTime },
                  { label: 'Joined', value: new Date(product.seller.joinedDate).getFullYear() },
                ].map(item => (
                  <div key={item.label} className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{item.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {product.seller.badges.map(badge => (
                  <Badge key={badge.id} variant="primary">{badge.icon} {badge.label}</Badge>
                ))}
                {product.seller.isOnline && <Badge variant="success">🟢 Online now</Badge>}
              </div>
              <Button variant="secondary" size="md" className="w-full">
                <MessageCircle className="w-4 h-4" />
                Send a message
              </Button>
            </div>

            {/* Report */}
            <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Flag className="w-3.5 h-3.5" />
              Report this listing
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
            <div className={cn('text-gray-600 dark:text-gray-400 leading-relaxed text-sm', !showAllDesc && 'line-clamp-3')}>
              {product.description}
            </div>
            <button onClick={() => setShowAllDesc(!showAllDesc)} className="mt-2 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline">
              {showAllDesc ? 'Show less' : 'Read more'}
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map(tag => (
                <Link key={tag} href={`/browse?q=${tag}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Seller Reviews</h2>
            <div className="space-y-4">
              {mockReviews.slice(0, 3).map(review => (
                <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar src={review.reviewer.avatar} name={review.reviewer.name} size="sm" />
                    <div className="flex-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{review.reviewer.name}</span>
                      <StarRating rating={review.rating} className="mt-0.5" />
                    </div>
                    <span className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {review.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">Similar Items</h2>
            <div className="product-grid">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Offer Modal */}
      <AnimatePresence>
        {showOfferModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowOfferModal(false); }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl"
            >
              {offerSent ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Offer Sent! 🎉</h3>
                  <p className="text-gray-500 dark:text-gray-400">The seller will respond within {product.seller.responseTime}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Make an Offer</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Listed for <strong>{formatPrice(product.price)}</strong></p>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Your offer</label>
                    <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary-400">
                      <span className="text-gray-500 font-medium">SEK</span>
                      <input
                        type="number"
                        value={offerAmount}
                        onChange={e => setOfferAmount(e.target.value)}
                        className="flex-1 bg-transparent text-lg font-bold text-gray-900 dark:text-white focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[0.7, 0.8, 0.9].map(factor => (
                        <button
                          key={factor}
                          onClick={() => setOfferAmount(String(Math.round(product.price * factor)))}
                          className="flex-1 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                        >
                          {Math.round(factor * 100)}% · {formatPrice(Math.round(product.price * factor))}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" size="lg" className="flex-1" onClick={() => setShowOfferModal(false)}>Cancel</Button>
                    <Button size="lg" className="flex-1" onClick={handleOffer}>Send Offer</Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CryptoPaymentModal
        isOpen={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        price={product.price}
        productTitle={product.title}
      />
      <FiatPaymentModal
        isOpen={showFiatModal}
        onClose={() => setShowFiatModal(false)}
        price={product.price}
        productTitle={product.title}
      />
    </div>
  );
}
