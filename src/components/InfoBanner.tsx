import React, { useState } from 'react';
import { Clock, MapPin, Award, Instagram, Facebook, Heart, Gift, Sparkles, Check } from 'lucide-react';

interface InfoBannerProps {
  onJoinClub: () => void;
  hasJoinedClub: boolean;
}

export default function InfoBanner({ onJoinClub, hasJoinedClub }: InfoBannerProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onJoinClub();
    }, 1000);
  };

  return (
    <section className="bg-dark-roast text-white py-10 px-4 sm:px-8 w-full relative overflow-hidden">
      {/* Subtle glowing backgrounds */}
      <div className="absolute top-[-50%] right-[-10%] w-[40%] aspect-square rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-8">
        
        {/* Left Side: 4 Info Points Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 xl:gap-10 w-full xl:w-auto">
          
          {/* Clock */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <span className="block text-[10px] text-mocha font-bold uppercase tracking-wider">OPEN DAILY</span>
              <span className="text-xs sm:text-sm font-bold text-white">6:30 AM - 9:00 PM</span>
            </div>
          </div>

          {/* Map */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <span className="block text-[10px] text-mocha font-bold uppercase tracking-wider">LOCATIONS</span>
              <span className="text-xs sm:text-sm font-bold text-white">12+ Cities Worldwide</span>
            </div>
          </div>

          {/* Happy Customers */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <span className="block text-[10px] text-mocha font-bold uppercase tracking-wider">HAPPY CUSTOMERS</span>
              <span className="text-xs sm:text-sm font-bold text-white">12,500+ Reviews</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <span className="block text-[10px] text-mocha font-bold uppercase tracking-wider">FOLLOW US</span>
              <div className="flex items-center gap-2 mt-0.5">
                <a href="#instagram" className="text-white hover:text-terracotta transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" className="text-white hover:text-terracotta transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#heart" className="text-white hover:text-terracotta transition-colors">
                  <Heart className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: CTA box "JOIN OUR COFFEE CLUB" */}
        <div className="w-full xl:max-w-md bg-white rounded-2xl p-5 text-espresso shadow-lg border border-mocha/10 flex items-start sm:items-center gap-4 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-[-15px] bottom-[-15px] text-mocha/10 pointer-events-none">
            <Gift className="w-24 h-24 stroke-[1px]" />
          </div>

          {/* Coffee mug silhouette icon */}
          <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center text-2xl shadow-inner shrink-0 self-start sm:self-center">
            ☕
          </div>

          {/* Content & Action */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-terracotta block">
                JOIN OUR COFFEE CLUB
              </span>
              <p className="text-xs text-espresso/70 mt-0.5 leading-relaxed">
                Earn points, get free rewards, and unlock cozy surprise offers!
              </p>
            </div>

            {!hasJoinedClub ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-cream/70 text-espresso text-xs rounded-lg px-3 py-2 border border-mocha/30 focus:outline-none focus:border-terracotta"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-terracotta hover:bg-terracotta/95 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors shrink-0 flex items-center justify-center min-w-[85px]"
                  id="join-club-submit"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'JOIN NOW →'
                  )}
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" />
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>WELCOME! +150 BONUS POINTS CREDITED</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
