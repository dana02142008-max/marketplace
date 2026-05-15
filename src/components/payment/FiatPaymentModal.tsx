'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';

interface FiatPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  productTitle: string;
}

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
  { id: 'apple', label: 'Apple Pay', icon: '🍎', desc: 'Pay with Face ID or Touch ID' },
  { id: 'google', label: 'Google Pay', icon: '🔵', desc: 'Fast & secure checkout' },
];

export function FiatPaymentModal({ isOpen, onClose, price, productTitle }: FiatPaymentModalProps) {
  const [method, setMethod] = useState('card');
  const [step, setStep] = useState<'method' | 'card' | 'processing' | 'success'>('method');
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fee = Math.round(price * 0.015 * 1000) / 1000;
  const total = price + fee;

  const formatCardNumber = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

  const validate = () => {
    const e: Record<string, string> = {};
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Invalid card number';
    if (card.expiry.length < 5) e.expiry = 'Invalid expiry';
    if (card.cvc.length < 3) e.cvc = 'Invalid CVC';
    if (!card.name.trim()) e.name = 'Name required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (method === 'card' && !validate()) return;
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('method'); setCard({ number: '', expiry: '', cvc: '', name: '' }); setErrors({}); }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
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
              <Lock className="w-4 h-4 text-green-500" />
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-sm">Secure Checkout</h2>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">{productTitle}</p>
              </div>
            </div>
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            {/* Order summary */}
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 mb-5 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Item</span><span className="font-medium text-gray-900 dark:text-white">{formatPrice(price)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Processing fee (1.5%)</span><span className="text-gray-600 dark:text-gray-400">{formatPrice(fee)}</span></div>
              <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-primary-600">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Method selection */}
            {step === 'method' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Payment method</p>
                <div className="space-y-2 mb-4">
                  {paymentMethods.map(m => (
                    <button key={m.id} onClick={() => setMethod(m.id)}
                      className={cn('w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left', method === m.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300')}
                    >
                      <span className="text-xl">{m.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{m.label}</div>
                        <div className="text-xs text-gray-500">{m.desc}</div>
                      </div>
                      <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center', method === m.id ? 'border-primary-500' : 'border-gray-300')}>
                        {method === m.id && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
                <Button size="lg" className="w-full" onClick={() => method === 'card' ? setStep('card') : handlePay()}>
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Card form */}
            {step === 'card' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Card Number</label>
                  <div className="relative">
                    <input
                      type="text" inputMode="numeric" placeholder="1234 5678 9012 3456"
                      value={card.number} onChange={e => setCard(c => ({ ...c, number: formatCardNumber(e.target.value) }))}
                      className={cn('input-field pr-10', errors.number && 'border-red-400 focus:border-red-500')}
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Expiry</label>
                    <input type="text" placeholder="MM/YY"
                      value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                      className={cn('input-field', errors.expiry && 'border-red-400')}
                    />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">CVC</label>
                    <input type="text" inputMode="numeric" placeholder="123" maxLength={4}
                      value={card.cvc} onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      className={cn('input-field', errors.cvc && 'border-red-400')}
                    />
                    {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Cardholder Name</label>
                  <input type="text" placeholder="As on card"
                    value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                    className={cn('input-field', errors.name && 'border-red-400')}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-xl">
                  <Lock className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <p className="text-xs text-green-700 dark:text-green-400">256-bit SSL encryption. Powered by Stripe.</p>
                </div>
                <Button size="lg" className="w-full" onClick={handlePay}>
                  Pay {formatPrice(total)}
                </Button>
              </motion.div>
            )}

            {/* Processing */}
            {step === 'processing' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white">Processing payment...</p>
                <p className="text-sm text-gray-500 mt-1">Please wait, do not close this window</p>
              </motion.div>
            )}

            {/* Success */}
            {step === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Payment Complete!</h3>
                <p className="text-sm text-gray-500 mb-4">{formatPrice(total)} charged successfully</p>
                <Badge variant="success">Order Confirmed</Badge>
                <p className="text-xs text-gray-500 mt-3">Receipt sent to your email. Seller will be notified.</p>
                <Button variant="secondary" size="lg" className="w-full mt-4" onClick={handleClose}>Done</Button>
              </motion.div>
            )}
          </div>

          {/* Footer trust badges */}
          {step !== 'success' && step !== 'processing' && (
            <div className="px-5 pb-5 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secured</span>
              <span>•</span>
              <span>🔒 Escrow Protected</span>
              <span>•</span>
              <span>Powered by Stripe</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
