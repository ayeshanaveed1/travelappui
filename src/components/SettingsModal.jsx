import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe2 } from 'lucide-react';

const Flag = ({ code, className }) => {
  if (!code) return null;
  return (
    <img 
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      alt={code}
      className={className}
      loading="lazy"
    />
  );
};

const SettingsModal = ({
  isOpen,
  onClose,
  tab,
  setTab,
  languagesList,
  currenciesList,
  selectedLanguage,
  setSelectedLanguage,
  selectedCurrency,
  setSelectedCurrency
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[850px] bg-[#EBEBEB] rounded-[16px] shadow-2xl flex flex-col min-h-[500px] overflow-hidden border border-white/40"
          >
            {/* Header / Tabs */}
            <div className="flex items-center justify-between px-8 border-b border-slate-300/80 bg-[#EBEBEB]">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setTab('Languages')}
                  className={`py-5 text-[18px] font-extrabold tracking-tight transition-all relative ${tab === 'Languages' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Languages
                  {tab === 'Languages' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-900 rounded-t"></div>}
                </button>
                <button 
                  onClick={() => setTab('Currency')}
                  className={`py-5 text-[18px] font-extrabold tracking-tight transition-all relative ${tab === 'Currency' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Currency
                  {tab === 'Currency' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-900 rounded-t"></div>}
                </button>
              </div>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-slate-600 hover:text-slate-900 hover:bg-slate-300/50 rounded-full transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto bg-[#EBEBEB] flex-1">
              {tab === 'Languages' ? (
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-5">All Languages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                    {languagesList.map((lang, idx) => {
                      const isSelected = selectedLanguage.name === lang.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all cursor-pointer text-left ${isSelected ? 'bg-slate-200 shadow-sm' : 'hover:bg-slate-300/40'}`}
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)] bg-slate-100 border border-slate-200">
                            {lang.isGlobe ? (
                              <Globe2 size={16} className="text-blue-600" strokeWidth={2.5} />
                            ) : (
                              <Flag code={lang.code} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <span className={`text-[14px] ${isSelected ? 'font-bold text-blue-700' : 'text-slate-700 font-medium'}`}>
                            {lang.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-5">All Currencies</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                    {currenciesList.map((curr, idx) => {
                      const isSelected = selectedCurrency.code === curr.code;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedCurrency(curr)}
                          className={`flex flex-col justify-center px-4 py-3 rounded-[8px] transition-all cursor-pointer text-left ${isSelected ? 'bg-slate-200 shadow-sm' : 'hover:bg-slate-300/40'}`}
                        >
                          <span className={`text-[14px] ${isSelected ? 'font-bold text-blue-700' : 'text-slate-900 font-medium'}`}>
                            {curr.code} - {curr.symbol}
                          </span>
                          <span className="text-[12px] text-slate-500 font-medium mt-0.5">{curr.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
