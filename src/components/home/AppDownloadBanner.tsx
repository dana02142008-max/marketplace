'use client';
import { motion } from 'framer-motion';
import { Smartphone, Star, Download } from 'lucide-react';

export function AppDownloadBanner() {
  return (
    <section className="py-12">
      <div className="container-app">
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-violet-700 rounded-4xl p-8 md:p-12 relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-black/10 rounded-full translate-y-1/2" />
          <div className="absolute top-1/2 right-8 hidden md:block">
            <div className="w-48 h-48 bg-white/10 rounded-3xl -rotate-12 flex items-center justify-center">
              <Smartphone className="w-20 h-20 text-white/50" />
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
                <Smartphone className="w-4 h-4" />
                Available on iOS & Android
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                Buy & sell on the go
              </h2>
              <p className="text-white/80 mb-6 text-base">
                Instant notifications, swipe to browse, one-tap checkout. The full TradeWave experience in your pocket.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />)}
                </div>
                <span className="text-white/80 text-sm">4.9 · 180K+ reviews</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center gap-3 px-5 py-3 bg-white text-gray-900 rounded-2xl font-semibold text-sm hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg">
                  <span className="text-xl">🍎</span>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Download on the</div>
                    <div className="font-bold -mt-0.5">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98]">
                  <span className="text-xl">▶</span>
                  <div className="text-left">
                    <div className="text-[10px] text-white/70">Get it on</div>
                    <div className="font-bold -mt-0.5">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
