import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Lock, 
  EyeOff, 
  Eye, 
  CheckCircle2, 
  Globe2, 
  Building2 
} from 'lucide-react';
import heroImg from './assets/Gemini_Generated_Image_hxqmh7hxqmh7hxqm.png';

const RegisterPage = ({ onClose }) => {
  const [accountType, setAccountType] = useState('Customer');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] bg-white w-full h-full overflow-y-auto font-sans">
      <div className="flex w-full min-h-full">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 min-h-full bg-[#F3F4F6] flex flex-col relative">
        <div className="p-6 lg:px-12 lg:py-8 w-full max-w-[600px] mx-auto flex-1 flex flex-col">
          
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors self-start mb-6 font-medium cursor-pointer"
          >
            <ChevronLeft size={18} />
            Back to home
          </button>

          <div className="flex-1 flex flex-col justify-center">
            
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Create account</h1>
              <div className="flex bg-slate-200 p-1 rounded-full">
                <button 
                  onClick={() => setAccountType('Customer')}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${accountType === 'Customer' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Customer
                </button>
                <button 
                  onClick={() => setAccountType('Agent')}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${accountType === 'Agent' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Agent
                </button>
              </div>
            </div>

            <p className="text-slate-500 mb-4 font-medium">Join TravelIQ to start booking flights and hotels</p>

            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl transition-all mb-4 shadow-sm cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] flex-1 bg-slate-200"></div>
              <span className="text-slate-400 text-sm font-medium">or register with email</span>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">First Name <span className="text-[#E11D48]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input type="text" placeholder="John" className="w-full bg-transparent border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Last Name <span className="text-[#E11D48]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input type="text" placeholder="Doe" className="w-full bg-transparent border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Email <span className="text-[#E11D48]">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input type="email" placeholder="you@example.com" className="w-full bg-transparent border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all" />
                </div>
                <p className="text-[12px] text-slate-400 mt-1.5 font-medium">We'll never share your email</p>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Password <span className="text-[#E11D48]">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create a strong password" 
                    className="w-full bg-transparent border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 bg-white group-hover:border-[#E11D48] transition-colors mt-0.5 shrink-0">
                  <input type="checkbox" className="hidden" />
                  {/* Invisible checkmark that appears when checked - handling pure UI here so assume unchecked for demo */}
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                  By creating an account you agree to the <a href="#" className="font-bold text-slate-900 hover:text-[#E11D48] transition-colors">Terms and Conditions</a> and <a href="#" className="font-bold text-slate-900 hover:text-[#E11D48] transition-colors">Privacy Policy</a>
                </p>
              </label>

              <button 
                type="button" 
                className="w-full bg-[#E11D48] hover:bg-rose-600 text-white font-extrabold text-[15px] py-3 rounded-xl mt-4 transition-all duration-300 shadow-[0_4px_14px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 cursor-pointer"
              >
                Create account
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Right Column - Aesthetic Image & Gradient */}
      <div className="hidden lg:flex w-1/2 min-h-full relative overflow-hidden bg-slate-900 flex-col items-center justify-center py-12">
        
        {/* Full Background Animated Image */}
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
           <img 
              src={heroImg} 
              alt="Travel Illustration" 
              className="w-full h-full object-cover object-top"
           />
        </motion.div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-10"></div>

        {/* Content over image in a beautiful glassmorphism card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 flex flex-col items-center text-center p-12 mx-8 mt-20 rounded-[32px] backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#E11D48] rounded-xl flex items-center justify-center shadow-lg text-white font-black text-xl tracking-tighter">
              T
            </div>
            <span className="text-2xl font-black tracking-[0.15em] text-white">
              TRAVEL<span className="text-white/60">IQ</span>
            </span>
          </div>

          <h2 className="text-4xl font-black text-white mb-4">
            Your Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">Begins Here</span>
          </h2>
          
          <p className="text-slate-100 font-medium max-w-[350px] mb-10 leading-relaxed text-[15px]">
            Join thousands of travelers booking flights and hotels worldwide with real-time pricing and instant confirmation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white text-[13px] font-bold">
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-full border border-white/20 cursor-default">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Secure
            </div>
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-full border border-white/20 cursor-default">
              <Globe2 size={16} className="text-blue-400" />
              Global flights
            </div>
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-full border border-white/20 cursor-default">
              <Building2 size={16} className="text-purple-400" />
              Hotels
            </div>
          </div>
          
        </motion.div>
        
        <p className="absolute bottom-8 z-20 text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">TravelIQ - Travel Simplified</p>
      </div>
      </div>
    </div>
  );
};

export default RegisterPage;
