'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  productTitle: string;
}

const ETH_PRICE_USD = 3400;
const SOL_PRICE_USD = 145;
const BHD_TO_USD = 2.65;

const WALLETS = {
  ethereum: [
    { id: 'metamask', name: 'MetaMask', icon: '🦊', desc: 'Browser extension & mobile' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', desc: 'Easy for beginners' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗', desc: 'Scan with any wallet' },
    { id: 'rainbow', name: 'Rainbow', icon: '🌈', desc: 'Beautiful ETH wallet' },
  ],
  solana: [
    { id: 'phantom', name: 'Phantom', icon: '👻', desc: 'Most popular Solana wallet' },
    { id: 'solflare', name: 'Solflare', icon: '🌟', desc: 'Feature-rich Solana wallet' },
    { id: 'backpack', name: 'Backpack', icon: '🎒', desc: 'xNFT wallet' },
  ],
};

const MOCK_ADDRESS = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
const MOCK_SOL_ADDRESS = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';

type Step = 'chain' | 'wallet' | 'connecting' | 'confirm' | 'success';
type Chain = 'ethereum' | 'solana';

export function CryptoPaymentModal({ isOpen, onClose, price, productTitle }: CryptoPaymentModalProps) {
  const [step, setStep] = useState<Step>('chain');
  const [chain, setChain] = useState<Chain>('ethereum');
  const [copied, setCopied] = useState(false);

  const priceUSD = price * BHD_TO_USD;
  const ethAmount = (priceUSD / ETH_PRICE_USD).toFixed(6);
  const solAmount = (priceUSD / SOL_PRICE_USD).toFixed(4);
  const cryptoAmount = chain === 'ethereum' ? `${ethAmount} ETH` : `${solAmount} SOL`;
  const address = chain === 'ethereum' ? MOCK_ADDRESS : MOCK_SOL_ADDRESS;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWalletSelect = () => {
    setStep('connecting');
    setTimeout(() => setStep('confirm'), 2000);
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('chain'), 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔐</span>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-sm">Pay with Crypto</h2>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">{productTitle}</p>
              </div>
            </div>
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            {/* Price display */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 rounded-2xl p-4 mb-5 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {chain === 'ethereum' ? `${ethAmount} ETH` : `${solAmount} SOL`}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">≈ ${priceUSD.toFixed(2)} USD</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={cn('w-2 h-2 rounded-full', chain === 'ethereum' ? 'bg-blue-500' : 'bg-purple-500')} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {chain === 'ethereum' ? 'Ethereum Mainnet' : 'Solana Mainnet'}
                </span>
              </div>
            </div>

            {/* Step: Chain selection */}
            {step === 'chain' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select blockchain</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { id: 'ethereum' as Chain, name: 'Ethereum', icon: '⟠', color: 'from-blue-500 to-indigo-600', tokens: 'ETH, USDC, USDT' },
                    { id: 'solana' as Chain, name: 'Solana', icon: '◎', color: 'from-purple-500 to-violet-600', tokens: 'SOL, USDC' },
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setChain(c.id)}
                      className={cn('p-4 rounded-2xl border-2 transition-all text-left', chain === c.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}
                    >
                      <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xl mb-2', c.color)}>
                        {c.icon}
                      </div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">{c.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{c.tokens}</div>
                    </button>
                  ))}
                </div>
                <Button size="lg" className="w-full" onClick={() => setStep('wallet')}>
                  Continue with {chain === 'ethereum' ? 'Ethereum' : 'Solana'}
                </Button>
              </motion.div>
            )}

            {/* Step: Wallet selection */}
            {step === 'wallet' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 mb-3">
                  <button onClick={() => setStep('chain')} className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Connect your wallet</p>
                </div>
                <div className="space-y-2">
                  {WALLETS[chain].map(wallet => (
                    <button
                      key={wallet.id}
                      onClick={handleWalletSelect}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all group"
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{wallet.name}</div>
                        <div className="text-xs text-gray-500">{wallet.desc}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step: Connecting */}
            {step === 'connecting' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white">Connecting wallet...</p>
                <p className="text-sm text-gray-500 mt-1">Approve the connection in your wallet</p>
              </motion.div>
            )}

            {/* Step: Confirm payment */}
            {step === 'confirm' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Wallet connected</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 mb-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{cryptoAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Network fee</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {chain === 'ethereum' ? '~0.002 ETH' : '~0.000005 SOL'}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-sm font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-primary-600">{cryptoAmount}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl mb-4">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-400">Payment is held in escrow until you confirm delivery. Funds release to seller after 48h.</p>
                </div>
                <Button size="lg" className="w-full" onClick={handleConfirm}>
                  Confirm Payment — {cryptoAmount}
                </Button>
              </motion.div>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Payment Sent!</h3>
                <p className="text-sm text-gray-500 mb-4">Transaction submitted to {chain === 'ethereum' ? 'Ethereum' : 'Solana'} network</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Tx Hash</span>
                    <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-primary-600">
                      {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mt-1 truncate">{address.slice(0, 20)}...{address.slice(-8)}</p>
                </div>
                <Badge variant="success">In Escrow — Awaiting Delivery</Badge>
                <Button variant="secondary" size="lg" className="w-full mt-4" onClick={handleClose}>
                  Done
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
