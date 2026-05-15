import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChatDrawer({ open, onClose }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your AgroAI assistant. I can help you with:\n\n- Crop recommendations\n- Pest identification\n- Weather insights\n- Visit planning\n- Product information\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on the current weather data and crop stage, I recommend applying Amistar within the next 48 hours. The humidity levels are optimal for pest development.',
        'I have analyzed the NDVI data for your territory. 3 villages show signs of crop stress. I recommend prioritizing visits to Village Rampur and Dharnai.',
        'According to my analysis, the best time to visit Rajesh Kumar is tomorrow morning between 9-11 AM. Weather will be clear and he is most likely to be available.',
        'The stem borer risk in your territory has increased to 78%. This is due to the high humidity (>70%) for the past 3 days. Immediate preventive action is recommended.',
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickPrompts = [
    'Recommend for rice pest',
    'Plan today\'s visits',
    'Check weather',
    'Stock alert',
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-6 lg:bottom-6 lg:w-[420px] lg:h-[600px] h-[85vh] bg-white dark:bg-[#0D1F0F] rounded-t-2xl lg:rounded-2xl shadow-dropdown z-50 flex flex-col overflow-hidden border border-light-gray dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-light-gray dark:border-white/10 bg-gradient-to-r from-deep-green to-lime-green">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AgroAI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse" />
                    <span className="text-[11px] text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-2',
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                      msg.role === 'assistant'
                        ? 'gradient-primary'
                        : 'bg-light-gray dark:bg-white/10'
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-text-primary dark:text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'bg-off-white dark:bg-white/5 text-text-primary dark:text-white rounded-tl-sm'
                        : 'bg-deep-green text-white rounded-tr-sm'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-off-white dark:bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt);
                    }}
                    className="px-3 py-1.5 text-xs bg-light-gray dark:bg-white/5 text-text-secondary dark:text-white/70 rounded-full hover:bg-deep-green/10 dark:hover:bg-white/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-light-gray dark:border-white/10">
              <div className="flex items-center gap-2 bg-light-gray dark:bg-white/5 rounded-full px-3 py-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0">
                  <Mic className="w-4 h-4 text-text-muted" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask AgroAI anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary dark:text-white placeholder:text-text-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-full transition-colors flex-shrink-0',
                    input.trim()
                      ? 'gradient-primary text-white'
                      : 'bg-transparent text-text-muted'
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
