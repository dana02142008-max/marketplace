import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-display font-bold text-gray-900 dark:text-white mb-3">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Page not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Looks like this item sold out before you got here. Let&apos;s find you something else.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg"><Home className="w-5 h-5" />Go Home</Button>
          </Link>
          <Link href="/browse">
            <Button variant="secondary" size="lg"><Search className="w-5 h-5" />Browse Items</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
