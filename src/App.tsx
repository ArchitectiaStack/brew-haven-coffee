import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import InfoBanner from './components/InfoBanner';
import MobileShowcase from './components/MobileShowcase';
import ReservationModal from './components/ReservationModal';
import MenuModal from './components/MenuModal';
import { MenuItem, CartItem, RewardItem, Reservation } from './types';
import { Sparkles, ShoppingBag, CheckCircle, Gift, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems: MenuItem[] = [
  { id: '1', name: 'ESPRESSO', description: 'Bold and rich single shot of espresso', price: 2.50, category: 'coffee' },
  { id: '2', name: 'CAPPUCCINO', description: 'Espresso with silky steamed milk and fine microfoam', price: 4.25, category: 'coffee' },
  { id: '3', name: 'VANILLA LATTE', description: 'Smooth espresso with sweet vanilla syrup & creamy milk', price: 4.75, category: 'coffee' },
  { id: '4', name: 'COLD BREW', description: 'Smooth, chilled, and slow-steeped 16 hours refreshing coffee', price: 4.50, category: 'coffee' },
  { id: '5', name: 'CARAMEL LATTE', description: 'Rich espresso with buttery caramel drizzle & velvet foam', price: 4.75, category: 'coffee' },
  { id: '6', name: 'MOCHA MAGIC', description: 'Chocolatey espresso luxury with fresh whipped cream top', price: 5.25, category: 'coffee' },
  { id: '7', name: 'AVOCADO TOAST', description: 'Fresh crushed avocado with red chili flakes on hand-sliced sourdough', price: 7.25, category: 'food' },
  { id: '8', name: 'BLUEBERRY MUFFIN', description: 'Plump morning muffin freshly baked with juicy wild blueberries', price: 3.75, category: 'pastries' },
  { id: '9', name: 'CHAI TEA LATTE', description: 'Organic spiced black tea blend steeped with sweet steamed milk', price: 4.50, category: 'tea' },
  { id: '10', name: 'ORGANIC GREEN TEA', description: 'Delicate, earthy steamed Japanese green tea leaves', price: 3.50, category: 'tea' },
  { id: '11', name: 'BUTTER CROISSANT', description: 'Crispy, multi-layered golden French pastry crafted with churned butter', price: 3.25, category: 'pastries' },
  { id: '12', name: 'SMOKED SALMON BAGEL', description: 'Toasted local bagel with cream cheese, capers, onions, and cured salmon', price: 8.50, category: 'food' },
];

export default function App() {
  // Modal toggle states
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Core application reactive states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [points, setPoints] = useState(850); // Starting points from user mockup
  const [discountApplied, setDiscountApplied] = useState(0); // active discount percentage
  const [hasFreePastry, setHasFreePastry] = useState(false); // reward status
  const [hasJoinedClub, setHasJoinedClub] = useState(false);

  // Active reservation receipt reference state
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'info' | 'reward' }>({
    message: '',
    visible: false,
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'info' | 'reward' = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // State modifier handlers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to mobile order bag!`, 'success');
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((ci) =>
          ci.menuItem.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prev.filter((ci) => ci.menuItem.id !== itemId);
    });
    showToast('Removed item from mobile order bag.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscountApplied(0);
    setHasFreePastry(false);
  };

  // Quick-add from the popular picks menu card in the Hero section
  const handleAddPopularItem = (itemName: string) => {
    const item = menuItems.find((mi) => mi.name === itemName.toUpperCase());
    if (item) {
      handleAddToCart(item);
    } else {
      showToast(`Adding ${itemName} to cart...`, 'success');
    }
  };

  // Join club adds points
  const handleJoinClub = () => {
    if (hasJoinedClub) return;
    setHasJoinedClub(true);
    setPoints((prev) => prev + 150); // E.g., adds 150 points to unlock first major reward tier!
    showToast('Welcome to the Coffee Club! +150 Points Credited.', 'reward');
  };

  // Reward redemption handles deduction
  const handleRedeemReward = (reward: RewardItem) => {
    if (points < reward.pointsCost) {
      showToast('Insufficient points to claim this reward.', 'info');
      return;
    }

    setPoints((prev) => prev - reward.pointsCost);

    if (reward.id === 'r2') {
      setDiscountApplied(10); // 10% Off
      showToast('10% Off Mobile Order Coupon claimed successfully!', 'reward');
    } else if (reward.id === 'r3') {
      setHasFreePastry(true); // Free Pastry Credit
      // Automatically add a Butter Croissant to the bag for them!
      const croissant = menuItems.find((mi) => mi.id === '11');
      if (croissant) {
        setCartItems((prev) => {
          const hasPastry = prev.find((ci) => ci.menuItem.category === 'pastries');
          if (hasPastry) return prev; // already has pastry to discount
          return [...prev, { menuItem: croissant, quantity: 1 }];
        });
      }
      showToast('Free Pastry Reward redeemed! Croissant added to order.', 'reward');
    } else {
      showToast(`Successfully redeemed: ${reward.name}!`, 'reward');
    }
  };

  const handleSuccessReservation = (reservation: Reservation) => {
    setActiveReservation(reservation);
    showToast(`Table reserved successfully for ${reservation.name}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-terracotta/20 selection:text-espresso flex flex-col justify-between" id="app-root">
      
      {/* Header element */}
      <Header 
        onOpenReservation={() => setIsReservationOpen(true)} 
        onOpenMenu={() => setIsMenuOpen(true)} 
      />

      <main className="flex-grow">
        
        {/* Active Reservation Ribbon if confirmed */}
        {activeReservation && (
          <div className="bg-terracotta text-white text-xs text-center py-2 px-4 font-bold flex items-center justify-center gap-2">
            <span>🎉 Your table for {activeReservation.guests} is saved on {activeReservation.date} at {activeReservation.time}!</span>
            <button 
              onClick={() => setActiveReservation(null)}
              className="underline text-[10px] uppercase font-bold hover:text-mocha transition-colors cursor-pointer ml-3"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Section */}
        <Hero 
          onOpenReservation={() => setIsReservationOpen(true)} 
          onOpenMenu={() => setIsMenuOpen(true)} 
          onAddPopularItem={handleAddPopularItem}
        />

        {/* Brand Features Section */}
        <Features />

        {/* App Interactive Showcase */}
        <MobileShowcase 
          menuItems={menuItems}
          cartItems={cartItems}
          points={points}
          discountApplied={discountApplied}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onRedeemReward={handleRedeemReward}
          hasFreePastry={hasFreePastry}
          onJoinClub={handleJoinClub}
          hasJoinedClub={hasJoinedClub}
        />

        {/* Operational Hours & Club Sign up Banner */}
        <InfoBanner 
          onJoinClub={handleJoinClub}
          hasJoinedClub={hasJoinedClub}
        />

      </main>

      {/* Modern Artisanal Footer */}
      <footer className="bg-[#2C1E18] text-[#D7CCC8] py-12 px-4 sm:px-8 border-t border-mocha/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="space-y-2">
            <span className="font-display font-black text-white text-sm tracking-widest block uppercase">
              BREW HAVEN COFFEE CO.
            </span>
            <p className="text-xs text-mocha/70 max-w-sm leading-relaxed">
              Serving organic micro-roasted blends, hand-baked pastries, and memorable cozy moments since 2026. Crafted for comfort.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs">
            <span className="text-white/45">© 2026 Brew Haven Coffee Co. All rights reserved.</span>
            <div className="flex gap-4 text-white/60">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
        onSuccess={handleSuccessReservation}
      />

      {/* Full Digital Menu Modal */}
      <MenuModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        menuItems={menuItems}
        onAddToCart={handleAddToCart}
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* Toast Notification HUD */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 transform -translate-x-1/2 w-[90%] max-w-sm bg-espresso/95 text-white p-4 rounded-xl shadow-2xl border border-mocha/20 flex justify-between items-center gap-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0">
                {toast.type === 'success' && <ShoppingBag className="w-5 h-5 text-terracotta" />}
                {toast.type === 'reward' && <Sparkles className="w-5 h-5 text-amber-400" />}
                {toast.type === 'info' && <CheckCircle className="w-5 h-5 text-mocha" />}
              </div>
              <p className="text-xs font-semibold leading-snug truncate">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
              className="text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
