import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SignInModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[850px] bg-[#f1f5f9] rounded-[24px] shadow-2xl flex flex-col md:flex-row min-h-[480px] overflow-visible"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-sm rounded-full transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Left Form Section */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative z-10">
              {/* Logo */}
              <div className="text-xl font-black tracking-widest text-[#E11D48] mb-5 flex items-center gap-1.5">
                <span>TRAVEL<span className="text-slate-800">IQ</span></span>
              </div>
              
              {/* Headlines */}
              <h2 className="text-3xl md:text-[34px] font-black text-slate-900 leading-[1.1] mb-3 tracking-tight">
                It's no myth — there's a best time to book
              </h2>
              <p className="text-[14px] text-slate-600 mb-5 font-medium max-w-[340px] leading-snug">
                Log in or create an account to track prices, compare saved picks and book when the price drops.
              </p>

              {/* Form */}
              <div className="space-y-3.5 max-w-[340px]">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-900">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 bg-transparent border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-colors font-medium text-sm"
                  />
                </div>
                
                <button className="w-full bg-[#E11D48] hover:bg-rose-700 text-white font-extrabold py-3 rounded-lg transition-colors cursor-pointer shadow-md shadow-[#E11D48]/30 text-sm">
                  Continue
                </button>
                
                <div className="flex items-center gap-4 my-1.5">
                  <div className="h-px bg-slate-300 flex-1"></div>
                  <span className="text-[12px] text-slate-500 font-medium">or</span>
                  <div className="h-px bg-slate-300 flex-1"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex justify-center items-center py-2 bg-slate-200/60 hover:bg-slate-300/80 rounded-lg transition-colors cursor-pointer">
                    <span className="font-extrabold text-slate-700 text-base">G</span>
                  </button>
                  <button className="flex justify-center items-center py-2 bg-slate-200/60 hover:bg-slate-300/80 rounded-lg transition-colors cursor-pointer">
                    <span className="font-extrabold text-slate-700 text-xs">Apple</span>
                  </button>
                  <button className="flex justify-center items-center py-2 bg-slate-200/60 hover:bg-slate-300/80 rounded-lg transition-colors cursor-pointer">
                    <span className="font-extrabold text-[#1877F2] text-base">f</span>
                  </button>
                </div>

                {/* Remember me */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-[#E11D48] bg-[#E11D48] transition-colors shrink-0">
                    <input type="checkbox" defaultChecked className="absolute opacity-0 w-full h-full cursor-pointer z-10" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-white" />
                  </div>
                  <label className="text-[15px] font-bold text-slate-800 cursor-pointer">Remember me</label>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed mt-2 max-w-sm">
                  By continuing, you agree to TravelIQ's <a href="#" className="underline hover:text-slate-800">Terms of Service</a> and acknowledge that you have read our <a href="#" className="underline hover:text-slate-800">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* Right Graphic Section */}
            <div className="hidden md:block w-[400px] relative overflow-hidden bg-slate-900 rounded-r-[24px]">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" 
                alt="Airplane wing" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white">
                  <div className="text-[11px] font-black tracking-widest text-[#E11D48] uppercase mb-1">Price Alerts</div>
                  <div className="font-bold text-lg mb-1">Never miss a deal</div>
                  <p className="text-xs text-white/70 font-medium">We'll email you when prices drop on your searched routes.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;
