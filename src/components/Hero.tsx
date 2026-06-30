import React from 'react';
import { motion } from 'framer-motion'; // Replaced 'motion/react' with standard 'framer-motion' if needed, or keep your import
import { Calendar, BookOpen, Plus } from 'lucide-react';
import { UtensilsCrossed } from "lucide-react";

interface HeroProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onAddPopularItem: (itemName: string) => void;
}

export default function Hero({ onOpenReservation, onOpenMenu, onAddPopularItem }: HeroProps) {
  const popularPicks = [
    {
      name: 'CARAMEL LATTE',
      desc: 'Rich espresso with caramel drizzle',
      price: '$4.75',
      icon: '☕',
    },
    {
      name: 'MOCHA MAGIC',
      desc: 'Chocolatey delight with whipped cream',
      price: '$5.25',
      icon: '🍫',
    },
    {
      name: 'AVOCADO TOAST',
      desc: 'Fresh avocado on toasted sourdough',
      price: '$7.25',
      icon: '🥑',
    },
    {
      name: 'BLUEBERRY MUFFIN',
      desc: 'Freshly baked every morning',
      price: '$3.75',
      icon: '🧁',
    },
  ];

  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column (Text & CTAs) */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="w-2 h-2 rounded-full bg-terracotta/45" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              GOOD COFFEE. GOOD MOOD.
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.05] text-espresso tracking-tight">
            FRESH <br />
            <span className="text-terracotta">BREWS</span> <br />
            DAILY
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-espresso/70 leading-relaxed max-w-md">
            Handcrafted coffee made with premium beans, served in a cozy space where every cup feels like home. Experience coffee house culture at its finest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenReservation}
              className="bg-terracotta hover:bg-terracotta/95 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all active:translate-y-0 flex items-center justify-center gap-2"
              id="hero-reserve-cta"
            >
              <Calendar className="w-4 h-4" />
              RESERVE A TABLE
            </button>
            <button
              onClick={onOpenMenu}
              className="border border-espresso hover:bg-espresso/5 text-espresso font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2"
              id="hero-menu-cta"
            >
              <BookOpen className="w-4 h-4" />
              VIEW MENU
            </button>
          </div>
        </div>

        {/* Right Column (Hero image + Floating picks) */}
        <div className="lg:col-span-7 relative flex justify-center items-center mt-6 lg:mt-0 mb-24 lg:mb-0">
          
          {/* Background Blobs */}
          <div className="absolute -z-10 w-[110%] h-[110%] -top-[10%] -left-[5%] pointer-events-none">
            <div className="absolute top-[10%] right-[5%] w-[80%] aspect-square rounded-full bg-[#EFE8E1] opacity-70" />
            <div className="absolute bottom-[5%] right-[20%] w-[60%] aspect-square rounded-full bg-terracotta/5 blur-3xl" />
            <div className="absolute top-[15%] right-[35%] grid grid-cols-4 gap-2 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-terracotta" />
              ))}
            </div>
          </div>

          {/* Large Hero Image - OVERFLOW VISIBLE added here */}
          <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-[32px] overflow-visible shadow-2xl border border-mocha/20">
            <img
              src="/src/assets/images/hero_coffee_croissant_1782760453157.jpg"
              alt="Artisanal Latte Art Cup and Golden Croissant on Plate"
              className="w-full h-full object-cover select-none rounded-[32px]"
            />
            {/* Floating Menu Button */}

<div className="absolute -bottom-22 right-2 z-30 group">

    <button
        onClick={onOpenMenu}
        className="
        w-14
        h-14
        rounded-full
        bg-dark-roast
        text-white
        shadow-xl
        flex
        items-center
        justify-center
        hover:scale-110
        hover:rotate-6
        transition-all
        duration-300
        "
    >
        <UtensilsCrossed className="w-6 h-6" />
    </button>

    <div
        className="
        absolute
        bottom-16
        right-1/2
        translate-x-1/2
        whitespace-nowrap
        bg-dark-roast
        text-white
        text-xs
        px-3
        py-1
        rounded-lg
        opacity-0
        group-hover:opacity-100
        transition
        pointer-events-none
        "
    >
        View Full Menu
    </div>

</div>

            <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent pointer-events-none rounded-[32px]" />

            {/* Floating Card: "POPULAR PICKS" - Adjusted coordinates */}
            
          </div>

        </div>
      </div>
    </section>
  );
}