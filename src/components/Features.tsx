import React from 'react';
import { Coffee, Heart, Home } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'PREMIUM BEANS',
      desc: 'Sourced from the finest coffee farms around the world, roasting micro-batches to perfection.',
      icon: <Coffee className="w-6 h-6 text-terracotta" strokeWidth={1.5} />,
    },
    {
      title: 'EXPERT BARISTAS',
      desc: 'Passionate baristas crafting the perfect cup every single time with meticulous precision.',
      icon: <Heart className="w-6 h-6 text-terracotta" strokeWidth={1.5} />,
    },
    {
      title: 'COZY AMBIENCE',
      desc: 'Warm, inviting spaces designed intentionally for ultimate comfort, quiet work, and connection.',
      icon: <Home className="w-6 h-6 text-terracotta" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="bg-white/50 border-y border-mocha/10 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 p-4 hover:bg-white rounded-2xl transition-all duration-300 border border-transparent hover:border-mocha/10"
            >
              {/* Thin line icon in circle outline */}
              <div className="w-12 h-12 rounded-full border border-mocha/30 flex items-center justify-center bg-cream/50 shadow-sm shrink-0">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-display font-black text-espresso tracking-wider text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-espresso/60 leading-relaxed max-w-sm">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
