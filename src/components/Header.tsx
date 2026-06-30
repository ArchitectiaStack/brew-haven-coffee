import React, { useState } from 'react';
import { Coffee, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export default function Header({ onOpenReservation, onOpenMenu }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('HOME');

  const navItems = [
    { name: 'HOME', action: () => { setActiveTab('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { name: 'MENU', action: () => { setActiveTab('MENU'); onOpenMenu(); } },
    { name: 'ABOUT US', action: () => { setActiveTab('ABOUT US'); } },
    { name: 'LOCATIONS', action: () => { setActiveTab('LOCATIONS'); } },
    { name: 'BLOG', action: () => { setActiveTab('BLOG'); } },
    { name: 'CONTACT', action: () => { setActiveTab('CONTACT'); } },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-mocha/10 px-4 sm:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
          <Coffee className="w-5 h-5 text-terracotta" />
        </div>
        <div>
          <span className="font-display font-black text-base text-espresso tracking-tight block leading-none">
            BREW HAVEN
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-espresso/60 block mt-0.5">
            COFFEE CO.
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-espresso/70">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            className={`hover:text-espresso relative py-1 transition-colors cursor-pointer ${
              activeTab === item.name ? 'text-espresso' : ''
            }`}
          >
            {item.name}
            {activeTab === item.name && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded" />
            )}
          </button>
        ))}
      </nav>

      {/* Reserve a Table CTA */}
      <div className="hidden md:block">
        <button
          onClick={onOpenReservation}
          className="bg-terracotta hover:bg-terracotta/95 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center gap-2"
          id="header-reserve-button"
        >
          <Calendar className="w-3.5 h-3.5" />
          RESERVE A TABLE
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onOpenReservation}
          className="bg-terracotta text-white p-2 rounded-full shadow-sm"
          title="Reserve a Table"
        >
          <Calendar className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-espresso p-1.5 hover:bg-mocha/10 rounded-lg transition-colors"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b border-mocha/20 p-6 shadow-xl flex flex-col gap-4 md:hidden z-50">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-display font-bold text-sm tracking-wide text-espresso/80 py-2 hover:text-espresso transition-colors border-b border-mocha/5 ${
                  activeTab === item.name ? 'text-terracotta font-extrabold' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full bg-terracotta hover:bg-terracotta/95 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-md transition-all mt-2"
          >
            RESERVE A TABLE
          </button>
        </div>
      )}
    </header>
  );
}
