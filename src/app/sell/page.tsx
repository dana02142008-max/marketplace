'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Sparkles, Check, ChevronRight, Upload, X, Tag,
  MapPin, Package, CreditCard, Zap, Info, ArrowLeft, ArrowRight,
  DollarSign, Image as ImageIcon, FileText, Truck, CheckCircle2
} from 'lucide-react';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Photos', icon: Camera },
  { id: 2, label: 'Details', icon: FileText },
  { id: 3, label: 'Price', icon: Tag },
  { id: 4, label: 'Delivery', icon: Truck },
  { id: 5, label: 'Publish', icon: CheckCircle2 },
];

const conditions = [
  { id: 'new', label: 'New', desc: 'Never used, original packaging', emoji: '✨' },
  { id: 'like_new', label: 'Like New', desc: 'Used once or twice, perfect condition', emoji: '🌟' },
  { id: 'good', label: 'Good', desc: 'Light signs of use, fully functional', emoji: '👍' },
  { id: 'fair', label: 'Fair', desc: 'Noticeable signs of use, works fine', emoji: '🔧' },
  { id: 'poor', label: 'Poor', desc: 'Heavy use, defects present', emoji: '🔨' },
];

const aiSuggestions = {
  title: 'MacBook Pro 14" M3 Pro — Excellent condition',
  description: 'Selling my MacBook Pro 14-inch with the latest M3 Pro chip. Only used for 6 months for light work. Screen is perfect, no scratches or dents. Battery health at 96%. Includes original box, charging cable, and power adapter. Perfect for developers, designers, and content creators.',
  price: 18500,
  category: 'electronics',
};

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [hasDelivery, setHasDelivery] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [pickupOnly, setPickupOnly] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePhotoUpload = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    ];
    setPhotos(mockImages);
  };

  const triggerAI = () => {
    setIsAiProcessing(true);
    setTimeout(() => {
      setTitle(aiSuggestions.title);
      setDescription(aiSuggestions.description);
      setPrice(String(aiSuggestions.price));
      setCategory(aiSuggestions.category);
      setCondition('like_new');
      setIsAiProcessing(false);
      setAiDone(true);
    }, 2500);
  };

  const handlePublish = () => {
    setPublished(true);
  };

  if (published) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-success-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Your item is live! 🎉
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            <strong>{title || 'Your listing'}</strong> is now visible to thousands of buyers near you. We'll notify you as soon as someone is interested.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { emoji: '👁️', label: 'Expected views', value: '200-500' },
              { emoji: '💬', label: 'First message', value: '< 2 hours' },
              { emoji: '🚀', label: 'Avg. sale time', value: '3 days' },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</div>
                <div className="text-[10px] text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
            <Button variant="secondary" size="lg" className="w-full" onClick={() => { setPublished(false); setStep(1); setPhotos([]); setTitle(''); setDescription(''); setPrice(''); setCategory(''); setCondition(''); setAiDone(false); }}>
              List another item
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-app py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Sell an item</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">List in under 30 seconds with AI assistance</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-1 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all w-full',
                  step === s.id ? 'bg-primary-600 text-white shadow-glow' : step > s.id ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 cursor-pointer' : 'text-gray-400 dark:text-gray-600 cursor-default'
                )}
              >
                {step > s.id ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <s.icon className="w-3.5 h-3.5 flex-shrink-0" />}
                <span className="hidden sm:block">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className={cn('h-0.5 flex-1 mx-1', step > s.id ? 'bg-primary-400' : 'bg-gray-200 dark:bg-gray-700')} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 1: Photos */}
            {step === 1 && (
              <div className="card p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add photos</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Great photos help your item sell faster. Our AI can auto-generate the listing details from your photos.</p>

                {photos.length === 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handlePhotoUpload}
                      className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-primary-400 hover:bg-primary-50 dark:hover:border-primary-600 dark:hover:bg-primary-900/20 transition-all group"
                    >
                      <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 rounded-2xl flex items-center justify-center transition-all">
                        <Camera className="w-7 h-7 text-gray-400 group-hover:text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">Take a photo</div>
                        <div className="text-xs text-gray-400 text-center">Use your camera</div>
                      </div>
                    </button>
                    <button
                      onClick={handlePhotoUpload}
                      className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-primary-400 hover:bg-primary-50 dark:hover:border-primary-600 dark:hover:bg-primary-900/20 transition-all group"
                    >
                      <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 rounded-2xl flex items-center justify-center transition-all">
                        <Upload className="w-7 h-7 text-gray-400 group-hover:text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">Upload photos</div>
                        <div className="text-xs text-gray-400 text-center">From your device</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {photos.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                          <img src={img} alt="" className="object-cover w-full h-full" />
                          <button
                            onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                            className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          {i === 0 && <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full">Cover</span>}
                        </div>
                      ))}
                      <button
                        onClick={handlePhotoUpload}
                        className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center hover:border-primary-400 transition-all"
                      >
                        <Upload className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>

                    {/* AI suggestion */}
                    <div className="p-4 bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">AI Assistant</span>
                      </div>
                      <p className="text-sm text-primary-600 dark:text-primary-300 mb-3">Let me analyze your photos and fill in the listing details for you instantly!</p>
                      <Button onClick={triggerAI} loading={isAiProcessing} size="sm" className="bg-gradient-to-r from-primary-600 to-violet-600">
                        {isAiProcessing ? 'Analyzing photos...' : '✨ Generate with AI'}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={photos.length === 0} size="lg">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="card p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Item details</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {aiDone ? (
                      <span className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                        <Sparkles className="w-4 h-4" />
                        AI has pre-filled the details — review and edit as needed
                      </span>
                    ) : 'Tell buyers about your item'}
                  </p>
                </div>

                {aiDone && (
                  <div className="flex items-center gap-2 p-3 bg-success-50 dark:bg-green-950/20 rounded-xl border border-success-100 dark:border-green-900/30">
                    <Check className="w-4 h-4 text-success-500" />
                    <span className="text-sm text-success-700 dark:text-success-400 font-medium">AI filled title, description, category and suggested price</span>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max 256GB — Excellent condition"
                    className="input-field"
                    maxLength={80}
                  />
                  <div className="text-xs text-gray-400 mt-1 text-right">{title.length}/80</div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Description *</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe your item in detail — condition, age, any defects, what's included..."
                    className="input-field min-h-32 resize-none"
                    maxLength={1000}
                  />
                  <div className="text-xs text-gray-400 mt-1 text-right">{description.length}/1000</div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Category *</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-hide">
                    {categories.slice(0, 12).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={cn('flex items-center gap-2 p-3 rounded-xl text-sm border transition-all text-left', category === cat.id ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600')}
                      >
                        <span>{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                        {category === cat.id && <Check className="w-4 h-4 ml-auto flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Condition *</label>
                  <div className="space-y-2">
                    {conditions.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setCondition(c.id)}
                        className={cn('flex items-center gap-3 p-3.5 rounded-2xl border w-full text-left transition-all', condition === c.id ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}
                      >
                        <span className="text-xl">{c.emoji}</span>
                        <div className="flex-1">
                          <div className={cn('text-sm font-semibold', condition === c.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white')}>{c.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</div>
                        </div>
                        {condition === c.id && <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)} size="lg"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button onClick={() => setStep(3)} disabled={!title || !description || !category || !condition} size="lg">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="card p-6 space-y-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Set your price</h2>

                {aiDone && (
                  <div className="p-4 bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">AI Price Suggestion</span>
                    </div>
                    <p className="text-sm text-primary-600 dark:text-primary-300">Based on similar listings, we suggest pricing around <strong>18,000–19,500 SEK</strong> for a quick sale.</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Price (SEK) *</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus-within:ring-2 focus-within:ring-primary-400 focus-within:border-transparent transition-all">
                    <span className="text-gray-500 font-semibold text-lg">SEK</span>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="0"
                      className="flex-1 bg-transparent text-2xl font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Quick price suggestions */}
                  {aiDone && (
                    <div className="flex gap-2 mt-2">
                      {[17500, 18500, 19500].map(p => (
                        <button key={p} onClick={() => setPrice(String(p))} className={cn('flex-1 py-2 rounded-xl text-sm font-semibold transition-all', price === String(p) ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400')}>
                          {p.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">Options</label>
                  <div className="space-y-3">
                    {[
                      { id: 'negotiable', label: 'Accept offers', desc: 'Allow buyers to negotiate the price', value: isNegotiable, toggle: () => setIsNegotiable(!isNegotiable) },
                    ].map(opt => (
                      <div key={opt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                        </div>
                        <button
                          onClick={opt.toggle}
                          className={cn('w-12 h-6 rounded-full transition-all relative', opt.value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600')}
                        >
                          <span className={cn('absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all', opt.value ? 'left-7' : 'left-1')} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)} size="lg"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button onClick={() => setStep(4)} disabled={!price || Number(price) <= 0} size="lg">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Delivery */}
            {step === 4 && (
              <div className="card p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Delivery & Pickup</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose how buyers can receive the item</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'delivery', icon: Truck, title: 'TradeWave Delivery', desc: 'We handle everything — courier, tracking, insurance', badge: 'Recommended', value: hasDelivery, toggle: () => setHasDelivery(!hasDelivery) },
                    { id: 'pickup', icon: MapPin, title: 'Local Pickup', desc: 'Buyer comes to you to collect', badge: null, value: pickupOnly, toggle: () => setPickupOnly(!pickupOnly) },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      className={cn('p-4 rounded-2xl border-2 cursor-pointer transition-all', opt.value ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}
                      onClick={opt.toggle}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', opt.value ? 'bg-primary-600' : 'bg-gray-100 dark:bg-gray-800')}>
                          <opt.icon className={cn('w-5 h-5', opt.value ? 'text-white' : 'text-gray-500')} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn('font-semibold text-sm', opt.value ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white')}>{opt.title}</span>
                            {opt.badge && <span className="text-[10px] font-bold bg-success-100 dark:bg-green-900/30 text-success-700 dark:text-success-400 px-2 py-0.5 rounded-full">{opt.badge}</span>}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</div>
                        </div>
                        <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', opt.value ? 'border-primary-600 bg-primary-600' : 'border-gray-300 dark:border-gray-600')}>
                          {opt.value && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasDelivery && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Delivery fee (SEK)</label>
                    <input
                      type="number"
                      value={deliveryPrice}
                      onChange={e => setDeliveryPrice(e.target.value)}
                      placeholder="e.g. 149"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Leave empty to offer free delivery (great for faster sales!)
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(3)} size="lg"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button onClick={() => setStep(5)} disabled={!hasDelivery && !pickupOnly} size="lg">
                    Preview <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Preview & Publish */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Review & Publish</h2>

                  {/* Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-5">
                    <div className="flex gap-4">
                      {photos[0] && (
                        <img src={photos[0]} alt="" className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">{title}</h3>
                        <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">{price ? `${Number(price).toLocaleString()} SEK` : '—'}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {category && <span className="badge-primary text-[10px]">{categories.find(c => c.id === category)?.name}</span>}
                          {condition && <span className="badge-success text-[10px]">{conditions.find(c => c.id === condition)?.label}</span>}
                          {hasDelivery && <span className="badge-accent text-[10px]">🚚 Delivery</span>}
                          {isNegotiable && <span className="badge-warning text-[10px]">Negotiable</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2 mb-6">
                    {[
                      { label: 'Photos added', done: photos.length > 0 },
                      { label: 'Title & description', done: !!title && !!description },
                      { label: 'Category & condition', done: !!category && !!condition },
                      { label: 'Price set', done: !!price && Number(price) > 0 },
                      { label: 'Delivery options', done: hasDelivery || pickupOnly },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <div className={cn('w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0', item.done ? 'bg-success-500' : 'bg-gray-200 dark:bg-gray-700')}>
                          {item.done && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn('text-sm', item.done ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400 dark:text-gray-500')}>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setStep(4)} size="lg"><ArrowLeft className="w-4 h-4" /> Back</Button>
                    <Button
                      size="xl"
                      onClick={handlePublish}
                      className="bg-gradient-to-r from-success-500 to-emerald-500 hover:from-success-600 hover:to-emerald-600 shadow-soft"
                    >
                      <Zap className="w-5 h-5" />
                      Publish Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
