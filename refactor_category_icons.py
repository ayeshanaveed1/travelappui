import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Hero and Category Icons
old_hero_section = """          {/* Hero Content overlaid on video */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tighter w-full sm:whitespace-nowrap text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">perfect flight</span> from 100s of sites.
            </motion.h1>
            
            {/* Category Icons Selection */}
            <div className="flex justify-center items-center gap-6 sm:gap-10 mt-4">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSel = activeCategory === cat.id;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <div className={`w-12 h-12 rounded-[1.1rem] flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isSel 
                      ? 'bg-[#E11D48] text-white scale-110 shadow-[0_8px_20px_rgba(225,29,72,0.35)] -translate-y-1 ring-2 ring-[#E11D48]/20 ring-offset-2 ring-offset-transparent' 
                      : 'bg-white border border-slate-100 text-slate-500 shadow-sm group-hover:text-[#E11D48] group-hover:border-rose-200 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
                  }`}>
                    <IconComponent size={24} className="stroke-[2.5] cursor-pointer" />
                  </div>
                  <span className={`text-[13px] font-extrabold tracking-wide transition-all duration-300 cursor-pointer mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                    isSel ? 'text-white scale-110' : 'text-white/90 hover:text-white'
                  }`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

          {/* Detailed Modern Search Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-[1000px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] mt-8 mx-4 z-30"
          >"""

new_hero_section = """          {/* Hero Content overlaid on video */}
          <div className="flex flex-col items-center justify-center text-center px-4 mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tighter w-full sm:whitespace-nowrap text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">perfect flight</span> from 100s of sites.
            </motion.h1>
          </div>

          <div className="w-full max-w-[1000px] flex justify-start items-center gap-6 sm:gap-8 z-30 px-4 mb-4">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSel = activeCategory === cat.id;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <div className={`w-[60px] h-[60px] rounded-[16px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSel 
                      ? 'bg-[#E11D48] text-white shadow-sm' 
                      : 'bg-[#eaeaec] text-slate-800 shadow-sm hover:bg-[#dfdfdf]'
                  }`}>
                    <IconComponent size={24} className="stroke-0 fill-current" />
                  </div>
                  <span className={`text-[14px] font-medium transition-all duration-200 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
                    isSel ? 'font-bold' : ''
                  }`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Modern Search Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-[1000px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] mx-4 z-30"
          >"""

if old_hero_section in content:
    content = content.replace(old_hero_section, new_hero_section)
else:
    print("Error: Could not find exact block to replace.")
    exit(1)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Hero section categories refactored successfully.")
