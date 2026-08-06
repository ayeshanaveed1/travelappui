import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Building, Car, Map } from 'lucide-react';

const mockBookings = [
  { user: 'Sarah L.', location: 'London', action: 'just booked a flight to', destination: 'Paris', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-100' },
  { user: 'Michael T.', location: 'New York', action: 'reserved a stay in', destination: 'Kyoto', icon: Building, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { user: 'Emma W.', location: 'Sydney', action: 'rented a car in', destination: 'Rome', icon: Car, color: 'text-amber-500', bg: 'bg-amber-100' },
  { user: 'David K.', location: 'Berlin', action: 'booked a tour in', destination: 'Bali', icon: Map, color: 'text-rose-500', bg: 'bg-rose-100' },
  { user: 'Olivia M.', location: 'Toronto', action: 'just booked a flight to', destination: 'Tokyo', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-100' }
];

const LiveBookingWidget = () => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing the first toast
    const initialTimer = setTimeout(() => {
      showNextBooking();
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  const showNextBooking = () => {
    const randomBooking = mockBookings[Math.floor(Math.random() * mockBookings.length)];
    setCurrentBooking(randomBooking);
    setIsVisible(true);

    // Hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Wait for 3 to 7 seconds before showing the next one
      const nextDelay = Math.floor(Math.random() * 4000) + 3000;
      setTimeout(() => {
        showNextBooking();
      }, nextDelay);
      
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isVisible && currentBooking && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-[200] hidden sm:flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/60 p-3 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-none"
        >
          {/* Pulsing indicator */}
          <div className="absolute -top-1 -left-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E11D48]"></span>
            </span>
          </div>

          <div className={`w-12 h-12 rounded-full ${currentBooking.bg} flex items-center justify-center shrink-0 border border-white shadow-sm`}>
            <currentBooking.icon size={20} className={currentBooking.color} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-slate-800 leading-tight">
              <span className="font-extrabold">{currentBooking.user}</span> from {currentBooking.location}
            </p>
            <p className="text-[12px] text-slate-500 mt-0.5">
              {currentBooking.action} <span className="font-bold text-slate-800">{currentBooking.destination}</span>
            </p>
            <p className="text-[10px] font-bold text-[#E11D48] mt-1 tracking-wider uppercase">Just now</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveBookingWidget;
