import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Clock, Coffee, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (reservation: Reservation) => void;
}

export default function ReservationModal({ isOpen, onClose, onSuccess }: ReservationModalProps) {
  const [formData, setFormData] = useState<Reservation>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resCode, setResCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const code = 'BH-' + Math.floor(1000 + Math.random() * 9000);
      setResCode(code);
      onSuccess(formData);
    }, 1200);
  };

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', 
    '19:00', '20:00', '21:00'
  ];

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
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-cream border border-mocha/30 shadow-2xl z-10"
          >
            {/* Top decorative bar */}
            <div className="h-2 bg-terracotta w-full" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-mocha/10">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-terracotta" />
                <h3 className="font-display font-semibold text-espresso text-lg tracking-tight">
                  RESERVE A TABLE
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-espresso/60 hover:text-espresso hover:bg-mocha/15 transition-colors"
                id="close-reservation-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-espresso/70 leading-relaxed">
                    Secure your spot at Brew Haven. Whether it’s an early espresso briefing or a cozy weekend breakfast, we’ll save a beautiful space for you.
                  </p>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta text-sm transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta text-sm transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-terracotta" /> Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso focus:outline-none focus:border-terracotta text-sm transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-terracotta" /> Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso focus:outline-none focus:border-terracotta text-sm transition-colors"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-terracotta" /> Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso focus:outline-none focus:border-terracotta text-sm transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso/80">Special Requests / Notes (Optional)</label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g., quiet corner, window seat, high chair needed..."
                      className="w-full px-4 py-2.5 rounded-lg border border-mocha/40 bg-white text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-terracotta/95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:bg-terracotta/50"
                    id="submit-reservation"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        CONFIRM RESERVATION
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-espresso text-2xl tracking-tight">
                      BOOKING CONFIRMED!
                    </h4>
                    <p className="text-sm text-espresso/70 max-w-sm mx-auto">
                      Thank you, {formData.name}. Your table is successfully reserved. We are excited to serve you!
                    </p>
                  </div>

                  {/* Digital Ticket */}
                  <div className="border border-dashed border-mocha/60 rounded-xl bg-white p-5 max-w-sm mx-auto shadow-sm relative overflow-hidden text-left space-y-3">
                    {/* Circle notches on sides */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cream border-r border-dashed border-mocha/60" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cream border-l border-dashed border-mocha/60" />

                    <div className="flex justify-between items-center pb-2 border-b border-mocha/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-terracotta">BREW HAVEN COFFEE CO.</span>
                      <span className="font-mono text-xs font-bold text-espresso">{resCode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm pt-1">
                      <div>
                        <span className="block text-[10px] uppercase text-espresso/45 font-semibold tracking-wider">GUEST</span>
                        <span className="font-medium text-espresso truncate">{formData.name}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-espresso/45 font-semibold tracking-wider">PARTY SIZE</span>
                        <span className="font-medium text-espresso">{formData.guests} Guests</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-espresso/45 font-semibold tracking-wider">DATE</span>
                        <span className="font-medium text-espresso">{formData.date}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-espresso/45 font-semibold tracking-wider">TIME</span>
                        <span className="font-medium text-espresso">{formData.time}</span>
                      </div>
                    </div>

                    {formData.notes && (
                      <div className="pt-2 border-t border-mocha/10">
                        <span className="block text-[10px] uppercase text-espresso/45 font-semibold tracking-wider mb-0.5">NOTES</span>
                        <p className="text-xs text-espresso/80 italic line-clamp-2">{formData.notes}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    className="px-6 py-2 border border-espresso text-espresso hover:bg-espresso/5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all"
                  >
                    CLOSE WINDOW
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
