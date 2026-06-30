import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, Battery, Signal, Plus, Coffee, Gift, ShoppingBag, 
  CheckCircle2, ArrowRight, Sparkles, AlertCircle, Trash2, Tag, Home, User
} from 'lucide-react';
import { MenuItem, CartItem, RewardItem } from '../types';

interface MobileShowcaseProps {
  menuItems: MenuItem[];
  cartItems: CartItem[];
  points: number;
  discountApplied: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onRedeemReward: (reward: RewardItem) => void;
  hasFreePastry: boolean;
  onJoinClub: () => void;
  hasJoinedClub: boolean;
}

export default function MobileShowcase({
  menuItems,
  cartItems,
  points,
  discountApplied,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onRedeemReward,
  hasFreePastry,
  onJoinClub,
  hasJoinedClub
}: MobileShowcaseProps) {
  // Navigation states for each of the 3 independent simulators
  const [phone1Screen, setPhone1Screen] = useState<'menu' | 'rewards' | 'checkout'>('menu');
  const [phone2Screen, setPhone2Screen] = useState<'menu' | 'rewards' | 'checkout'>('rewards');
  const [phone3Screen, setPhone3Screen] = useState<'menu' | 'rewards' | 'checkout'>('checkout');

  // Checkout order states
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'tea' | 'food' | 'pastries'>('all');

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0);
  const discountAmount = subtotal * (discountApplied / 100);
  const pastryDiscount = hasFreePastry ? Math.min(3.75, subtotal) : 0; // free pastry up to $3.75
  const total = Math.max(0, subtotal - discountAmount - pastryDiscount);

  // Rewards list
  const rewards: RewardItem[] = [
    { id: 'r1', name: 'FREE COFFEE', pointsCost: 1000, description: 'Redeem for any medium beverage', category: 'coffee' },
    { id: 'r2', name: '10% OFF ORDER', pointsCost: 750, description: '10% off your entire mobile order', category: 'discount' },
    { id: 'r3', name: 'FREE PASTRY', pointsCost: 500, description: 'Claim any fresh baked morning item', category: 'pastry' },
  ];

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const randomId = 'BH' + Math.floor(10000 + Math.random() * 90000);
    setOrderId(randomId);

    // Calculate dynamic time (current + 15 minutes)
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrderTime(timeStr);
    setIsOrdered(true);
  };

  const handleResetOrder = () => {
    setIsOrdered(false);
    onClearCart();
  };

  // Render Status Bar for phones
  const renderStatusBar = () => (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-bold text-espresso select-none shrink-0">
      <span>9:41</span>
      {/* Speaker/Camera notch "Dynamic Island" */}
      <div className="w-20 h-4 rounded-full bg-black/95 absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 absolute right-4" />
      </div>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <Battery className="w-4 h-4 stroke-[2.5]" />
      </div>
    </div>
  );

  // Render unified bottom navigation bar for simulators
  const renderBottomNav = (activeScreen: 'menu' | 'rewards' | 'checkout', setScreen: (s: 'menu' | 'rewards' | 'checkout') => void) => (
    <div className="border-t border-mocha/10 bg-white/95 backdrop-blur px-3 py-2 flex justify-around items-center shrink-0">
      <button 
        onClick={() => setScreen('menu')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'menu' ? 'text-terracotta' : 'text-espresso/45'}`}
      >
        <Home className="w-4 h-4" />
        <span className="text-[8px] font-bold uppercase tracking-wider">Home</span>
      </button>
      <button 
        onClick={() => setScreen('menu')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'menu' ? 'text-terracotta' : 'text-espresso/45'}`}
      >
        <Coffee className="w-4 h-4" />
        <span className="text-[8px] font-bold uppercase tracking-wider">Menu</span>
      </button>
      <button 
        onClick={() => setScreen('rewards')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'rewards' ? 'text-terracotta' : 'text-espresso/45'}`}
      >
        <Gift className="w-4 h-4" />
        <span className="text-[8px] font-bold uppercase tracking-wider">Rewards</span>
      </button>
      <button 
        onClick={() => setScreen('checkout')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'checkout' ? 'text-terracotta' : 'text-espresso/45'} relative`}
      >
        <ShoppingBag className="w-4 h-4" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-terracotta text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
        <span className="text-[8px] font-bold uppercase tracking-wider">Pickup</span>
      </button>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-terracotta">
          THE VIRTUAL BREW HAVEN APP
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-espresso tracking-tight">
          ORDER, REWARD, REPEAT
        </h2>
        <p className="text-sm text-espresso/70 leading-relaxed">
          Interact directly with our fully operational mobile app simulators below. Add drinks, redeem points, and simulate a real contactless pickup order in real time!
        </p>
      </div>

      {/* 3 Mobile Mockups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start pt-6">
        
        {/* ================= PHONE 1: MENU SCREEN ================= */}
        <div className="w-full max-w-[310px] aspect-[9/18] bg-cream rounded-[42px] border-[10px] border-espresso shadow-2xl overflow-hidden relative flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
          {renderStatusBar()}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
            {phone1Screen === 'menu' ? (
              <>
                {/* Header title */}
                <div className="flex justify-between items-center mt-1">
                  <h3 className="font-display font-extrabold text-espresso text-lg">MENU</h3>
                  <div className="w-7 h-7 rounded-full bg-espresso/5 flex items-center justify-center">
                    <User className="w-4 h-4 text-espresso/60" />
                  </div>
                </div>

                {/* Search box placeholder */}
                <div className="bg-espresso/5 rounded-lg px-3 py-1.5 text-[10px] text-espresso/40">
                  Search drink, pastry...
                </div>

                {/* Horizontal scrollable categories */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
                  {['all', 'coffee', 'tea', 'food', 'pastries'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as any)}
                      className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                        activeCategory === cat 
                          ? 'bg-terracotta text-white shadow-sm' 
                          : 'bg-espresso/5 text-espresso/60 hover:bg-espresso/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Items list */}
                <div className="space-y-2.5">
                  {menuItems
                    .filter((item) => activeCategory === 'all' || item.category === activeCategory)
                    .slice(0, 5)
                    .map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-xl p-2.5 border border-mocha/10 flex gap-2.5 items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center text-base shrink-0 border border-mocha/5">
                            {item.category === 'coffee' && '☕'}
                            {item.category === 'tea' && '🍵'}
                            {item.category === 'food' && '🥪'}
                            {item.category === 'pastries' && '🥐'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-[11px] text-espresso truncate">{item.name}</h4>
                            <p className="text-[9px] text-espresso/50 truncate max-w-[130px]">{item.description}</p>
                            <span className="font-mono text-[10px] font-bold text-terracotta">${item.price.toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center hover:bg-terracotta/90 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              </>
            ) : phone1Screen === 'rewards' ? (
              /* If switched within Phone 1 */
              <div className="pt-2 text-center text-xs">Rewards view loaded! Tap below to return to Menu.</div>
            ) : (
              <div className="pt-2 text-center text-xs">Checkout view loaded!</div>
            )}
          </div>

          {renderBottomNav(phone1Screen, setPhone1Screen)}
        </div>


        {/* ================= PHONE 2: REWARDS SCREEN ================= */}
        <div className="w-full max-w-[310px] aspect-[9/18] bg-cream rounded-[42px] border-[10px] border-espresso shadow-2xl overflow-hidden relative flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
          {renderStatusBar()}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
            {phone2Screen === 'rewards' ? (
              <>
                {/* Header title */}
                <div className="flex justify-between items-center mt-1">
                  <h3 className="font-display font-extrabold text-espresso text-lg">REWARDS</h3>
                  <div className="w-7 h-7 rounded-full bg-espresso/5 flex items-center justify-center text-xs">
                    🎁
                  </div>
                </div>

                {/* Points Card */}
                <div className="bg-dark-roast rounded-2xl p-4 text-white text-center relative overflow-hidden shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-terracotta" />
                  <span className="text-[8px] uppercase tracking-widest text-mocha font-bold">BREW HAVEN REWARDS</span>
                  
                  {/* Big points display */}
                  <div className="my-2.5 flex items-center justify-center gap-1.5">
                    <span className="font-display font-black text-3xl tracking-tight text-white">{points}</span>
                    <span className="text-[10px] uppercase font-bold text-mocha">POINTS</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-terracotta transition-all duration-500" 
                        style={{ width: `${Math.min(100, (points / 1000) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[8px] text-mocha font-medium">
                      <span>0 pts</span>
                      <span>{points >= 1000 ? 'Level Unlocked! ⭐️' : `${1000 - points} pts to free coffee`}</span>
                      <span>1000 pts</span>
                    </div>
                  </div>
                </div>

                {/* Club Bonus CTA if not joined */}
                {!hasJoinedClub && (
                  <div className="bg-terracotta/10 border border-terracotta/20 rounded-xl p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold text-terracotta uppercase block">JOIN COFFEE CLUB</span>
                      <p className="text-[8px] text-espresso/70 truncate">Claim +150 points instantly!</p>
                    </div>
                    <button 
                      onClick={onJoinClub}
                      className="bg-terracotta text-white text-[8px] font-bold px-2 py-1 rounded hover:bg-terracotta/90"
                    >
                      CLAIM
                    </button>
                  </div>
                )}

                {/* List of rewards */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-espresso/70 uppercase tracking-widest">REWARDS & BENEFITS</h4>
                  
                  {rewards.map((reward) => {
                    const canRedeem = points >= reward.pointsCost;
                    return (
                      <div 
                        key={reward.id}
                        className={`p-2.5 rounded-xl border flex justify-between items-center gap-2 ${
                          canRedeem 
                            ? 'bg-white border-mocha/20 hover:border-terracotta/50' 
                            : 'bg-espresso/[0.02] border-mocha/10 opacity-70'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">
                              {reward.category === 'coffee' && '☕'}
                              {reward.category === 'discount' && '🏷️'}
                              {reward.category === 'pastry' && '🥐'}
                            </span>
                            <span className="font-display font-extrabold text-[10px] text-espresso">{reward.name}</span>
                          </div>
                          <p className="text-[8px] text-espresso/50 truncate mt-0.5">{reward.description}</p>
                          <span className="font-mono text-[8px] font-bold text-terracotta uppercase block mt-1">{reward.pointsCost} POINTS</span>
                        </div>

                        <button
                          disabled={!canRedeem}
                          onClick={() => onRedeemReward(reward)}
                          className={`text-[8px] font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-all shrink-0 ${
                            canRedeem 
                              ? 'bg-terracotta hover:bg-terracotta/90 text-white cursor-pointer active:scale-95' 
                              : 'bg-espresso/10 text-espresso/40 cursor-not-allowed'
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="pt-2 text-center text-xs">Switch screens via bottom navigation!</div>
            )}
          </div>

          {renderBottomNav(phone2Screen, setPhone2Screen)}
        </div>


        {/* ================= PHONE 3: ORDER PICKUP SCREEN ================= */}
        <div className="w-full max-w-[310px] aspect-[9/18] bg-cream rounded-[42px] border-[10px] border-espresso shadow-2xl overflow-hidden relative flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
          {renderStatusBar()}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
            {phone3Screen === 'checkout' ? (
              isOrdered ? (
                /* ORDER CONFIRMED VIEW */
                <div className="py-4 text-center space-y-4 flex flex-col items-center justify-center h-full">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-inner shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-terracotta tracking-widest">ORDER PICKUP</span>
                    <h3 className="font-display font-black text-espresso text-base">ORDER CONFIRMED!</h3>
                    <p className="text-[9px] text-espresso/60 leading-relaxed max-w-[190px] mx-auto">
                      Your order will be ready for pickup at <span className="font-bold text-espresso">{orderTime}</span>
                    </p>
                  </div>

                  {/* Coffee takeout graphic illustration */}
                  <div className="relative w-28 h-28 bg-mocha/10 rounded-full flex items-center justify-center my-1">
                    {/* Coffee takeout cup illustration */}
                    <div className="w-14 h-16 bg-white border border-mocha/30 rounded-lg relative flex flex-col items-center justify-between p-1.5 shadow-sm">
                      <div className="w-15 h-3 bg-espresso rounded-full absolute -top-1.5" />
                      <div className="w-7 h-7 rounded-full bg-terracotta/15 flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-terracotta" />
                      </div>
                      <div className="w-full h-2 bg-espresso/5 rounded" />
                    </div>
                    {/* Takeout bag illustration */}
                    <div className="w-10 h-12 bg-[#D7CCC8]/60 border border-mocha/30 rounded absolute right-5 bottom-4 shadow-sm" />
                    {/* Tick bubble */}
                    <div className="absolute right-5 top-5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px] shadow">
                      ✓
                    </div>
                  </div>

                  {/* Summary ticket details */}
                  <div className="bg-white border border-dashed border-mocha/40 rounded-xl p-3 w-full space-y-1 text-left">
                    <div className="flex justify-between items-center text-[9px] border-b border-mocha/10 pb-1 font-bold text-espresso">
                      <span>ORDER #{orderId}</span>
                      <span className="font-mono">${total.toFixed(2)}</span>
                    </div>
                    <div className="text-[8px] text-espresso/60 pt-1 flex justify-between">
                      <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                      <span>Estimated Ready in 15m</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetOrder}
                    className="w-full bg-espresso hover:bg-espresso/90 text-white text-[9px] font-bold py-2 rounded-lg uppercase tracking-wider transition-colors"
                  >
                    ORDER SOMETHING ELSE
                  </button>
                </div>
              ) : (
                /* CHECKOUT STATE BEFORE PLACING ORDER */
                <>
                  <div className="flex justify-between items-center mt-1">
                    <h3 className="font-display font-extrabold text-espresso text-base">ORDER PICKUP</h3>
                    {cartItems.length > 0 && (
                      <button 
                        onClick={onClearCart}
                        className="text-espresso/40 hover:text-red-500 transition-colors p-1"
                        title="Clear cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3.5 my-8">
                      <div className="w-14 h-14 rounded-full bg-mocha/10 flex items-center justify-center text-2xl">
                        🛒
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-xs text-espresso">YOUR BAG IS EMPTY</h4>
                        <p className="text-[9px] text-espresso/50 max-w-[160px] mx-auto">
                          Add artisanal brews or baked goodies to start your contactless pickup order.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setPhone3Screen('menu');
                        }}
                        className="bg-terracotta text-white text-[9px] font-bold px-4 py-2 rounded-lg hover:bg-terracotta/95 uppercase tracking-wider"
                      >
                        BROWSE COFFEE
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      
                      {/* Cart items scroll list */}
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
                        {cartItems.map((item) => (
                          <div key={item.menuItem.id} className="flex justify-between items-center text-[10px] bg-white border border-mocha/10 rounded-lg p-2 shadow-sm">
                            <div className="min-w-0">
                              <span className="font-bold text-espresso block truncate">{item.menuItem.name}</span>
                              <span className="text-[9px] text-espresso/50 font-mono">${item.menuItem.price.toFixed(2)} x {item.quantity}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button 
                                onClick={() => onRemoveFromCart(item.menuItem.id)}
                                className="w-4 h-4 rounded bg-espresso/5 hover:bg-espresso/10 text-espresso font-bold flex items-center justify-center text-[10px]"
                              >
                                -
                              </button>
                              <span className="font-bold text-espresso w-3 text-center text-[9px]">{item.quantity}</span>
                              <button 
                                onClick={() => onAddToCart(item.menuItem)}
                                className="w-4 h-4 rounded bg-espresso/5 hover:bg-espresso/10 text-espresso font-bold flex items-center justify-center text-[10px]"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Coupon items applied indicators */}
                      <div className="space-y-1">
                        {discountApplied > 0 && (
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 text-[8px] font-bold px-2 py-1 rounded">
                            <Tag className="w-3 h-3" />
                            <span>COUPON REDEEMED: {discountApplied}% OFF ORDER</span>
                          </div>
                        )}
                        {hasFreePastry && (
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 text-[8px] font-bold px-2 py-1 rounded">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>REWARD: FREE PASTRY CREDIT APPLIED</span>
                          </div>
                        )}
                      </div>

                      {/* Checkout totals list */}
                      <div className="border-t border-mocha/15 pt-2.5 space-y-1.5 text-[10px]">
                        <div className="flex justify-between text-espresso/60">
                          <span>Subtotal</span>
                          <span className="font-mono">${subtotal.toFixed(2)}</span>
                        </div>
                        {discountApplied > 0 && (
                          <div className="flex justify-between text-emerald-600">
                            <span>Club Discount</span>
                            <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        {hasFreePastry && (
                          <div className="flex justify-between text-emerald-600">
                            <span>Free Pastry Credit</span>
                            <span className="font-mono">-${pastryDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-espresso/60">
                          <span>Tax & Processing</span>
                          <span className="font-mono">$0.00</span>
                        </div>
                        <div className="flex justify-between text-espresso font-black text-[11px] pt-1 border-t border-mocha/5">
                          <span>Total</span>
                          <span className="font-mono text-terracotta">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-terracotta hover:bg-terracotta/95 text-white text-[10px] font-bold py-3 rounded-lg uppercase tracking-wider shadow-md transition-all mt-1"
                        id="place-order-cta"
                      >
                        PLACE PICKUP ORDER →
                      </button>
                    </div>
                  )}
                </>
              )
            ) : (
              <div className="pt-2 text-center text-xs">Switch screens via bottom navigation!</div>
            )}
          </div>

          {renderBottomNav(phone3Screen, setPhone3Screen)}
        </div>

      </div>
    </section>
  );
}
