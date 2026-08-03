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
  Plus,
  Sparkles,
  Globe2,
  Compass,
  FileText
} from 'lucide-react'
import heroVideo from './assets/create_a_video_for_my_website (1).mp4'
import RegisterPage from './RegisterPage';
import heroImg from './assets/Gemini_Generated_Image_hxqmh7hxqmh7hxqm.png'
import FeaturedHotels from './FeaturedHotels';
import FeaturedFlights from './FeaturedFlights';
import FeaturedTours from './FeaturedTours';
import Footer from './Footer';
import SettingsModal from './components/SettingsModal';
import SignInModal from './components/SignInModal';

const Flag = ({ code, className }) => {
  if (!code) return null;
  return (
    <img 
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} 
      alt={`${code} flag`} 
      className={className} 
    />
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('EN')
  const [region, setRegion] = useState('US')
  const [country, setCountry] = useState('United States')
  const [activeCategory, setActiveCategory] = useState('flights')
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isRegisterPageOpen, setIsRegisterPageOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [settingsTab, setSettingsTab] = useState('Languages') // 'Languages' or 'Currency'
  const [selectedLanguage, setSelectedLanguage] = useState({ name: 'English (Pakistan)', code: 'PK', isGlobe: false })
  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'PKR', symbol: 'Rs' })

  const languagesList = [
    { name: 'English (Pakistan)', code: 'PK' },
    { name: '繁體中文', code: 'TW' },
    { name: '日本語', code: 'JP' },
    { name: '한국어', code: 'KR' },
    { name: 'ภาษาไทย', code: 'TH' },
    { name: 'Українська', code: 'UA' },
    { name: 'العربية', code: 'SA', isGlobe: true },
    { name: 'Bahasa Indonesia', code: 'ID' },
    { name: 'Bahasa Melayu', code: 'MY' },
    { name: 'Dansk', code: 'DK' },
    { name: 'Deutsch', code: 'DE' },
    { name: 'English', code: 'GB', isGlobe: true },
    { name: 'Español', code: 'ES' },
    { name: 'Français', code: 'FR' },
    { name: 'Italiano', code: 'IT' },
    { name: 'Nederlands', code: 'NL' },
    { name: 'Polski', code: 'PL' },
    { name: 'Português (Brasil)', code: 'BR' },
    { name: 'Suomi', code: 'FI' },
    { name: 'Svenska', code: 'SE' },
    { name: 'Tiếng Việt', code: 'VN' },
    { name: 'Türkçe', code: 'TR' },
    { name: 'Ελληνικά', code: 'GR' },
    { name: 'Русский', code: 'RU' }
  ];

  const currenciesList = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
  ];

  const [tripType, setTripType] = useState('round-trip') // one-way, round-trip, multi-city
  const [isHeartHovered, setIsHeartHovered] = useState(false)

  // Search form states
  const [fromCity, setFromCity] = useState('Lahore (All)')
  const [toCity, setToCity] = useState('')
  const [directOnly, setDirectOnly] = useState(false)
  const [passengers, setPassengers] = useState('1 Adult')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [infants, setInfants] = useState(0)
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

  // Lock body scroll when calendar is open
  useEffect(() => {
    if (isCalendarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCalendarOpen]);

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

    const servicesDropdown = [
    { title: 'Tours', subtitle: 'Booking', icon: Compass },
    { title: 'Cars', subtitle: 'Booking', icon: Car },
    { title: 'Visa', subtitle: 'Booking', icon: FileText },
    { title: 'Flights', subtitle: 'Booking', icon: Plane },
    { title: 'Umrah', subtitle: 'Booking', icon: Building2 },
    { title: 'Esim', subtitle: 'Booking', icon: Smartphone },
    { title: 'Ferries', subtitle: 'Booking', icon: Ship },
    { title: 'Stays', subtitle: 'Booking', icon: BedDouble },
  ];

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
              className="absolute inset-0 bg-rose-50" 
            />
          )}
          {isDepart && returnDate && <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-rose-50" />}
          {isReturn && departDate && <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-rose-50" />}
          
          {/* Magical Flight Animation using layoutId */}
          {((!returnDate && isDepart) || (returnDate && isReturn)) && (
            <motion.div
              layoutId="flight-plane"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute -top-3 -right-2 text-[#E11D48] z-30 drop-shadow-[0_4px_8px_rgba(225,29,72,0.4)] pointer-events-none"
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
                ? 'bg-[#E11D48] text-white shadow-[0_4px_12px_rgba(225,29,72,0.4)] ring-[3px] ring-white' 
                : 'hover:bg-rose-50 text-slate-700 hover:text-[#E11D48]'
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#E11D48] selection:text-white flex relative overflow-x-hidden">
      {isRegisterPageOpen && <RegisterPage onClose={() => setIsRegisterPageOpen(false)} />}

      
      {/* Main Content Wrapper */}
      <div className="flex-1 w-full min-w-0 flex flex-col min-h-screen">

      {/* Hero section with video background (Dynamic height) */}
      <header className="relative w-full min-h-[600px] flex flex-col z-10 transition-all duration-500 pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <video 
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={heroVideo}
            poster={heroImg}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay gradient to ensure text readability over the video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        </div>

        {/* Solid Navbar matching screenshot */}
        <nav className="relative z-50 px-2 sm:px-4 md:px-8 py-3 sm:py-4 flex items-center justify-between mx-auto w-full shrink-0 bg-[#EBEBEB] shadow-sm border-b border-slate-200/60">
          {/* Left side: Logo */}
          <div className="flex items-center gap-4">
            <span className="text-xl sm:text-2xl font-black tracking-[0.15em] text-[#E11D48] cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              TRAVEL<span className="text-slate-900 tracking-[0.15em]">IQ</span>
            </span>
          </div>

          {/* Center side: Links (Little big as requested) */}
          <div className="hidden md:flex items-center gap-12">
            
            {/* Services Dropdown */}
            <div className="relative group py-4">
              <a href="#" className="text-[15px] font-extrabold tracking-wide text-slate-700 group-hover:text-[#E11D48] transition-colors flex items-center gap-1.5 relative">
                Services
                <ChevronDown size={16} className="text-slate-500 group-hover:text-[#E11D48] transition-transform duration-300 group-hover:rotate-180" strokeWidth={3} />
                <span className="absolute left-1/2 -bottom-[16px] w-0 h-[3px] bg-[#E11D48] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 rounded-full"></span>
              </a>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[750px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {servicesDropdown.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a key={idx} href="#" className="flex items-center gap-4 p-3.5 rounded-[14px] hover:bg-slate-50 transition-colors group/item relative overflow-hidden">
                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/0 via-rose-50/50 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="w-[46px] h-[46px] rounded-[12px] bg-slate-100 text-slate-600 flex justify-center items-center group-hover/item:bg-[#E11D48] group-hover/item:text-white transition-all duration-300 shadow-sm group-hover/item:shadow-[0_4px_12px_rgba(225,29,72,0.3)] z-10 shrink-0">
                            <Icon size={22} strokeWidth={2} />
                          </div>
                          
                          <div className="flex flex-col z-10">
                            <span className="font-extrabold text-slate-800 text-[15px] group-hover/item:text-[#E11D48] transition-colors">
                              {item.title}
                            </span>
                            <span className="font-bold text-slate-400 text-[12px]">
                              {item.subtitle}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Links */}
            {['Blog', 'About Us'].map(link => (
              <div key={link} className="relative group py-4">
                <a href="#" className="text-[15px] font-extrabold tracking-wide text-slate-700 group-hover:text-[#E11D48] transition-colors relative">
                  {link}
                  <span className="absolute left-1/2 -bottom-[16px] w-0 h-[3px] bg-[#E11D48] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 rounded-full"></span>
                </a>
              </div>
            ))}
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-5">
            
            {/* Currency Button */}
            <button 
              onClick={() => { setIsSettingsModalOpen(true); setSettingsTab('Currency'); }}
              className="flex items-center gap-1 px-1.5 sm:px-2 py-2 bg-transparent hover:bg-slate-200/70 text-slate-800 font-extrabold text-[13px] sm:text-[15px] rounded-[10px] transition-all cursor-pointer"
            >
              {selectedCurrency.code}
            </button>

            {/* Language Button */}
            <button 
              onClick={() => { setIsSettingsModalOpen(true); setSettingsTab('Languages'); }}
              className="flex items-center gap-1 px-2 py-2 bg-transparent hover:bg-slate-200/70 text-slate-700 font-bold text-[14px] rounded-[10px] transition-all cursor-pointer"
            >
              <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-300 shadow-sm bg-white">
                {selectedLanguage.isGlobe ? (
                  <Globe2 size={16} className="text-blue-600" strokeWidth={2.5} />
                ) : (
                  <Flag code={selectedLanguage.code} className="w-full h-full object-cover" />
                )}
              </div>
            </button>

            {/* Sign In Button */}
            <button 
              onClick={() => setIsSignInModalOpen(true)}
              className="px-2 py-1.5 sm:px-6 sm:py-2.5 rounded-none bg-[#D4D6DB] hover:bg-slate-300 text-slate-800 font-extrabold text-[12px] sm:text-[15px] whitespace-nowrap transition-all cursor-pointer shadow-sm"
            >
              Sign In
            </button>

            {/* Register Button */}
            <button 
              onClick={() => setIsRegisterPageOpen(true)}
              className="px-2.5 py-1.5 sm:px-6 sm:py-2.5 rounded-none bg-[#E11D48] hover:bg-rose-600 text-white font-extrabold text-[12px] sm:text-[15px] whitespace-nowrap shadow-[0_4px_14px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            >
              Register
            </button>
            
          </div>
        </nav>

        {/* Main Content Wrapper */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full pb-8 pt-10">
          
          {/* Hero Content overlaid on video */}
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
            
          {/* Category Icons Selection */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex justify-start items-center gap-3 sm:gap-6 z-30 mb-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSel = activeCategory === cat.id;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <div className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[16px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSel 
                      ? 'bg-[#E11D48] text-white shadow-sm' 
                      : 'bg-[#eaeaec] text-slate-800 shadow-sm hover:bg-[#dfdfdf]'
                  }`}>
                    <IconComponent size={24} className="stroke-[2.5] fill-none" />
                  </div>
                  <span className={`text-[12px] sm:text-[14px] transition-all duration-200 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
                    isSel ? 'font-bold' : 'font-medium'
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
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-2 relative z-50"
          >
            
            
            <div className="bg-white border border-slate-100 p-1.5 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative z-10">
              <div className="bg-white rounded-[1.6rem] p-5 relative">
                
                
              
              {/* Top row: Trip Type Selector & Direct Flights */}
              <div className="flex flex-wrap items-center gap-6 mb-4 px-2">
                <div className="flex items-center gap-5">
                  {[
                    { id: 'round-trip', label: 'Return' },
                    { id: 'one-way', label: 'One-way' },
                    { id: 'multi-city', label: 'Multi-city' }
                  ].map((t) => {
                    const isActive = tripType === t.id;
                    return (
                      <label key={t.id} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isActive ? 'border-[#E11D48]' : 'border-slate-400 group-hover:border-[#E11D48]'}`}>
                          {isActive && <div className="w-2 h-2 rounded-full bg-[#E11D48]" />}
                        </div>
                        <span className={`text-[13px] transition-colors ${isActive ? 'text-slate-800 font-bold' : 'text-slate-600 group-hover:text-slate-800'}`}>{t.label}</span>
                        <input type="radio" className="hidden" checked={isActive} onChange={() => setTripType(t.id)} />
                      </label>
                    )
                  })}
                </div>
                

              </div>

              {/* Core Search Fields Row(s) */}
              <div className="space-y-3 relative z-30">
                {(tripType === 'multi-city' ? multiCityFlights : [{ id: 'single', from: fromCity, to: toCity, date: departDate }]).map((flight, index) => (
                  <div key={flight.id} className="relative flex items-stretch gap-0">
                    
                    {/* Multi-city Row Number */}
                    {tripType === 'multi-city' && (
                      <div className="w-8 bg-[#E11D48] text-white flex items-center justify-center rounded-l-[4px] font-bold text-sm shrink-0 shadow-sm mr-2">
                        {index + 1}
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row items-center gap-2 flex-1">
                      
                      {/* FROM / TO Connected Block */}
                      <div className="flex flex-col sm:flex-row flex-1 items-stretch bg-slate-50 border border-slate-200 hover:border-[#E11D48]/50 focus-within:border-[#E11D48]/60 rounded-[4px] transition-all relative w-full shadow-sm group">
                        
                        {/* FROM */}
                        <div 
                          className="flex-1 px-4 py-3 relative cursor-text group-hover:bg-white rounded-l-[4px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                          }}
                        >
                          <div className="text-[11px] font-semibold text-slate-500 mb-0.5">Leaving from</div>
                          <input 
                            type="text" 
                            placeholder="Origin city" 
                            value={tripType === 'multi-city' ? flight.from : fromCity}
                            onChange={(e) => tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', e.target.value) : setFromCity(e.target.value)}
                            className="bg-transparent text-sm font-bold text-slate-800 w-full focus:outline-none placeholder-slate-300" 
                          />
                          {/* FROM Dropdown */}
                          <AnimatePresence>
                            {activeDropdown?.type === 'from' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-[110%] left-0 w-[300px] sm:w-[420px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-5 z-[100] border border-slate-100"
                              >
                                <div className="text-sm font-bold text-slate-800 mb-3 px-1">Popular cities</div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2">
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
                                          ? 'bg-[#E11D48]/10 text-[#E11D48] font-bold shadow-[0_4px_12px_rgba(225,29,72,0.15)] ring-1 ring-white'
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
                        
                        {/* Swap Button */}
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
                            className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:bg-white flex items-center justify-center text-[#E11D48] transition-all cursor-pointer group/swap z-20"
                          >
                            <ArrowLeftRight size={13} className="group-hover/swap:rotate-180 transition-transform duration-300" />
                          </button>
                        </div>
  
                        <div className="w-full h-[1px] sm:w-[1px] sm:h-8 bg-slate-200 block sm:hidden lg:block"></div>
  
                        {/* TO */}
                        <div 
                          className="flex-1 px-4 py-3 relative cursor-text group-hover:bg-white rounded-r-[4px] lg:pl-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                          }}
                        >
                          <div className="text-[11px] font-semibold text-slate-500 mb-0.5">Going to</div>
                          <input 
                            type="text" 
                            placeholder="Destination city" 
                            value={tripType === 'multi-city' ? flight.to : toCity}
                            onChange={(e) => tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', e.target.value) : setToCity(e.target.value)}
                            className="bg-transparent text-sm font-bold text-slate-800 w-full focus:outline-none placeholder-slate-300" 
                          />
                          {/* TO Dropdown */}
                          <AnimatePresence>
                            {activeDropdown?.type === 'to' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-[110%] left-0 lg:left-6 w-[300px] sm:w-[420px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-5 z-[100] border border-slate-100"
                              >
                                <div className="text-sm font-bold text-slate-800 mb-3 px-1">Popular cities</div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2">
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
                                          ? 'bg-[#E11D48]/10 text-[#E11D48] font-bold shadow-[0_4px_12px_rgba(225,29,72,0.15)] ring-1 ring-white'
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
  
                      {/* DATES Field */}
                      <div className="flex-[0.8] w-full lg:w-auto">
                        <div 
                          onClick={() => { setCalendarTarget(tripType === 'multi-city' ? { type: 'multi', index } : { type: 'depart', index: null }); setIsCalendarOpen(true); }}
                          className="flex items-center bg-slate-50 border border-slate-200 hover:border-[#E11D48]/50 rounded-[4px] px-4 h-[58px] transition-all shadow-sm cursor-pointer hover:bg-white justify-between"
                        >
                          {tripType === 'round-trip' ? (
                            <div className="flex items-center justify-center w-full gap-3 text-[13px] font-bold text-slate-800">
                              <span>{formatDateString(departDate) || 'Choose date'}</span>
                              <span className="text-slate-300 font-normal">—</span>
                              <span>{formatDateString(returnDate) || 'Choose date'}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-start w-full gap-2 text-[13px] font-bold text-slate-800">
                              <span className={!(tripType === 'multi-city' ? flight.date : departDate) ? 'text-slate-400' : ''}>
                                {(tripType === 'multi-city' ? flight.date : departDate) ? formatDateString(tripType === 'multi-city' ? flight.date : departDate) : 'Choose date'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* PASSENGERS Field */}
                      {(index === 0 || tripType !== 'multi-city') && (
                        <div className="flex-[0.6] w-full lg:w-auto relative group/passclass h-[58px]">
                           <div className="flex items-center justify-between bg-slate-50 border border-slate-200 hover:border-[#E11D48]/50 rounded-[4px] px-4 h-full transition-all shadow-sm cursor-pointer hover:bg-white">
                             <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 whitespace-nowrap">
                               <User size={14} className="text-slate-600" />
                               <span>{(adults + children + infants)} {(adults + children + infants) === 1 ? 'adult' : 'travelers'} &middot; {travelClass}</span>
                             </div>
                             <ChevronDown size={14} className="text-slate-400 group-hover/passclass:rotate-180 transition-transform ml-2" />
                           </div>
                           
                           <div className="absolute right-0 mt-2 w-[300px] sm:w-[340px] bg-[#eaeaec] border border-slate-200 rounded-xl shadow-xl p-0 opacity-0 scale-95 pointer-events-none group-hover/passclass:opacity-100 group-hover/passclass:scale-100 group-hover/passclass:pointer-events-auto transition-all duration-200 z-50 overflow-hidden">
                             <div className="p-5 pb-4">
                               <div className="text-[14px] font-bold text-slate-900 mb-4">Travelers</div>
                               
                               <div className="flex items-center justify-between mb-4">
                                 <div>
                                   <div className="text-[14px] text-slate-700">Adults <span className="text-slate-500">18+</span></div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">-</button>
                                   <span className="w-4 text-center font-bold text-[15px]">{adults}</span>
                                   <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">+</button>
                                 </div>
                               </div>
                               
                               <div className="flex items-center justify-between mb-4">
                                 <div>
                                   <div className="text-[14px] text-slate-700">Children <span className="text-slate-500">0-17</span></div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <button onClick={() => {
                                      const newCount = Math.max(0, children - 1);
                                      setChildren(newCount);
                                      setChildAges(prev => prev.slice(0, newCount));
                                   }} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">-</button>
                                   <span className="w-4 text-center font-bold text-[15px]">{children}</span>
                                   <button onClick={() => {
                                      const newCount = children + 1;
                                      setChildren(newCount);
                                      setChildAges(prev => [...prev, '']);
                                   }} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">+</button>
                                 </div>
                               </div>

                               {/* Child Ages Dropdowns */}
                               {children > 0 && (
                                 <div className="mb-4">
                                   {childAges.map((age, idx) => (
                                     <div key={idx} className="flex items-center justify-between mt-3">
                                       <div className="text-[14px] text-slate-800">Child's age</div>
                                       <div className="relative">
                                         <select 
                                           value={age}
                                           onChange={(e) => {
                                             const newAges = [...childAges];
                                             newAges[idx] = e.target.value;
                                             setChildAges(newAges);
                                           }}
                                           className="appearance-none bg-transparent border border-slate-400/80 rounded-[8px] pl-4 pr-10 py-1.5 text-[14px] text-slate-600 focus:outline-none focus:border-slate-500 cursor-pointer min-w-[70px] shadow-sm transition-colors hover:bg-slate-50"
                                         >
                                           <option value="" disabled>Age</option>
                                           {Array.from({length: 18}).map((_, i) => (
                                             <option key={i} value={i}>{i}</option>
                                           ))}
                                         </select>
                                         <ChevronDown size={16} strokeWidth={2.5} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none" />
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               )}
                           
                               <div className="flex items-center justify-between">
                                 <div>
                                   <div className="text-[14px] text-slate-700">Infants on lap <span className="text-slate-500">under 2</span></div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">-</button>
                                   <span className="w-4 text-center font-bold text-[15px]">{infants}</span>
                                   <button onClick={() => setInfants(infants + 1)} className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">+</button>
                                 </div>
                               </div>
                             </div>
                           
                             <div className="h-[1px] bg-slate-300 w-full opacity-60"></div>
                           
                             <div className="p-5 pt-4">
                               <div className="text-[14px] font-bold text-slate-900 mb-3">Cabin Class</div>
                               <div className="flex flex-wrap gap-2">
                                 {['Economy', 'Premium Economy', 'Business', 'First'].map((opt) => (
                                   <button 
                                     key={opt} 
                                     onClick={() => setTravelClass(opt)} 
                                     className={`px-3 py-1.5 text-[14px] rounded-lg border transition-all cursor-pointer ${travelClass === opt ? 'border-slate-800 text-slate-800 bg-slate-200/50' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}
                                   >
                                     {opt}
                                   </button>
                                 ))}
                               </div>
                             </div>
                           </div>
                        </div>
                      )}
                      
                      {tripType === 'multi-city' && index > 0 && (
                        <div className="flex-[0.6] w-full lg:w-auto flex items-center justify-end pr-2">
                          <button onClick={() => handleRemoveMultiCityFlight(index)} className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                            <X size={18} />
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>
              
              {/* Multi-city Add Row Button */}
              {tripType === 'multi-city' && (
                <div className="mt-4 w-full">
                  <button onClick={handleAddMultiCityFlight} className="w-full flex items-center justify-center gap-2 py-3 rounded-[4px] border border-dashed border-[#E11D48]/40 text-[#E11D48] hover:bg-[#E11D48]/5 hover:border-[#E11D48] font-bold transition-all cursor-pointer text-sm">
                    <Plus size={16} strokeWidth={2.5} />
                    Add another flight
                  </button>
                </div>
              )}

              {/* Bottom row: Search Button Area */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-end gap-3 z-20 relative">
                 <button className="w-full md:w-auto px-10 py-3 bg-[#E11D48] hover:bg-rose-600 text-white font-extrabold text-[15px] rounded-[4px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer relative group">
                   <Search size={18} strokeWidth={2.5} />
                   <span>Search</span>
                 </button>
              </div>

              {/* Calendar Dropdown Rendered Here (Floating globally below the panel) */}
              <AnimatePresence>
                {isCalendarOpen && (
                    <motion.div
                      key="calendar-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 bg-black/20 z-[190] backdrop-blur-[2px]"
                      onClick={() => setIsCalendarOpen(false)}
                    />
                )}
                {isCalendarOpen && (
                    <motion.div
                      key="calendar-modal"
                      ref={calendarRef}
                      initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
                      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
                      transition={{ duration: 0.2 }}
                      className="fixed left-1/2 top-1/2 z-[200] bg-[#f2f3f5] rounded-[24px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-[95%] max-w-[800px] flex flex-col overflow-y-auto overflow-x-hidden max-h-[90vh] cursor-default border border-slate-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                    {/* Header Inputs (Mimicking the underlying fields for context) */}
                    {tripType !== 'multi-city' && (
                      <div className="flex bg-[#e2e8f0]/50 p-2 rounded-t-[24px]">
                         <div 
                           onClick={() => setCalendarTarget({ type: 'depart', index: null })}
                           className={`flex-1 p-3 mx-1 rounded-[16px] cursor-pointer border-[2px] transition-all duration-300 ${calendarTarget.type === 'depart' ? 'border-[#E11D48] bg-white shadow-sm' : 'border-transparent hover:bg-slate-200/60'}`}
                         >
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Depart</div>
                           <div className="text-base font-extrabold text-slate-800">{formatDateString(departDate)}</div>
                         </div>
                         <div 
                           onClick={() => setCalendarTarget({ type: 'return', index: null })}
                           className={`flex-1 p-3 mx-1 rounded-[16px] cursor-pointer border-[2px] transition-all duration-300 ${calendarTarget.type === 'return' ? 'border-[#E11D48] bg-white shadow-sm' : 'border-transparent hover:bg-slate-200/60'}`}
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
                          className="p-2 rounded-xl text-slate-600 hover:text-[#E11D48] cursor-pointer transition-colors"
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
                          className="p-2 rounded-xl text-slate-600 hover:text-[#E11D48] cursor-pointer transition-colors"
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
      <main className="w-full flex-1 flex flex-col z-10 bg-white">
        <FeaturedHotels />
        <FeaturedFlights />
        <FeaturedTours />
      </main>

            {/* Settings (Language/Currency) Modal */}
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        tab={settingsTab}
        setTab={setSettingsTab}
        languagesList={languagesList}
        currenciesList={currenciesList}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />

      <Footer />

      </div>
    </div>
  )
}

export default App

