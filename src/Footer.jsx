import React from 'react';


const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0a1218] mt-auto">
      {/* Top Border Gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E11D48]/50 to-transparent"></div>
      
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[#E11D48]/10 blur-[100px]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Column 1: Brand & Desc */}
          <div className="max-w-sm">
            <a href="/" className="inline-block">
              <span className="text-3xl font-black tracking-widest text-white">
                TRAVEL<span className="text-[#E11D48]">IQ</span>
              </span>
            </a>
            <p className="mt-6 text-sm leading-relaxed text-white/60 font-medium">
              Flights and hotels for customers, agents, and travel teams. Smart booking, global reach, one unified platform.
            </p>
            
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#E11D48]/50 hover:text-[#E11D48] hover:bg-[#E11D48]/10">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#E11D48]/50 hover:text-[#E11D48] hover:bg-[#E11D48]/10">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#E11D48]/50 hover:text-[#E11D48] hover:bg-[#E11D48]/10">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">About Us</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Careers</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Press</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Help Center</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Contact Us</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Cancellation Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Terms of Service</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Cookie Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-[#E11D48]">Data Security</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm font-medium text-white/40">
            © {new Date().getFullYear()} TravelIQ. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <span className="text-sm font-medium text-white/40">USD ($)</span>
            <span className="text-sm font-medium text-white/40">English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
