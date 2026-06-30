import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Plus, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  cartItemsCount: number;
}

export default function MenuModal({ isOpen, onClose, menuItems, onAddToCart, cartItemsCount }: MenuModalProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'tea' | 'food' | 'pastries'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const categories: { value: typeof activeCategory; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'coffee', label: 'Artisanal Coffee' },
    { value: 'tea', label: 'Premium Teas' },
    { value: 'food', label: 'Fresh Food' },
    { value: 'pastries', label: 'Baked Pastries' },
  ];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl h-[90vh] overflow-hidden rounded-2xl bg-cream border border-mocha/30 shadow-2xl z-10 flex flex-col"
          >
            {/* Top decorative bar */}
            <div className="h-2 bg-terracotta w-full shrink-0" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-mocha/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-espresso text-xl tracking-tight">
                    BREW HAVEN DIGITAL MENU
                  </h3>
                  <p className="text-xs text-espresso/60 uppercase tracking-widest mt-0.5">
                    Cozy space • Crafted with love
                  </p>
                </div>
              </div>

              {/* Search & Cart Quick Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search coffee, bagels, croissants..."
                    className="pl-9 pr-4 py-1.5 rounded-full border border-mocha/30 bg-white/60 focus:bg-white text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta text-sm w-full sm:w-60 transition-all"
                  />
                </div>
                {cartItemsCount > 0 && (
                  <div className="flex items-center gap-1.5 bg-terracotta/10 text-terracotta px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{cartItemsCount} in App</span>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-espresso/60 hover:text-espresso hover:bg-mocha/15 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-6 py-3 border-b border-mocha/10 bg-white/20 overflow-x-auto shrink-0 flex gap-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.value
                      ? 'bg-terracotta text-white shadow-md'
                      : 'bg-white/55 text-espresso/70 hover:text-espresso hover:bg-white border border-mocha/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto p-6 bg-white/40">
              {filteredItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-2">
                  <p className="text-espresso/45 font-medium">No results found for your search.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="text-xs text-terracotta underline font-semibold uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => {
                    const isAdded = addedItemIds.includes(item.id);
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        className="bg-white rounded-xl border border-mocha/20 p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start"
                      >
                        {/* Placeholder visual/image placeholder to make it look premium */}
                        <div className="w-20 h-20 rounded-lg bg-cream flex-shrink-0 flex items-center justify-center border border-mocha/10 text-xl font-bold text-terracotta relative overflow-hidden">
                          {item.category === 'coffee' && '☕'}
                          {item.category === 'tea' && '🍵'}
                          {item.category === 'food' && '🥪'}
                          {item.category === 'pastries' && '🥐'}
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-display font-semibold text-espresso truncate text-base leading-snug">
                              {item.name}
                            </h4>
                            <span className="font-mono font-bold text-terracotta shrink-0">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-espresso/60 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-[10px] bg-mocha/20 text-espresso/70 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <button
                              onClick={() => handleAdd(item)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                isAdded
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-terracotta text-white hover:bg-terracotta/90 active:scale-95'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  ADDED!
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  ADD TO APP ORDER
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer / Info */}
            <div className="p-4 bg-dark-roast text-white text-center shrink-0 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-mocha/10">
              <span className="text-mocha">
                Add items here to place them into the mobile simulator below!
              </span>
              <div className="flex gap-4">
                <span className="text-white/60">☕ Fresh organic milk & beans</span>
                <span className="text-white/60">🌱 Gluten-free options available</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
