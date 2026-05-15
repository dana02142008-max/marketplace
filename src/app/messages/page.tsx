'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Paperclip, Smile, Phone, Video, MoreVertical, Search,
  Check, CheckCheck, Image as ImageIcon, Mic, Tag, Shield,
  ArrowLeft, Star, Package, Clock, AlertTriangle, Zap
} from 'lucide-react';
import { mockUsers, mockProducts, formatPrice } from '@/lib/data';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'offer' | 'image' | 'system';
  offerAmount?: number;
  imageUrl?: string;
}

const mockConversations = [
  { id: 'c1', user: mockUsers[1], product: mockProducts[0], lastMessage: 'Is this still available?', time: '2m', unread: 2, online: true },
  { id: 'c2', user: mockUsers[2], product: mockProducts[4], lastMessage: 'Offer accepted! 🎉', time: '15m', unread: 0, online: true },
  { id: 'c3', user: mockUsers[3], product: mockProducts[3], lastMessage: 'Can you do 6800?', time: '1h', unread: 1, online: false },
  { id: 'c4', user: mockUsers[4], product: mockProducts[2], lastMessage: 'Thanks, will pick up tomorrow', time: '3h', unread: 0, online: false },
];

const initialMessages: Message[] = [
  { id: 'm1', senderId: 'u2', text: 'Hi! Is the MacBook still available?', timestamp: '14:30', read: true, type: 'text' },
  { id: 'm2', senderId: 'u1', text: 'Yes, it\'s still available! Just listed it today.', timestamp: '14:32', read: true, type: 'text' },
  { id: 'm3', senderId: 'u2', text: 'Great! Could I come see it this weekend?', timestamp: '14:33', read: true, type: 'text' },
  { id: 'm4', senderId: 'u1', text: 'Of course! Saturday works well. I\'m in Gothenburg near Nordstan.', timestamp: '14:35', read: true, type: 'text' },
  { id: 'm5', senderId: 'u2', text: '', timestamp: '14:36', read: true, type: 'offer', offerAmount: 17000 },
  { id: 'm6', senderId: 'u1', text: 'Hmm, that\'s a bit low. Could you do 17,800?', timestamp: '14:40', read: true, type: 'text' },
  { id: 'm7', senderId: 'u2', text: '17,500 is my final offer 🤝', timestamp: '14:41', read: false, type: 'text' },
];

const suggestedReplies = ['Yes, still available!', 'I can meet this weekend', 'Can we negotiate?', 'Offer accepted! 🎉'];

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState('c1');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUser = mockUsers[0];
  const activeConvData = mockConversations.find(c => c.id === activeConv);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || newMessage.trim();
    if (!msg) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text: msg,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'text',
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = ['Sounds good!', 'Let me check and get back to you', 'Perfect, see you then! 👍', 'Great, deal! 🤝'];
      setMessages(prev => [...prev, {
        id: `m${Date.now() + 1}`,
        senderId: 'u2',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type: 'text',
      }]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const ConversationList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">Messages</h2>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input type="text" placeholder="Search conversations..." className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {mockConversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => { setActiveConv(conv.id); setShowMobileList(false); }}
            className={cn('w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left border-b border-gray-50 dark:border-gray-800/50', activeConv === conv.id && 'bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-900/30')}
          >
            <div className="relative flex-shrink-0">
              <Avatar src={conv.user.avatar} name={conv.user.name} size="md" />
              {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className={cn('font-semibold text-sm truncate', activeConv === conv.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white')}>{conv.user.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">{conv.lastMessage}</span>
                {conv.unread > 0 && (
                  <span className="ml-2 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{conv.unread}</span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="relative w-4 h-4 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={conv.product.images[0]} alt="" fill className="object-cover" sizes="16px" />
                </div>
                <span className="text-[10px] text-gray-400 truncate">{conv.product.title}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-white dark:bg-gray-950 flex">
      {/* Conversation list — sidebar */}
      <div className={cn('w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-gray-800 flex-shrink-0 flex flex-col', !showMobileList && 'hidden md:flex')}>
        <ConversationList />
      </div>

      {/* Chat area */}
      <div className={cn('flex-1 flex flex-col min-w-0', showMobileList && 'hidden md:flex')}>
        {activeConvData ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <button onClick={() => setShowMobileList(true)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="relative">
                <Avatar src={activeConvData.user.avatar} name={activeConvData.user.name} size="md" verified={activeConvData.user.verified} />
                {activeConvData.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{activeConvData.user.name}</h3>
                  {activeConvData.user.verified && <Shield className="w-4 h-4 text-primary-500" />}
                </div>
                <div className="flex items-center gap-2">
                  {activeConvData.online ? (
                    <span className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Online now
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {activeConvData.user.responseTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Product context */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl max-w-48">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image src={activeConvData.product.images[0]} alt="" fill className="object-cover" sizes="32px" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-900 dark:text-white truncate">{formatPrice(activeConvData.product.price)}</div>
                  <div className="text-[10px] text-gray-500 truncate">{activeConvData.product.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <Phone className="w-4.5 h-4.5 w-5 h-5" />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scam warning */}
            <div className="mx-4 mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30 flex items-center gap-2">
              <Shield className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                <strong>Stay safe:</strong> Never share personal info or pay outside TradeWave. Payments are protected by our escrow system.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => {
                const isMe = msg.senderId === currentUser.id;
                const showAvatar = !isMe && (i === 0 || messages[i - 1].senderId !== msg.senderId);

                if (msg.type === 'offer') {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl p-4 border border-primary-100 dark:border-primary-800/30 max-w-xs w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-4 h-4 text-primary-500" />
                          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Offer Made</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{formatPrice(msg.offerAmount!)}</div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 rounded-xl bg-success-500 hover:bg-success-600 text-white text-sm font-semibold transition-all">Accept</button>
                          <button className="flex-1 py-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold border border-gray-200 dark:border-gray-700 transition-all">Counter</button>
                          <button className="flex-1 py-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 text-danger-500 text-sm font-semibold transition-all">Decline</button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}
                  >
                    {!isMe && showAvatar && (
                      <Avatar src={activeConvData.user.avatar} name={activeConvData.user.name} size="xs" className="mb-0.5 flex-shrink-0" />
                    )}
                    {!isMe && !showAvatar && <div className="w-6 flex-shrink-0" />}

                    <div className={cn('max-w-[70%] space-y-1')}>
                      <div className={cn('px-4 py-2.5 rounded-3xl text-sm leading-relaxed', isMe ? 'bg-primary-600 text-white rounded-br-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-lg')}>
                        {msg.text}
                      </div>
                      <div className={cn('flex items-center gap-1', isMe ? 'justify-end' : 'justify-start')}>
                        <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                        {isMe && (msg.read ? <CheckCheck className="w-3 h-3 text-primary-400" /> : <Check className="w-3 h-3 text-gray-400" />)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-end gap-2"
                  >
                    <Avatar src={activeConvData.user.avatar} name={activeConvData.user.name} size="xs" className="flex-shrink-0" />
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-3xl rounded-bl-lg flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested replies */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {suggestedReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all border border-gray-200 dark:border-gray-700"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary-400 focus-within:border-transparent transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={() => sendMessage()}
                  disabled={!newMessage.trim()}
                  className={cn('w-10 h-10 flex items-center justify-center rounded-xl transition-all flex-shrink-0', newMessage.trim() ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-glow' : 'bg-gray-100 dark:bg-gray-800 text-gray-400')}
                >
                  <Send className="w-4.5 h-4.5 w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a conversation</h3>
              <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
