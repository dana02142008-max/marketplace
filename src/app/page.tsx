import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductSection } from '@/components/home/ProductSection';
import { FeaturedSellers } from '@/components/home/FeaturedSellers';
import { TrustBanner } from '@/components/home/TrustBanner';
import { AppDownloadBanner } from '@/components/home/AppDownloadBanner';
import { Flame, Sparkles, Clock, Tag, Star } from 'lucide-react';
import {
  featuredProducts, recentProducts, trendingProducts, flashDeals, mockProducts
} from '@/lib/data';

export default function HomePage() {
  const staffPicks = mockProducts.filter(p => p.isVerified).slice(0, 5);
  const rareFInds = mockProducts.filter(p => p.category === 'luxury' || p.category === 'vintage' || p.category === 'art').slice(0, 5);

  return (
    <>
      <HeroSection />

      <ProductSection
        title="Flash Deals"
        subtitle="Limited time — prices drop every hour"
        products={flashDeals}
        viewAllHref="/browse?sort=deals"
        variant="flash"
      />

      <CategoryGrid />

      <ProductSection
        title="Trending Near You"
        subtitle="Most saved items in Stockholm right now"
        products={trendingProducts}
        viewAllHref="/browse?sort=trending"
        icon={<Flame className="w-5 h-5 text-orange-500" />}
      />

      <ProductSection
        title="New Arrivals"
        subtitle="Just listed in the last 24 hours"
        products={recentProducts}
        viewAllHref="/browse?sort=newest"
        icon={<Clock className="w-5 h-5 text-primary-500" />}
      />

      <FeaturedSellers />

      <ProductSection
        title="Staff Picks"
        subtitle="Hand-selected by our curation team"
        products={staffPicks}
        viewAllHref="/browse?filter=staff-picks"
        icon={<Star className="w-5 h-5 text-yellow-500" />}
        variant="featured"
      />

      <ProductSection
        title="Rare Finds"
        subtitle="Unique items you won't find anywhere else"
        products={rareFInds.length > 0 ? rareFInds : mockProducts.slice(0, 5)}
        viewAllHref="/browse?filter=rare"
        icon={<Sparkles className="w-5 h-5 text-violet-500" />}
      />

      <TrustBanner />

      <ProductSection
        title="Best Deals"
        subtitle="Biggest discounts right now"
        products={flashDeals}
        viewAllHref="/browse?sort=discount"
        icon={<Tag className="w-5 h-5 text-success-500" />}
      />

      <AppDownloadBanner />
    </>
  );
}
