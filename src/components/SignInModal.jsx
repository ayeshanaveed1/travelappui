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
                
                <div className="flex items-center gap-4 mt-6 mb-4">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-wider">or</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="group flex justify-center items-center py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                    <svg className="w-[18px] h-[18px] transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </button>
                  <button className="group flex justify-center items-center py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5 text-slate-900 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.365 14.544c-.035-3.328 2.887-4.992 3.018-5.076-1.543-2.146-3.882-2.42-4.664-2.457-1.956-.192-3.834 1.109-4.838 1.109-.997 0-2.55-1.082-4.168-1.054-2.115.028-4.064 1.168-5.155 2.97-2.217 3.659-.57 9.074 1.583 12.012 1.053 1.442 2.296 3.045 3.928 2.988 1.564-.061 2.155-.968 4.043-.968 1.879 0 2.427.968 4.061.94 1.679-.028 2.766-1.456 3.805-2.898 1.196-1.657 1.688-3.262 1.714-3.344-.038-.016-3.292-1.2-3.327-4.222M14.938 3.82c.866-1.002 1.447-2.398 1.288-3.791-1.238.048-2.75 1.009-3.642 2.025-.796.892-1.492 2.333-1.298 3.7.199.183 1.433.094 2.65-.91 3.652 1.025" />
                    </svg>
                  </button>
                  <button className="group flex justify-center items-center py-3 bg-white border border-slate-200 hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5 text-[#1877F2] transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

                {/* Remember me */}
                <div className="mt-6 flex items-center gap-3">
                  <label className="relative flex items-center justify-center w-[22px] h-[22px] cursor-pointer group">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-full h-full rounded-[6px] border-[2px] border-slate-300 peer-checked:border-[#E11D48] peer-checked:bg-[#E11D48] transition-all duration-300 bg-white shadow-sm flex items-center justify-center group-hover:border-[#E11D48]/50">
                      <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                  <span className="text-[14px] font-bold text-slate-800 cursor-pointer select-none">Remember me</span>
                </div>

                <p className="text-[12px] text-slate-500 leading-relaxed mt-4">
                  By continuing, you agree to TravelIQ's <a href="#" className="font-semibold text-slate-700 hover:text-[#E11D48] hover:underline transition-colors">Terms of Service</a> and acknowledge that you have read our <a href="#" className="font-semibold text-slate-700 hover:text-[#E11D48] hover:underline transition-colors">Privacy Policy</a>.
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
