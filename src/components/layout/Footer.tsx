import Link from 'next/link';
import { Shield, Zap, Heart } from 'lucide-react';

export function Footer() {
  const links = {
    Company: ['About Us', 'Blog', 'Careers', 'Press'],
    Support: ['Help Centre', 'Safety Tips', 'Contact Us', 'Report a Problem'],
    Features: ['Delivery', 'Payments', 'Seller Tools', 'AI Pricing'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 mt-20">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
                Trade<span className="text-gradient">Wave</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              The future of marketplaces. Buy and sell anything, with trust, speed, and style.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-success-500" />
                <span>Buyer & Seller Protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Zap className="w-4 h-4 text-accent-500" />
                <span>Same-day delivery available</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 TradeWave. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for better commerce
          </p>
        </div>
      </div>
    </footer>
  );
}
