import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check } from 'lucide-react';

const Flag = ({ code, className }) => {
  if (!code) return null;
  return (
    <img 
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} 
      alt={`${code} flag`} 
      className={className} 
    />
  );
};

const CountryModal = ({ isOpen, onClose, selectedCountry, setSelectedCountry, countriesList }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter countries based on search query
  const filteredCountries = countriesList.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          
          {/* Modal Container - Centered */}
          <div className="fixed inset-0 flex items-center justify-center z-[210] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[20px] shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-[22px] font-bold text-slate-900">Country/Region</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-rose-50 rounded-full transition-colors text-slate-500 hover:text-[#E11D48] cursor-pointer"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="px-6 py-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:border-[#E11D48] transition-all text-[15px]"
                  />
                </div>
              </div>
              
              {/* Country List */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
                  {filteredCountries.map((country) => {
                    const isSelected = selectedCountry.code === country.code;
                    return (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          onClose();
                        }}
                        className={`flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-300 text-left group cursor-pointer hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5 ${
                          isSelected ? 'bg-slate-50 shadow-sm' : ''
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-white flex items-center justify-center">
                          <Flag code={country.code} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[15px] font-medium transition-colors ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{country.name}</span>
                        {isSelected && (
                          <div className="ml-auto text-[#E11D48]">
                            <Check size={20} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                  
                  {filteredCountries.length === 0 && (
                    <div className="col-span-full py-8 text-center text-slate-500">
                      No countries found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CountryModal;
