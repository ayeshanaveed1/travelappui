import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Heart, 
  Globe, 
  BedDouble, 
  Plane, 
  Briefcase, 
  Search, 
  ChevronDown,
  Car,
  Ship,
  ArrowLeftRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Building2,
  Ticket,
  Luggage,
  Trees,
  Route,
  Lightbulb,
  Map as MapIcon,
  Award,
  Smartphone,
  User,
  Plus
} from 'lucide-react'
import heroVideo from './assets/create_a_video_for_my_website (1).mp4'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('EN')
  const [region, setRegion] = useState('US')
  const [country, setCountry] = useState('United States')
  const [activeCategory, setActiveCategory] = useState('flights')
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [tripType, setTripType] = useState('round-trip') // one-way, round-trip, multi-city
  const [isHeartHovered, setIsHeartHovered] = useState(false)

  // Search form states
  const [fromCity, setFromCity] = useState('Lahore (All)')
  const [toCity, setToCity] = useState('')
  const [directOnly, setDirectOnly] = useState(false)
  const [passengers, setPassengers] = useState('1 Adult')
  const [travelClass, setTravelClass] = useState('Economy')
  const [paymentType, setPaymentType] = useState('5 Payment Types')

  // Date selection states
  const [departDate, setDepartDate] = useState(new Date(2026, 7, 1)) // Aug 1, 2026
  const [returnDate, setReturnDate] = useState(new Date(2026, 7, 4)) // Aug 4, 2026
  
  // Multi-city state
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: 'New York (JFK)', to: 'London (LHR)', date: new Date(2026, 7, 1) },
    { id: 2, from: 'London (LHR)', to: 'Paris (CDG)', date: new Date(2026, 7, 4) },
    { id: 3, from: 'Paris (CDG)', to: 'Rome (FCO)', date: new Date(2026, 7, 7) }
  ])

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarTarget, setCalendarTarget] = useState({ type: 'depart', index: null }) // type: 'depart'|'return'|'multi', index: row index for multi
  const [activeDropdown, setActiveDropdown] = useState(null); // { type: 'from' | 'to', index: number | 'single' }
  const popularCities = [
    "Lahore", "Islamabad", "Karachi", "Multan",
    "Sialkot", "Peshawar", "Jeddah", "Riyadh",
    "Dubai", "Faisalabad", "Dammam", "Al Madinah",
    "Doha", "Muscat", "Abu Dhabi", "Sharjah"
  ];
  
  // Calendar UI navigation
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(7) // 0-indexed (7 = August)

  const calendarRef = useRef(null)

  // Handle clicking outside calendar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      setActiveDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateMultiCity = (index, field, value) => {
    const newFlights = [...multiCityFlights];
    newFlights[index][field] = value;
    setMultiCityFlights(newFlights);
  };
  
  const handleAddMultiCityFlight = () => {
    if (multiCityFlights.length >= 6) return; // reasonable max
    setMultiCityFlights([...multiCityFlights, { id: Date.now(), from: '', to: '', date: new Date(currentYear, currentMonth, 1) }]);
  };
  
  const handleRemoveMultiCityFlight = (index) => {
    if (multiCityFlights.length <= 2) return;
    const newFlights = [...multiCityFlights];
    newFlights.splice(index, 1);
    setMultiCityFlights(newFlights);
  };

  const categories = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'stays', label: 'Stays', icon: BedDouble },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'packages', label: 'Packages', icon: Briefcase },
    { id: 'cruises', label: 'Cruises', icon: Ship },
  ]

  const sidebarSections = [
    [
      { id: 'hotels', label: 'Hotels & Homes', icon: BedDouble },
      { id: 'flights', label: 'Flights', icon: Plane },
      { id: 'flight_hotel', label: 'Flight + Hotel', icon: Building2 },
      { id: 'cars', label: 'Cars', icon: Car },
      { id: 'attractions', label: 'Attractions & Tours', icon: Ticket },
    ],
    [
      { id: 'private_tours', label: 'Private Tours', icon: Luggage },
      { id: 'group_tours', label: 'Group Tours', icon: Trees },
      { id: 'cruises', label: 'Cruises', icon: Ship },
    ],
    [
      { id: 'planner', label: 'Trip.Planner', icon: Route, badge: 'New' },
      { id: 'inspiration', label: 'Travel Inspiration', icon: Lightbulb },
      { id: 'map', label: 'Map', icon: MapIcon },
    ],
    [
      { id: 'rewards', label: 'TravelIQ Rewards', icon: Award },
      { id: 'app', label: 'App', icon: Smartphone },
    ]
  ];

  // Date helpers
  const formatDateString = (date) => {
    if (!date) return 'Select Date';
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // e.g. Sat, 01 Aug 2026
  }

  const changeDateByDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  // Calendar rendering helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (dayNum, m = currentMonth, y = currentYear) => {
    const selected = new Date(y, m, dayNum);
    
    if (calendarTarget.type === 'multi') {
      const newFlights = [...multiCityFlights];
      newFlights[calendarTarget.index].date = selected;
      setMultiCityFlights(newFlights);
      return;
    }
    
    if (calendarTarget.type === 'depart') {
      setDepartDate(selected);
      if (returnDate && selected > returnDate) {
        setReturnDate(changeDateByDays(selected, 3));
      }
      setCalendarTarget({ type: 'return', index: null });
    } else {
      if (departDate && selected < departDate) {
        setDepartDate(selected);
      }
      setReturnDate(selected);
    }
  }

  const renderCalendarDays = (year, month, isSecondMonth = false) => {
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const dayCells = [];

    // Empty blank cells for offset
    for (let i = 0; i < firstDayIndex; i++) {
      dayCells.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days cells
    for (let d = 1; d <= totalDays; d++) {
      const cellDate = new Date(year, month, d);
      let isDepart = false;
      let isReturn = false;
      let inRange = false;
      
      if (tripType === 'multi-city') {
        const activeDate = calendarTarget.index !== null ? multiCityFlights[calendarTarget.index]?.date : null;
        isDepart = activeDate && cellDate.toDateString() === activeDate.toDateString();
      } else {
        isDepart = departDate && cellDate.toDateString() === departDate.toDateString();
        isReturn = tripType === 'round-trip' && returnDate && cellDate.toDateString() === returnDate.toDateString();
        if (tripType === 'round-trip' && departDate && returnDate && cellDate > departDate && cellDate < returnDate) {
          inRange = true;
        }
      }

      dayCells.push(
        <motion.div 
          key={`day-wrap-${year}-${month}-${d}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: d * 0.005, ease: 'easeOut' }}
          className="relative h-10 w-full flex items-center justify-center"
        >
          {/* Animated Connecting Range */}
          {inRange && (
            <motion.div 
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-blue-50" 
            />
          )}
          {isDepart && returnDate && <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-50" />}
          {isReturn && departDate && <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-blue-50" />}
          
          {/* Magical Flight Animation using layoutId */}
          {((!returnDate && isDepart) || (returnDate && isReturn)) && (
            <motion.div
              layoutId="flight-plane"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute -top-3 -right-2 text-[#0000CD] z-30 drop-shadow-[0_4px_8px_rgba(0,0,205,0.4)] pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Plane size={18} className="rotate-45" fill="currentColor" />
              </motion.div>
            </motion.div>
          )}

          <motion.button
            onClick={() => handleDayClick(d, month, year)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`relative w-9 h-9 text-sm font-bold rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
              isDepart || isReturn 
                ? 'bg-[#0000CD] text-white shadow-[0_4px_12px_rgba(0,0,205,0.4)] ring-[3px] ring-white' 
                : 'hover:bg-blue-50 text-slate-700 hover:text-[#0000CD]'
            }`}
          >
            {d}
          </motion.button>
        </motion.div>
      );
    }

    return dayCells;
  }

  const navigateMonth = (direction) => {
    let nextMonth = currentMonth + direction;
    let nextYear = currentYear;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#0000CD] selection:text-white flex relative">
      
      {/* Fixed Expandable Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#f2f3f5] border-r border-slate-200 z-50 transition-all duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'w-[260px] shadow-[10px_0_30px_rgba(0,0,0,0.1)]' : 'w-16 shadow-none'
        }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header with Hamburger */}
          <div className="h-[72px] flex items-center px-3 border-b border-slate-200/60 shrink-0">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:text-[#0000CD] hover:bg-slate-200/80 hover:scale-110 transition-all duration-200 cursor-pointer focus:outline-none shrink-0 group">
              <Menu size={24} className="transition-transform group-hover:scale-110" />
            </button>
          </div>

          <div className="flex-1 flex flex-col py-2">
            {sidebarSections.map((section, idx) => (
              <div key={idx} className={`flex flex-col py-2 ${idx !== 0 ? 'border-t border-slate-200/60' : ''}`}>
                {section.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id} 
                      className="flex items-center h-12 w-full px-5 hover:bg-white text-slate-600 hover:text-[#0000CD] transition-colors relative group focus:outline-none cursor-pointer"
                    >
                      <div className="min-w-[24px] flex items-center justify-center text-slate-500 group-hover:text-[#0000CD]">
                        <Icon size={20} className="transition-transform group-hover:scale-110" />
                      </div>
                      <span className={`ml-4 text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`absolute right-4 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-wider rounded transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper (shifted for fixed sidebar) */}
      <div className="flex-1 ml-16 w-[calc(100%-4rem)] min-w-0">

      {/* Hero section with video background (Strictly 530px tall) */}
      <header className="relative w-full h-[530px] flex flex-col z-10">
        <div className="absolute inset-0 overflow-hidden">
          <video 
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Extremely light overlay tint to keep video very bright */}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Floating Navbar */}
        <nav className="relative z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full shrink-0">
          {/* Left side: Logo */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-widest text-[#0000CD] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] cursor-pointer">
              TRAVEL<span className="text-white">IQ</span>
            </span>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Currency selector */}
            <div className="relative group/select">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors shadow-sm cursor-pointer">
                <span>{currency}</span>
                <ChevronDown size={14} className="opacity-80 cursor-pointer" />
              </button>
              <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 scale-95 pointer-events-none group-hover/select:opacity-100 group-hover/select:scale-100 group-hover/select:pointer-events-auto transition-all duration-200 z-30">
                <button onClick={() => setCurrency('USD')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">USD ($)</button>
                <button onClick={() => setCurrency('EUR')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">EUR (€)</button>
                <button onClick={() => setCurrency('GBP')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">GBP (£)</button>
              </div>
            </div>

            {/* Language & Region selector */}
            <div className="relative group/lang">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors shadow-sm cursor-pointer">
                <Globe size={16} className="text-white cursor-pointer" />
                <span>{language} ({region})</span>
                <ChevronDown size={14} className="opacity-80 cursor-pointer" />
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 scale-95 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:scale-100 group-hover/lang:pointer-events-auto transition-all duration-200 z-30">
                <button onClick={() => { setLanguage('EN'); setRegion('US') }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">English (US)</button>
                <button onClick={() => { setLanguage('EN'); setRegion('UK') }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">English (UK)</button>
                <button onClick={() => { setLanguage('FR'); setRegion('FR') }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">Français (FR)</button>
              </div>
            </div>

            {/* Country selector */}
            <div className="relative group/country">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors shadow-sm cursor-pointer">
                <MapPin size={16} className="text-white cursor-pointer" />
                <span>{country}</span>
                <ChevronDown size={14} className="opacity-80 cursor-pointer" />
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 scale-95 pointer-events-none group-hover/country:opacity-100 group-hover/country:scale-100 group-hover/country:pointer-events-auto transition-all duration-200 z-50">
                <button onClick={() => setCountry('United States')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">United States</button>
                <button onClick={() => setCountry('United Kingdom')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">United Kingdom</button>
                <button onClick={() => setCountry('France')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0000CD] transition-colors cursor-pointer">France</button>
              </div>
            </div>

            {/* Pulsing Heart Icon */}
            <motion.button
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white transition-colors shadow-sm cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Favorite items list"
            >
              <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0 cursor-pointer">
                <motion.div
                  animate={{ scale: isHeartHovered ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="cursor-pointer"
                >
                  <Heart size={18} fill={isHeartHovered ? "currentColor" : "none"} className="cursor-pointer transition-colors" />
                </motion.div>
              </div>
            </motion.button>

            {/* Login button */}
            <button 
              onClick={() => setIsSignInModalOpen(true)}
              className="px-5 py-1.5 rounded-lg bg-[#0000CD] hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-[#0000CD]/30 active:scale-95 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* Main Content Wrapper to perfectly center everything inside the 530px video height */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full pb-2">
          
          {/* Hero Content overlaid on video */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight w-full sm:whitespace-nowrap text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            >
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">perfect flight</span> from 100s of sites.
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
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isSel 
                      ? 'bg-[#0000CD] text-white scale-110 shadow-lg shadow-[#0000CD]/40 -translate-y-1' 
                      : 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm group-hover:bg-white/20 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)]'
                  }`}>
                    <IconComponent size={24} className="stroke-[2.5] cursor-pointer" />
                  </div>
                  <span className={`text-[12px] font-bold tracking-wide transition-colors cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
                    isSel ? 'text-white' : 'text-slate-200 group-hover:text-white'
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
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-2 relative"
          >
            {/* Animated glowing blob behind panel */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0000CD]/40 via-blue-400/20 to-[#0000CD]/40 rounded-[2.5rem] blur-xl opacity-70 animate-pulse mix-blend-overlay"></div>
            
            <div className="bg-white/20 backdrop-blur-2xl border border-white/50 p-1.5 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-10">
              <div className="bg-white/95 rounded-[1.6rem] p-5 shadow-inner relative">
                {/* Subtle shine effect on top edge of inner panel */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              
              {/* Top row: Trip Type Selector Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { id: 'one-way', label: 'One-way' },
                  { id: 'round-trip', label: 'Round-trip' },
                  { id: 'multi-city', label: 'Multi-city' }
                ].map((t) => {
                  const isActive = tripType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTripType(t.id)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#0000CD]/10 text-[#0000CD]' 
                          : 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>

              {/* Core Search Fields Row(s) */}
              <div className="space-y-3 relative z-30">
                {(tripType === 'multi-city' ? multiCityFlights : [{ id: 'single', from: fromCity, to: toCity, date: departDate }]).map((flight, index) => (
                  <div key={flight.id} className="relative flex flex-col lg:flex-row items-center gap-3">
                    
                    {/* FROM / TO Connected Block */}
                    <div className="flex flex-1 items-center bg-slate-50 border border-slate-200 hover:border-[#0000CD]/40 focus-within:border-[#0000CD]/60 rounded-[12px] transition-all relative w-full shadow-sm group">
                      
                      {/* FROM */}
                      <div 
                        className="flex-1 px-4 py-2.5 relative cursor-text group-hover:bg-white rounded-l-[12px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                        }}
                      >
                        <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Where from?</div>
                        <input 
                          type="text" 
                          placeholder="Origin city" 
                          value={tripType === 'multi-city' ? flight.from : fromCity}
                          onChange={(e) => tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', e.target.value) : setFromCity(e.target.value)}
                          className="bg-transparent text-sm font-extrabold text-slate-800 w-full focus:outline-none placeholder-slate-300" 
                        />
                        {/* FROM Dropdown */}
                        <AnimatePresence>
                          {activeDropdown?.type === 'from' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-[110%] left-0 w-[420px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-5 z-[100] border border-slate-100"
                            >
                              <div className="text-sm font-bold text-slate-800 mb-3 px-1">Popular cities</div>
                              <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                                {popularCities.map((city, idx) => (
                                  <motion.div
                                    key={city}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: idx * 0.02, duration: 0.25, ease: "easeOut" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', city) : setFromCity(city);
                                      setActiveDropdown(null);
                                    }}
                                    className={`px-2 py-2 text-[13px] cursor-pointer rounded-lg transition-colors flex items-center ${
                                      (tripType === 'multi-city' ? flight.from : fromCity) === city
                                        ? 'bg-[#0000CD]/10 text-[#0000CD] font-bold shadow-[0_4px_12px_rgba(0,0,205,0.15)] ring-1 ring-white'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                  >
                                    {city}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {/* Swap Button (Interlocking) */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
                        <button 
                          onClick={() => {
                            if (tripType === 'multi-city') {
                              const temp = flight.from;
                              handleUpdateMultiCity(index, 'from', flight.to);
                              handleUpdateMultiCity(index, 'to', temp);
                            } else {
                              const temp = fromCity;
                              setFromCity(toCity);
                              setToCity(temp);
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow flex items-center justify-center text-slate-400 hover:text-[#0000CD] hover:border-[#0000CD]/30 active:scale-95 transition-all cursor-pointer group/swap"
                        >
                          <ArrowLeftRight size={14} className="group-hover/swap:rotate-180 transition-transform duration-300" />
                        </button>
                      </div>

                      <div className="w-[1px] h-8 bg-slate-200 hidden lg:block"></div>

                      {/* TO */}
                      <div 
                        className="flex-1 px-4 py-2.5 relative cursor-text group-hover:bg-white rounded-r-[12px] lg:pl-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                        }}
                      >
                        <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Where to?</div>
                        <input 
                          type="text" 
                          placeholder="Destination city" 
                          value={tripType === 'multi-city' ? flight.to : toCity}
                          onChange={(e) => tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', e.target.value) : setToCity(e.target.value)}
                          className="bg-transparent text-sm font-extrabold text-slate-800 w-full focus:outline-none placeholder-slate-300" 
                        />
                        {/* TO Dropdown */}
                        <AnimatePresence>
                          {activeDropdown?.type === 'to' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-[110%] left-0 lg:left-6 w-[420px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-5 z-[100] border border-slate-100"
                            >
                              <div className="text-sm font-bold text-slate-800 mb-3 px-1">Popular cities</div>
                              <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                                {popularCities.map((city, idx) => (
                                  <motion.div
                                    key={city}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: idx * 0.02, duration: 0.25, ease: "easeOut" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', city) : setToCity(city);
                                      setActiveDropdown(null);
                                    }}
                                    className={`px-2 py-2 text-[13px] cursor-pointer rounded-lg transition-colors flex items-center ${
                                      (tripType === 'multi-city' ? flight.to : toCity) === city
                                        ? 'bg-[#0000CD]/10 text-[#0000CD] font-bold shadow-[0_4px_12px_rgba(0,0,205,0.15)] ring-1 ring-white'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                  >
                                    {city}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* DATES field (Connected block for round-trip, single for others) */}
                    <div className="flex-[0.8] w-full lg:w-auto">
                      {tripType === 'round-trip' ? (
                        <div className="flex items-center bg-slate-50 border border-slate-200 hover:border-[#0000CD]/40 rounded-[12px] transition-all shadow-sm group">
                          {/* DEPART */}
                          <div 
                            onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                            className="flex-1 px-4 py-2.5 flex items-center justify-between cursor-pointer border-r border-slate-200 group-hover:bg-white rounded-l-[12px]"
                          >
                            <div>
                              <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Depart</div>
                              <div className="text-sm font-extrabold text-slate-800">{formatDateString(departDate)}</div>
                            </div>
                            <div className="flex gap-1">
                              <ChevronLeft size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                              <ChevronRight size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                            </div>
                          </div>
                          {/* RETURN */}
                          <div 
                            onClick={() => { setCalendarTarget({ type: 'return', index: null }); setIsCalendarOpen(true); }}
                            className="flex-1 px-4 py-2.5 flex items-center justify-between cursor-pointer group-hover:bg-white rounded-r-[12px]"
                          >
                            <div>
                              <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Return</div>
                              <div className="text-sm font-extrabold text-slate-800">{formatDateString(returnDate)}</div>
                            </div>
                            <div className="flex gap-1">
                              <ChevronLeft size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                              <ChevronRight size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => { setCalendarTarget(tripType === 'multi-city' ? { type: 'multi', index } : { type: 'depart', index: null }); setIsCalendarOpen(true); }}
                          className="flex items-center bg-slate-50 border border-slate-200 hover:border-[#0000CD]/40 rounded-[12px] px-4 py-2.5 transition-all shadow-sm cursor-pointer hover:bg-white justify-between"
                        >
                          <div>
                            <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Depart</div>
                            <div className="text-sm font-extrabold text-slate-800">{formatDateString(tripType === 'multi-city' ? flight.date : departDate)}</div>
                          </div>
                          <div className="flex gap-1">
                            <ChevronLeft size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                            <ChevronRight size={16} className="text-slate-400 hover:text-[#0000CD] transition-colors" onClick={(e) => { e.stopPropagation(); }} />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Multi-city Remove Row Button */}
                    {tripType === 'multi-city' && index >= 2 && (
                       <button onClick={() => handleRemoveMultiCityFlight(index)} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden lg:block">
                         <X size={16} />
                       </button>
                    )}
                    {tripType === 'multi-city' && index < 2 && (
                       <div className="w-6 hidden lg:block"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Bottom row: Options and Search Button */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20 relative">
                <div>
                  {tripType === 'multi-city' ? (
                     <button onClick={handleAddMultiCityFlight} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[#0000CD]/20 text-[#0000CD] hover:bg-[#0000CD]/5 font-bold transition-colors cursor-pointer text-sm">
                       <Plus size={16} strokeWidth={2.5} />
                       Add flight
                     </button>
                  ) : (
                    <label className="flex items-center gap-2 cursor-pointer group px-1 text-xs font-bold text-slate-500">
                      <div className="relative flex items-center justify-center w-4 h-4 rounded border-2 border-slate-300 group-hover:border-[#0000CD] transition-colors">
                        <input 
                          type="checkbox" 
                          checked={directOnly}
                          onChange={(e) => setDirectOnly(e.target.checked)}
                          className="absolute opacity-0 w-full h-full cursor-pointer z-10" 
                        />
                        {directOnly && <div className="w-2 h-2 rounded-sm bg-[#0000CD]" />}
                      </div>
                      <span className="group-hover:text-slate-800 transition-colors">Direct flights only</span>
                    </label>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 lg:gap-5 ml-auto">
                   <div className="relative group/pass">
                     <button className="flex items-center gap-1 hover:text-[#0000CD] cursor-pointer text-[13px] font-bold text-slate-700">
                       <span>{passengers}</span>
                       <ChevronDown size={14} className="transition-transform group-hover/pass:rotate-180" />
                     </button>
                     <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 scale-95 pointer-events-none group-hover/pass:opacity-100 group-hover/pass:scale-100 group-hover/pass:pointer-events-auto transition-all duration-200 z-50">
                       {['1 Adult', '2 Adults', '3 Adults', '4+ Adults'].map((opt) => (
                         <button key={opt} onClick={() => setPassengers(opt)} className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-[#0000CD] cursor-pointer">{opt}</button>
                       ))}
                     </div>
                   </div>
                   <div className="relative group/class">
                     <button className="flex items-center gap-1 hover:text-[#0000CD] cursor-pointer text-[13px] font-bold text-slate-700">
                       <span>{travelClass}</span>
                       <ChevronDown size={14} className="transition-transform group-hover/class:rotate-180" />
                     </button>
                     <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 scale-95 pointer-events-none group-hover/class:opacity-100 group-hover/class:scale-100 group-hover/class:pointer-events-auto transition-all duration-200 z-50">
                       {['Economy', 'Premium Econ', 'Business', 'First Class'].map((opt) => (
                         <button key={opt} onClick={() => setTravelClass(opt)} className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-[#0000CD] cursor-pointer">{opt}</button>
                       ))}
                     </div>
                   </div>
                   <div className="relative group/pay">
                     <button className="flex items-center gap-1 hover:text-[#0000CD] cursor-pointer text-[13px] font-bold text-slate-700">
                       <span>{paymentType}</span>
                       <ChevronDown size={14} className="transition-transform group-hover/pay:rotate-180" />
                     </button>
                   </div>
                   
                   <button className="px-6 py-3 ml-2 bg-[#0000CD] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-[0_10px_20px_rgba(0,0,205,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,205,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden group">
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                     <span className="relative z-10 px-2">Search</span>
                   </button>
                </div>
              </div>

              {/* Calendar Dropdown Rendered Here (Floating globally below the panel) */}
              <AnimatePresence>
                {isCalendarOpen && (
                  <motion.div
                    ref={calendarRef}
                    initial={{ opacity: 0, scale: 0.95, y: 10, x: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.95, y: 10, x: "-50%" }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-[100%] mt-4 z-[100] bg-[#f2f3f5] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] w-auto min-w-[340px] md:min-w-[720px] flex flex-col overflow-hidden cursor-default border border-slate-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header Inputs (Mimicking the underlying fields for context) */}
                    {tripType !== 'multi-city' && (
                      <div className="flex bg-[#e2e8f0]/50 p-2 rounded-t-[24px]">
                         <div 
                           onClick={() => setCalendarTarget({ type: 'depart', index: null })}
                           className={`flex-1 p-3 mx-1 rounded-[16px] cursor-pointer border-[2px] transition-all duration-300 ${calendarTarget.type === 'depart' ? 'border-[#0000CD] bg-white shadow-sm' : 'border-transparent hover:bg-slate-200/60'}`}
                         >
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Depart</div>
                           <div className="text-base font-extrabold text-slate-800">{formatDateString(departDate)}</div>
                         </div>
                         <div 
                           onClick={() => setCalendarTarget({ type: 'return', index: null })}
                           className={`flex-1 p-3 mx-1 rounded-[16px] cursor-pointer border-[2px] transition-all duration-300 ${calendarTarget.type === 'return' ? 'border-[#0000CD] bg-white shadow-sm' : 'border-transparent hover:bg-slate-200/60'}`}
                         >
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Return</div>
                           <div className="text-base font-extrabold text-slate-800">{tripType === 'one-way' ? 'One-way' : formatDateString(returnDate)}</div>
                         </div>
                      </div>
                    )}
                    {/* Calendar Grid Container */}
                    <div className="p-6 pt-5">
                      {/* Navigation & Month Labels */}
                      <div className="flex justify-between items-center mb-6 px-2">
                        <motion.button 
                          onClick={() => navigateMonth(-1)} 
                          whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-xl text-slate-600 hover:text-[#0000CD] cursor-pointer transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        
                        <div className="flex-1 flex justify-around px-8">
                          <span className="text-base font-extrabold text-slate-800 tracking-wide text-center">
                            {monthNames[currentMonth]} {currentYear}
                          </span>
                          <span className="text-base font-extrabold text-slate-800 tracking-wide hidden md:block text-center">
                            {monthNames[(currentMonth + 1) % 12]} {currentMonth === 11 ? currentYear + 1 : currentYear}
                          </span>
                        </div>

                        <motion.button 
                          onClick={() => navigateMonth(1)} 
                          whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-xl text-slate-600 hover:text-[#0000CD] cursor-pointer transition-colors"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </div>

                      {/* Dual Calendar Views */}
                      <div className="flex gap-8 justify-between">
                        {/* Month 1 */}
                        <div className="flex-1">
                          <div className="grid grid-cols-7 text-[11px] font-black text-slate-400 uppercase mb-3 text-center">
                            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                          </div>
                          <div className="grid grid-cols-7 gap-y-1">
                            {renderCalendarDays(currentYear, currentMonth, false)}
                          </div>
                        </div>
                        
                        {/* Month 2 (Desktop Only) */}
                        <div className="flex-1 hidden md:block">
                          <div className="grid grid-cols-7 text-[11px] font-black text-slate-400 uppercase mb-3 text-center">
                            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                          </div>
                          <div className="grid grid-cols-7 gap-y-1">
                            {renderCalendarDays(currentMonth === 11 ? currentYear + 1 : currentYear, (currentMonth + 1) % 12, true)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </div>
        </motion.div>

        </div>
      </header>
{/* Main content body */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">

      </main>

      {/* Sign In Modal */}
      <AnimatePresence>
        {isSignInModalOpen && (
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
                onClick={() => setIsSignInModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-sm rounded-full transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              {/* Left Form Section */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative z-10">
                {/* Logo */}
                <div className="text-xl font-black tracking-widest text-[#0000CD] mb-5 flex items-center gap-1.5">
                  <Menu size={24} className="text-[#0000CD]" />
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
                      className="w-full px-3 py-2.5 bg-transparent border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0000CD] focus:ring-1 focus:ring-[#0000CD] transition-colors font-medium text-sm"
                    />
                  </div>
                  
                  <button className="w-full bg-[#0000CD] hover:bg-blue-700 text-white font-extrabold py-3 rounded-lg transition-colors cursor-pointer shadow-md shadow-[#0000CD]/30 text-sm">
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
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-[#0000CD] bg-[#0000CD] transition-colors shrink-0">
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

              {/* Right Image Section */}
              <div className="hidden md:flex md:w-[45%] p-4 pl-0 relative items-stretch justify-center z-0">
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop" 
                  alt="Travel Street" 
                  className="w-full h-[100%] object-cover rounded-[18px] shadow-lg border border-black/5"
                />
                {/* Floating Badge (overflows slightly right) */}
                <div className="absolute top-[50%] -right-6 -translate-y-1/2 w-[85px] h-[85px] bg-[#8be6c5] rounded-full flex items-center justify-center shadow-lg border-[5px] border-[#f1f5f9] z-50">
                  <div className="relative">
                    <User size={30} className="text-slate-900" strokeWidth={2.5} />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-900 rounded-full border-[1.5px] border-[#8be6c5]"></div>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#0000CD] font-bold tracking-widest text-sm cursor-pointer">
            TRAVEL<span className="text-slate-800">IQ</span>
          </div>
          <div className="flex gap-6 cursor-pointer">
            <a href="#stays" className="hover:text-[#0000CD] transition-colors cursor-pointer">Stays</a>
            <a href="#flights" className="hover:text-[#0000CD] transition-colors cursor-pointer">Flights</a>
            <a href="#packages" className="hover:text-[#0000CD] transition-colors cursor-pointer">Packages</a>
          </div>
          <div className="text-slate-400">
            © 2026 TravelIQ. All rights reserved. Built using React and Tailwind CSS.
          </div>
        </div>
      </footer>

      </div>
    </div>
  )
}

export default App
