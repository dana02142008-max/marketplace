import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export const metadata: Metadata = {
  title: 'TradeWave — The Future of Marketplaces',
  description: 'Buy and sell anything with trust, speed, and style. AI-powered listings, verified sellers, and same-day delivery.',
  keywords: 'marketplace, buy, sell, secondhand, Sweden, electronics, fashion, cars',
  openGraph: {
    title: 'TradeWave — The Future of Marketplaces',
    description: 'Buy and sell anything with trust, speed, and style.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
