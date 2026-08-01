import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ShieldCheck, CalendarX } from 'lucide-react';

const hotelsData = [
  {
    id: 1,
    name: 'Atlantis The Palm',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    discount: '15% OFF',
    price: 450,
    city: 'Dubai'
  },
  {
    id: 2,
    name: 'The Ritz-Carlton New York',
    location: 'Central Park, New York',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    discount: null,
    price: 680,
    city: 'New York'
  },
  {
    id: 3,
    name: 'W Barcelona',
    location: 'Barceloneta, Barcelona',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    discount: '10% OFF',
    price: 350,
    city: 'Barcelona'
  },
  {
    id: 4,
    name: 'Aman Tokyo',
    location: 'Otemachi, Tokyo',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    discount: '5% OFF',
    price: 850,
    city: 'Tokyo'
  }
];

const filters = ['All', 'Dubai', 'New York', 'Barcelona', 'Tokyo', 'Maldives', 'Bali'];

const FeaturedHotels = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredHotels = activeFilter === 'All' 
    ? hotelsData 
    : hotelsData.filter(h => h.city === activeFilter);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E11D48]">
              Where to stay
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0d1b1e] sm:text-4xl">
              Featured Hotels
            </h2>
            <p className="mt-2 max-w-md text-[15px] font-medium leading-relaxed text-slate-500">
              Handpicked stays for your next luxury escape
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#E11D48]" strokeWidth={2.5} />
              Best Price Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarX className="h-4 w-4 text-[#E11D48]" strokeWidth={2.5} />
              Free Cancellation
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-[#E11D48]/30 hover:bg-rose-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white text-left shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-100 hover:shadow-[0_22px_55px_rgba(225,29,72,0.12)]"
            >
              <div className="relative aspect-[16/11] shrink-0 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
                
                {hotel.discount && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#E11D48] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                    {hotel.discount}
                  </span>
                )}
                
                <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-black text-slate-800 shadow-sm backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  {hotel.rating}
                </span>
              </div>

              <div className="flex min-h-[160px] flex-1 flex-col p-5">
                <h3 className="text-[17px] font-black leading-snug text-slate-900 line-clamp-1 group-hover:text-[#E11D48] transition-colors">
                  {hotel.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                  <span className="line-clamp-1">{hotel.location}</span>
                </div>
                
                <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[12px] font-semibold text-slate-500">From</span>
                    <span className="text-[20px] font-black text-slate-900">${hotel.price}</span>
                    <span className="text-[12px] font-semibold text-slate-500">/night</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
