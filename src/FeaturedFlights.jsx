import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

const flightsData = [
  {
    id: 1,
    airline: 'Emirates',
    from: 'DXB',
    fromCity: 'Dubai',
    to: 'JFK',
    toCity: 'New York',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80',
    type: 'Non-stop',
    duration: '14h 20m',
    price: 850,
    discount: 'Early Bird',
    region: 'North America'
  },
  {
    id: 2,
    airline: 'Qatar Airways',
    from: 'DOH',
    fromCity: 'Doha',
    to: 'LHR',
    toCity: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59693e0cd100?auto=format&fit=crop&w=800&q=80',
    type: 'Non-stop',
    duration: '7h 15m',
    price: 620,
    discount: null,
    region: 'Europe'
  },
  {
    id: 3,
    airline: 'Singapore Airlines',
    from: 'SIN',
    fromCity: 'Singapore',
    to: 'NRT',
    toCity: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    type: 'Non-stop',
    duration: '6h 50m',
    price: 490,
    discount: 'Special',
    region: 'Asia'
  },
  {
    id: 4,
    airline: 'Air France',
    from: 'CDG',
    fromCity: 'Paris',
    to: 'MLE',
    toCity: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    type: '1 Stop',
    duration: '11h 30m',
    price: 780,
    discount: null,
    region: 'Asia'
  }
];

const filters = ['All', 'North America', 'Europe', 'Asia', 'Middle East'];

const FeaturedFlights = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredFlights = activeFilter === 'All' 
    ? flightsData 
    : flightsData.filter(f => f.region === activeFilter);

  return (
    <section className="bg-slate-50 py-12 sm:py-16 w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E11D48]">
              Trending routes
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0d1b1e] sm:text-4xl">
              Featured Flights
            </h2>
            <p className="mt-2 max-w-md text-[15px] font-medium leading-relaxed text-slate-500">
              Popular city pairs from trusted airline partners
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#E11D48]" strokeWidth={2.5} />
              Flexible Booking
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

        {/* Flights Marquee Container */}
        <div className="relative w-full overflow-hidden mt-6 pb-6">
          {/* Fading Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent"></div>

          <div className="flex gap-6 w-max custom-marquee">
            {[...filteredFlights, ...filteredFlights].map((flight, index) => (
              <motion.div
                key={`${flight.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % filteredFlights.length) * 0.1 }}
                className="group card-base w-[320px] sm:w-[350px] shrink-0"
              >
                <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={flight.image}
                    alt={`${flight.fromCity} to ${flight.toCity}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
                  
                  {flight.discount && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#E11D48] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                      {flight.discount}
                    </span>
                  )}
                  
                  <span className="absolute bottom-4 right-4 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm border border-slate-100">
                    {flight.airline}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[22px] font-black text-slate-900">{flight.from}</span>
                      <span className="text-[12px] font-medium text-slate-500">{flight.fromCity}</span>
                    </div>
                    
                    <div className="flex flex-col items-center px-4 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 mb-1">{flight.duration}</span>
                      <div className="w-full flex items-center">
                        <div className="h-[2px] w-full bg-slate-200"></div>
                        <Plane className="h-4 w-4 text-[#E11D48] shrink-0 mx-1 transform rotate-45" />
                        <div className="h-[2px] w-full bg-slate-200"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">{flight.type}</span>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[22px] font-black text-slate-900">{flight.to}</span>
                      <span className="text-[12px] font-medium text-slate-500">{flight.toCity}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[12px] font-semibold text-slate-500">From</span>
                      <span className="text-[20px] font-black text-slate-900">${flight.price}</span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-[#E11D48] transition-transform duration-300 group-hover:bg-[#E11D48] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlights;
