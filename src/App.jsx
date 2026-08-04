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
  Minus,
  Plus,
  Map as MapIcon,
  Award,
  Smartphone,
  User,
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

  const carLocationSuggestions = [
    { type: 'city', name: 'Denver, Colorado, United States', subtitle: 'United States', searchStr: 'denver colorado usa' },
    { type: 'city', name: 'Dallas, Texas, United States', subtitle: 'United States', searchStr: 'dallas texas usa' },
    { type: 'city', name: 'Lahore, Pakistan', subtitle: 'Pakistan', searchStr: 'lahore pakistan' },
    { type: 'city', name: 'Dubai, United Arab Emirates', subtitle: 'United Arab Emirates', searchStr: 'dubai uae united arab emirates' },
    { type: 'city', name: 'London, United Kingdom', subtitle: 'United Kingdom', searchStr: 'london uk united kingdom' },
    
    { type: 'airport', name: 'Denver Intl', code: 'DEN', subtitle: 'Denver, Colorado, United States', searchStr: 'denver intl den' },
    { type: 'airport', name: 'Dallas/Fort Worth', code: 'DFW', subtitle: 'Dallas, Texas, United States', searchStr: 'dallas fort worth dfw' },
    { type: 'airport', name: 'Allama Iqbal Intl', code: 'LHE', subtitle: 'Lahore, Pakistan', searchStr: 'allama iqbal lhe lahore' },
    { type: 'airport', name: 'Dubai Intl', code: 'DXB', subtitle: 'Dubai, United Arab Emirates', searchStr: 'dubai dxb' },
    { type: 'airport', name: 'Heathrow', code: 'LHR', subtitle: 'London, United Kingdom', searchStr: 'heathrow lhr london' }
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
  const [rooms, setRooms] = useState(1)
  const [petFriendly, setPetFriendly] = useState(false)
  const [nationality, setNationality] = useState('United Arab Emirates')
  const [nationalitySearch, setNationalitySearch] = useState('')
  const [carDropoffMode, setCarDropoffMode] = useState('same') // 'same' or 'different'
  const [carPickupLocation, setCarPickupLocation] = useState('')
  const [carDropoffLocation, setCarDropoffLocation] = useState('')
  const [carActiveDropdown, setCarActiveDropdown] = useState(null)
  const [carPickupTime, setCarPickupTime] = useState('Noon')
  const [carDropoffTime, setCarDropoffTime] = useState('Noon')
  
  // Packages states
  const [packageFrom, setPackageFrom] = useState('')
  const [packageTo, setPackageTo] = useState('')
  const [packageAdults, setPackageAdults] = useState(2)
  const [packageChildren, setPackageChildren] = useState(1)
  const [packageChildAges, setPackageChildAges] = useState(['10 years'])

  const carTimeOptions = [
    '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', 'Noon', 
    '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm',
    '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm'
  ];

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

  const alphabetCities = [
    { name: 'Amsterdam', code: 'AMS', country: 'Netherlands' },
    { name: 'Berlin', code: 'BER', country: 'Germany' },
    { name: 'Chicago', code: 'ORD', country: 'United States' },
    { name: 'Dubai', code: 'DXB', country: 'United Arab Emirates' },
    { name: 'Edinburgh', code: 'EDI', country: 'United Kingdom' },
    { name: 'Frankfurt', code: 'FRA', country: 'Germany' },
    { name: 'Geneva', code: 'GVA', country: 'Switzerland' },
    { name: 'Helsinki', code: 'HEL', country: 'Finland' },
    { name: 'Istanbul', code: 'IST', country: 'Turkey' },
    { name: 'Jakarta', code: 'CGK', country: 'Indonesia' },
    { name: 'Kyoto', code: 'UKY', country: 'Japan' },
    { name: 'London', code: 'LHR', country: 'United Kingdom' },
    { name: 'Madrid', code: 'MAD', country: 'Spain' },
    { name: 'New York', code: 'JFK', country: 'United States' },
    { name: 'Oslo', code: 'OSL', country: 'Norway' },
    { name: 'Paris', code: 'CDG', country: 'France' },
    { name: 'Quito', code: 'UIO', country: 'Ecuador' },
    { name: 'Rome', code: 'FCO', country: 'Italy' },
    { name: 'Seoul', code: 'ICN', country: 'South Korea' },
    { name: 'Tokyo', code: 'HND', country: 'Japan' },
    { name: 'Ushuaia', code: 'USH', country: 'Argentina' },
    { name: 'Vienna', code: 'VIE', country: 'Austria' },
    { name: 'Warsaw', code: 'WAW', country: 'Poland' },
    { name: 'Xiamen', code: 'XMN', country: 'China' },
    { name: 'Yangon', code: 'RGN', country: 'Myanmar' },
    { name: 'Zurich', code: 'ZRH', country: 'Switzerland' }
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
      
      // Close dropdowns if clicking anywhere outside
      setActiveDropdown(null);
      setCarActiveDropdown(null);
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
      setIsCalendarOpen(false);
      return;
    }
    
    if (calendarTarget.type === 'depart') {
      setDepartDate(selected);
      if (returnDate && selected > returnDate) {
        setReturnDate(changeDateByDays(selected, 3));
      }
      if (tripType === 'round-trip') {
        setCalendarTarget({ type: 'return', index: null });
      } else {
        setIsCalendarOpen(false);
      }
    } else {
      if (departDate && selected < departDate) {
        setDepartDate(selected);
        setCalendarTarget({ type: 'return', index: null });
      } else {
        setReturnDate(selected);
        setIsCalendarOpen(false);
      }
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
      <header className="relative w-full min-h-[600px] flex flex-col z-[100] transition-all duration-500 pb-12">
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
            
            {/* Currency Dropdown */}
            <div className="relative group/curr flex items-center h-full">
              <button className="flex items-center gap-1 px-1.5 sm:px-2 py-2 bg-transparent group-hover/curr:bg-slate-200/70 text-slate-800 font-extrabold text-[13px] sm:text-[15px] rounded-[10px] transition-all cursor-pointer">
                {selectedCurrency.code}
              </button>
              
              <div className="absolute top-full right-0 pt-2 w-[340px] opacity-0 scale-95 pointer-events-none group-hover/curr:opacity-100 group-hover/curr:scale-100 group-hover/curr:pointer-events-auto transition-all duration-200 z-[100] origin-top-right">
                <div className="bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 p-4">
                  <div className="text-sm font-bold text-slate-900 mb-3 px-2">Select Currency</div>
                  <div className="grid grid-cols-2 gap-2">
                    {currenciesList.map(curr => (
                      <button 
                        key={curr.code}
                        onClick={() => setSelectedCurrency(curr)}
                        className={`flex flex-col justify-center px-3 py-2 rounded-lg transition-colors text-left ${selectedCurrency.code === curr.code ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                      >
                        <span className={`text-[13px] ${selectedCurrency.code === curr.code ? 'font-bold text-[#E11D48]' : 'font-bold text-slate-800'}`}>{curr.code} - {curr.symbol}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{curr.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="relative group/lang flex items-center h-full">
              <button className="flex items-center gap-1 px-2 py-2 bg-transparent group-hover/lang:bg-slate-200/70 text-slate-700 font-bold text-[14px] rounded-[10px] transition-all cursor-pointer">
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-300 shadow-sm bg-white">
                  {selectedLanguage.isGlobe ? (
                    <Globe2 size={16} className="text-blue-600" strokeWidth={2.5} />
                  ) : (
                    <Flag code={selectedLanguage.code} className="w-full h-full object-cover" />
                  )}
                </div>
              </button>

              <div className="absolute top-full right-0 pt-2 w-[480px] opacity-0 scale-95 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:scale-100 group-hover/lang:pointer-events-auto transition-all duration-200 z-[100] origin-top-right">
                <div className="bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 p-4">
                  <div className="text-sm font-bold text-slate-900 mb-3 px-2">Select Language</div>
                  <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {languagesList.map(lang => (
                      <button 
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${selectedLanguage.code === lang.code ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                      >
                        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-white flex items-center justify-center">
                          {lang.isGlobe ? <Globe2 size={12} className="text-blue-600" /> : <Flag code={lang.code} className="w-full h-full object-cover" />}
                        </div>
                        <span className={`text-[12px] ${selectedLanguage.code === lang.code ? 'font-bold text-[#E11D48]' : 'font-medium text-slate-700'}`}>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
                  <div className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[16px] flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:rounded-full ${
                    isSel 
                      ? 'bg-[#E11D48] text-white shadow-sm' 
                      : 'bg-[#eaeaec] text-slate-800 shadow-sm hover:bg-[#dfdfdf]'
                  }`}>
                    <IconComponent size={24} className="stroke-[2.5] fill-none transition-transform duration-300 group-hover:rotate-[15deg]" />
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
                
                
              
              {activeCategory === 'flights' && (
                <>
              {/* Top row: Trip Type Selector & Direct Flights */}
              <div className="flex flex-wrap items-center gap-6 mb-4 px-2">
                <div className="flex items-center gap-5">
                  {[
                    { id: 'round-trip', label: 'Roundtrip' },
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
                            onChange={(e) => {
                              tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', e.target.value) : setFromCity(e.target.value);
                              setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                            }}
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
                                <div className="text-sm font-bold text-slate-800 mb-3 px-1">
                                  {(tripType === 'multi-city' ? flight.from : fromCity) ? 'Suggestions' : 'Popular cities'}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2">
                                  {popularCities.filter(c => c.toLowerCase().includes((tripType === 'multi-city' ? flight.from : fromCity).toLowerCase())).map((city, idx) => (
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
                            onChange={(e) => {
                              tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', e.target.value) : setToCity(e.target.value);
                              setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                            }}
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
                                <div className="text-sm font-bold text-slate-800 mb-3 px-1">
                                  {(tripType === 'multi-city' ? flight.to : toCity) ? 'Suggestions' : 'Popular cities'}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2">
                                  {popularCities.filter(c => c.toLowerCase().includes((tripType === 'multi-city' ? flight.to : toCity).toLowerCase())).map((city, idx) => (
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
                           
                           <div className="absolute right-0 top-full pt-2 w-[300px] sm:w-[340px] z-50 opacity-0 scale-95 pointer-events-none group-hover/passclass:opacity-100 group-hover/passclass:scale-100 group-hover/passclass:pointer-events-auto transition-all duration-200 origin-top-right">
                             <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-0 overflow-hidden">
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

                </>
              )}

              {activeCategory === 'stays' && (
                <>
                  {/* Top row: Nationality Selector */}
                  <div className="flex flex-wrap items-center gap-6 mb-4 px-2">
                    <div className="relative group/nat z-50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-50 border border-slate-200 rounded-full text-[14px] font-bold text-slate-800 transition-all cursor-pointer shadow-sm">
                        {nationality}
                        <ChevronDown size={16} className="text-slate-500" />
                      </button>
                      
                      <div className="absolute top-full left-0 pt-2 w-[320px] opacity-0 scale-95 pointer-events-none group-hover/nat:opacity-100 group-hover/nat:scale-100 group-hover/nat:pointer-events-auto transition-all duration-200 origin-top-left">
                        <div className="bg-[#EBEBEB] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200/60 p-2 flex flex-col">
                          <div className="px-3 py-3 border-b border-slate-300/50 mb-2">
                            <input 
                              type="text" 
                              placeholder="Search nationality" 
                              value={nationalitySearch}
                              onChange={(e) => setNationalitySearch(e.target.value)}
                              className="w-full bg-transparent text-[14px] font-bold text-slate-700 placeholder-slate-400 focus:outline-none" 
                            />
                          </div>
                          <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400/50 flex flex-col gap-1 px-1">
                            {[
                              { name: 'United Arab Emirates', code: 'AE' },
                              { name: 'Singapore', code: 'SG' },
                              { name: 'Malaysia', code: 'MY' },
                              { name: 'Thailand', code: 'TH' },
                              { name: 'Australia', code: 'AU' },
                              { name: 'Canada', code: 'CA' },
                              { name: 'Brazil', code: 'BR' },
                              { name: 'South Africa', code: 'ZA' }
                            ].filter(n => n.name.toLowerCase().includes(nationalitySearch.toLowerCase())).map(nat => (
                              <button 
                                key={nat.code} 
                                onClick={() => setNationality(nat.name)} 
                                className="w-full flex items-center justify-between px-3 py-2.5 text-[14px] rounded-lg transition-colors cursor-pointer text-left hover:bg-slate-200/70"
                              >
                                <span className={`font-medium ${nationality === nat.name ? 'text-[#E11D48] font-bold' : 'text-slate-700'}`}>{nat.name}</span>
                                <span className="text-[12px] text-slate-400">{nat.code}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-30 flex flex-col lg:flex-row items-stretch bg-[#F0F2F4] border border-slate-200 transition-all w-full shadow-sm p-1.5 lg:p-2 gap-1 lg:gap-2">
                  {/* Destination */}
                  <div 
                    className="flex-1 lg:flex-[1.2] px-5 py-3.5 relative cursor-text hover:bg-slate-200/60 flex items-center gap-3 transition-colors border-2 border-transparent focus-within:border-slate-300 dropdown-container"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown({ type: 'stays-to', index: 'single' });
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <MapPin size={22} className="text-slate-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Where to?" 
                      value={toCity}
                      onChange={(e) => {
                        setToCity(e.target.value);
                        setActiveDropdown({ type: 'stays-to', index: 'single' });
                      }}
                      className="bg-transparent text-[14px] lg:text-[15px] font-bold text-slate-800 w-full focus:outline-none placeholder-slate-400 truncate" 
                    />
                    {/* TO Dropdown */}
                    <AnimatePresence>
                      {activeDropdown?.type === 'stays-to' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="absolute top-[110%] left-0 w-[300px] sm:w-[420px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-5 z-[100] border border-slate-100"
                        >
                          <div className="text-sm font-bold text-slate-800 mb-3 px-1">
                            {toCity ? 'Suggestions' : 'Popular cities'}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2">
                            {popularCities.filter(c => c.toLowerCase().includes(toCity.toLowerCase())).map((city, idx) => (
                              <motion.div
                                key={city}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: idx * 0.02, duration: 0.25, ease: "easeOut" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setToCity(city);
                                  setActiveDropdown(null);
                                }}
                                className={`px-2 py-2 text-[13px] cursor-pointer rounded-lg transition-colors flex items-center ${
                                  toCity === city
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

                  <div className="w-full h-[1px] lg:w-[1px] lg:h-10 lg:my-auto bg-slate-200 block shrink-0 hidden lg:block"></div>

                  {/* Dates */}
                  <div 
                    onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                    className="flex-[1.2] lg:flex-[1.6] px-5 py-3.5 relative cursor-pointer hover:bg-slate-200/60 flex items-center gap-3 overflow-hidden transition-colors"
                  >
                    <CalendarDays size={22} className="text-slate-500 shrink-0" />
                    <div className="flex items-center gap-2 text-[14px] lg:text-[15px] font-bold text-slate-800 w-full whitespace-nowrap overflow-hidden">
                      <span className="truncate">{formatDateString(departDate)}</span>
                      <span className="text-slate-400 font-normal shrink-0">-</span>
                      <span className="truncate">{formatDateString(returnDate)}</span>
                      <span className="ml-auto text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-[4px] font-bold shrink-0">
                        {Math.max(1, Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24)))} night{Math.max(1, Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24))) > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] lg:w-[1px] lg:h-10 lg:my-auto bg-slate-200 block shrink-0 hidden lg:block"></div>

                  {/* Guests / Rooms */}
                  <div className="flex-1 relative group/stayspass">
                    <div className="px-5 py-3.5 h-full cursor-pointer hover:bg-slate-200/60 flex items-center gap-3 overflow-hidden transition-colors">
                      <User size={22} className="text-slate-500 shrink-0" />
                      <div className="text-[14px] lg:text-[15px] font-bold text-slate-800 whitespace-nowrap truncate flex-1">
                        {rooms} room{rooms > 1 ? 's' : ''}, {(adults + children)} traveler{(adults + children) !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div className="absolute right-0 top-full pt-2 w-[300px] sm:w-[340px] z-50 opacity-0 scale-95 pointer-events-none group-hover/stayspass:opacity-100 group-hover/stayspass:scale-100 group-hover/stayspass:pointer-events-auto transition-all duration-200 origin-top-right">
                      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-0 overflow-hidden">
                        <div className="p-5 pb-4">
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-[15px] text-slate-800">Adults</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">-</button>
                              <span className="w-4 text-center font-bold text-[15px]">{adults}</span>
                              <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">+</button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-[15px] text-slate-800">Children</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => {
                                 const newCount = Math.max(0, children - 1);
                                 setChildren(newCount);
                                 setChildAges(prev => prev.slice(0, newCount));
                              }} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">-</button>
                              <span className="w-4 text-center font-bold text-[15px]">{children}</span>
                              <button onClick={() => {
                                 const newCount = children + 1;
                                 setChildren(newCount);
                                 setChildAges(prev => [...prev, '']);
                              }} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">+</button>
                            </div>
                          </div>

                          {/* Child Ages Dropdowns */}
                          {children > 0 && (
                            <div className="mb-4">
                              {childAges.map((age, idx) => (
                                <div key={idx} className="flex items-center justify-between mt-3">
                                  <div className="text-[15px] text-slate-800">Age of child {idx + 1}</div>
                                  <div className="relative">
                                    <select 
                                      value={age}
                                      onChange={(e) => {
                                        const newAges = [...childAges];
                                        newAges[idx] = e.target.value;
                                        setChildAges(newAges);
                                      }}
                                      className="appearance-none bg-transparent border border-slate-400/80 rounded-[8px] pl-4 pr-10 py-1.5 text-[15px] text-slate-700 focus:outline-none focus:border-slate-500 cursor-pointer min-w-[70px] shadow-sm transition-colors hover:bg-slate-50"
                                    >
                                      <option value="" disabled>0</option>
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
                              <div className="text-[15px] text-slate-800">Rooms</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">-</button>
                              <span className="w-4 text-center font-bold text-[15px]">{rooms}</span>
                              <button onClick={() => setRooms(rooms + 1)} className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors font-medium text-lg pb-0.5">+</button>
                            </div>
                          </div>
                          
                        </div>
                      
                        <div className="h-[1px] bg-slate-200 w-full mx-5 w-[calc(100%-40px)]"></div>
                      
                        <div className="p-5 flex items-center justify-between">
                          <div>
                            <div className="text-[15px] text-slate-800">Pet-friendly</div>
                            <div className="text-[13px] text-slate-500">Only show stays that allow pets</div>
                          </div>
                          <button 
                            onClick={() => setPetFriendly(!petFriendly)}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${petFriendly ? 'bg-slate-700' : 'bg-slate-400'}`}
                          >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${petFriendly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              )}

              {activeCategory === 'cars' && (
                <div className="w-full flex flex-col gap-3 relative z-30">
                  
                  {/* Top row */}
                  <div className="flex items-center px-2 mb-0.5 relative dropdown-container">
                    <button 
                      onClick={() => setCarActiveDropdown(carActiveDropdown === 'mode' ? null : 'mode')}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[14px] text-slate-700 hover:text-slate-900 transition-colors cursor-pointer group"
                    >
                      {carDropoffMode === 'same' ? 'Same drop-off' : 'Different drop-off'}
                      <ChevronDown size={14} className="text-slate-600 group-hover:text-slate-800 mt-0.5" />
                    </button>
                    
                    <AnimatePresence>
                      {carActiveDropdown === 'mode' && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="absolute top-[120%] left-2 bg-[#EBEBEB] border border-slate-200 shadow-md rounded-[8px] overflow-hidden z-50 w-[200px]"
                        >
                          <button 
                            onClick={() => { setCarDropoffMode('same'); setCarActiveDropdown(null); }}
                            className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${carDropoffMode === 'same' ? 'font-bold bg-slate-200/50' : 'text-slate-700 hover:bg-slate-200'}`}
                          >
                            Same drop-off
                          </button>
                          <button 
                            onClick={() => { setCarDropoffMode('different'); setCarActiveDropdown(null); }}
                            className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${carDropoffMode === 'different' ? 'font-bold bg-slate-200/50' : 'text-slate-700 hover:bg-slate-200'}`}
                          >
                            Different drop-off
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Main search bar */}
                  <div className="flex flex-col md:flex-row items-stretch bg-[#F0F2F4] border border-slate-200 p-1.5 transition-all w-full shadow-sm">
                    
                    <div className="flex-1 relative flex flex-col md:flex-row items-stretch w-full dropdown-container">
                      {carDropoffMode === 'same' ? (
                        <div className="flex-1 relative cursor-text">
                          <div 
                            className={`w-full h-full px-4 py-2 relative flex items-center transition-colors border ${carActiveDropdown === 'pickup' ? 'bg-[#E5E7EB] border-slate-300' : 'border-transparent hover:bg-slate-200/60'}`}
                            onClick={() => setCarActiveDropdown(carActiveDropdown === 'pickup' ? null : 'pickup')}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <input 
                              type="text" 
                              placeholder="Location" 
                              value={carPickupLocation}
                              onChange={(e) => { setCarPickupLocation(e.target.value); setCarActiveDropdown('pickup'); }}
                              className="bg-transparent text-[15px] font-medium text-slate-800 w-full focus:outline-none placeholder-slate-500 truncate" 
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col md:flex-row items-stretch relative">
                          <div className="flex-1 relative w-full">
                            <div 
                              className={`w-full h-full px-4 py-2 relative md:pr-8 flex items-center transition-colors border ${carActiveDropdown === 'pickup' ? 'bg-[#E5E7EB] border-slate-400' : 'border-slate-300 bg-[#E5E7EB]'}`}
                              onClick={() => setCarActiveDropdown(carActiveDropdown === 'pickup' ? null : 'pickup')}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <input 
                                type="text" 
                                placeholder="From" 
                                value={carPickupLocation}
                                onChange={(e) => { setCarPickupLocation(e.target.value); setCarActiveDropdown('pickup'); }}
                                className="bg-transparent text-[15px] font-medium text-slate-800 w-full focus:outline-none placeholder-slate-500 truncate" 
                              />
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              const temp = carPickupLocation;
                              setCarPickupLocation(carDropoffLocation);
                              setCarDropoffLocation(temp);
                            }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-[8px] border border-slate-300 bg-[#F0F2F4] hover:bg-slate-200 flex items-center justify-center shadow-sm cursor-pointer"
                          >
                            <ArrowLeftRight size={14} className="text-slate-600" />
                          </button>
                          
                          <div className="flex-1 relative w-full mt-2 md:mt-0">
                            <div 
                              className={`w-full h-full px-4 py-2 md:pl-8 relative flex items-center transition-colors border ${carActiveDropdown === 'dropoff' ? 'bg-[#E5E7EB] border-slate-400' : 'border-transparent hover:bg-slate-200/60'}`}
                              onClick={() => setCarActiveDropdown(carActiveDropdown === 'dropoff' ? null : 'dropoff')}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <input 
                                type="text" 
                                placeholder="To?" 
                                value={carDropoffLocation}
                                onChange={(e) => setCarDropoffLocation(e.target.value)}
                                className="bg-transparent text-[15px] font-medium text-slate-800 w-full focus:outline-none placeholder-slate-500 truncate" 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Autocomplete Dropdown */}
                      <AnimatePresence>
                        {(carActiveDropdown === 'pickup' || carActiveDropdown === 'dropoff') && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className={`absolute top-[calc(100%+4px)] ${carActiveDropdown === 'dropoff' ? 'left-auto right-0' : 'left-0'} w-full md:w-[450px] bg-[#EBEBEB] rounded-[12px] shadow-lg border border-slate-200 z-[100] overflow-hidden`}
                          >
                            <button 
                              onClick={(e) => { e.stopPropagation(); setCarActiveDropdown(null); }}
                              className="absolute top-2 right-2 p-1.5 hover:bg-slate-300 rounded-full text-slate-500 hover:text-slate-700 transition-colors z-10 cursor-pointer"
                            >
                              <X size={16} />
                            </button>
                            <div className="max-h-[400px] overflow-y-auto pb-2 relative z-0">
                              {/* Cities Section */}
                              {carLocationSuggestions.filter(item => item.type === 'city' && item.searchStr.includes((carActiveDropdown === 'pickup' ? carPickupLocation : carDropoffLocation).toLowerCase())).length > 0 && (
                                <div className="px-4 pt-4 pb-2">
                                  <div className="text-[13px] font-bold text-slate-800 mb-2">Cities (including airports)</div>
                                  
                                  {carLocationSuggestions.filter(item => item.type === 'city' && item.searchStr.includes((carActiveDropdown === 'pickup' ? carPickupLocation : carDropoffLocation).toLowerCase())).map(item => (
                                    <button 
                                      key={item.name}
                                      onClick={() => { 
                                        if (carActiveDropdown === 'pickup') setCarPickupLocation(item.name); 
                                        else setCarDropoffLocation(item.name); 
                                        setCarActiveDropdown(null); 
                                      }} 
                                      className="w-full flex items-center gap-4 px-2 py-2 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors text-left group"
                                    >
                                      <div className="w-12 h-12 rounded-xl bg-slate-300/60 flex items-center justify-center shrink-0">
                                        <MapPin size={22} className="text-slate-600" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-black">{item.name}</div>
                                        <div className="text-[13px] text-slate-500 mt-0.5">{item.subtitle}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              {/* Airports Section */}
                              {carLocationSuggestions.filter(item => item.type === 'airport' && item.searchStr.includes((carActiveDropdown === 'pickup' ? carPickupLocation : carDropoffLocation).toLowerCase())).length > 0 && (
                                <div className="px-4 pt-2 pb-2">
                                  <div className="text-[13px] font-bold text-slate-800 mb-2">Airports</div>
                                  
                                  {carLocationSuggestions.filter(item => item.type === 'airport' && item.searchStr.includes((carActiveDropdown === 'pickup' ? carPickupLocation : carDropoffLocation).toLowerCase())).map(item => (
                                    <button 
                                      key={item.code}
                                      onClick={() => { 
                                        if (carActiveDropdown === 'pickup') setCarPickupLocation(`${item.name} ${item.code}`); 
                                        else setCarDropoffLocation(`${item.name} ${item.code}`); 
                                        setCarActiveDropdown(null); 
                                      }} 
                                      className="w-full flex items-center gap-4 px-2 py-2 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors text-left group"
                                    >
                                      <div className="w-12 h-12 rounded-xl bg-slate-300/60 flex items-center justify-center shrink-0">
                                        <Plane size={22} className="text-slate-600 rotate-45" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-black">
                                          {item.name} <span className="text-slate-500 font-normal ml-1">{item.code}</span>
                                        </div>
                                        <div className="text-[13px] text-slate-500 mt-0.5">{item.subtitle}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              {carLocationSuggestions.filter(item => item.searchStr.includes((carActiveDropdown === 'pickup' ? carPickupLocation : carDropoffLocation).toLowerCase())).length === 0 && (
                                <div className="px-6 py-8 text-center text-slate-500 text-[14px]">
                                  No matches found
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="w-full h-[1px] md:w-[1px] md:h-7 md:my-auto bg-slate-300 block shrink-0 mx-1 mt-2 md:mt-0"></div>

                    {/* Dates */}
                    <div className="flex-[1.2] px-4 py-2 relative flex items-center gap-5 transition-colors">
                      <div className="flex items-center gap-3 text-[15px] text-slate-800 whitespace-nowrap">
                        <span 
                          className="font-medium cursor-pointer hover:text-slate-500 transition-colors"
                          onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                        >
                          {formatDateString(departDate).split(',')[0]} {departDate.getDate()}/{departDate.getMonth() + 1}
                        </span>
                        <div 
                          className="relative"
                          onMouseEnter={() => setCarActiveDropdown('pickup-time')}
                          onMouseLeave={() => setCarActiveDropdown(null)}
                        >
                          <span 
                            className="font-medium cursor-pointer hover:text-slate-500 transition-colors py-2"
                          >
                            {carPickupTime}
                          </span>
                          
                          <AnimatePresence>
                            {carActiveDropdown === 'pickup-time' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[320px] z-[100]"
                              >
                                <div className="bg-white rounded-[12px] shadow-lg border border-slate-200 overflow-hidden">
                                  <div className="px-4 py-3 border-b border-slate-200/60 text-[14px] font-bold text-black">
                                    Select pick-up time
                                  </div>
                                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                                    {carTimeOptions.map(time => (
                                      <button
                                        key={time}
                                        onClick={(e) => { e.stopPropagation(); setCarPickupTime(time); setCarActiveDropdown(null); }}
                                        className={`py-2 text-center rounded-[8px] text-[13px] font-bold transition-colors ${carPickupTime === time ? 'bg-[#3A4045] text-white' : 'bg-[#DDE0E3] text-[#1A1F24] hover:bg-slate-300'}`}
                                      >
                                        {time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      <span className="text-slate-400 font-normal shrink-0">-</span>
                      
                      <div className="flex items-center gap-3 text-[15px] text-slate-800 whitespace-nowrap">
                        <span 
                          className="font-medium cursor-pointer hover:text-slate-500 transition-colors"
                          onClick={() => { setCalendarTarget({ type: 'return', index: null }); setIsCalendarOpen(true); }}
                        >
                          {formatDateString(returnDate).split(',')[0]} {returnDate ? `${returnDate.getDate()}/${returnDate.getMonth() + 1}` : ''}
                        </span>
                        <div 
                          className="relative"
                          onMouseEnter={() => setCarActiveDropdown('dropoff-time')}
                          onMouseLeave={() => setCarActiveDropdown(null)}
                        >
                          <span 
                            className="font-medium cursor-pointer hover:text-slate-500 transition-colors py-2"
                          >
                            {carDropoffTime}
                          </span>
                          
                          <AnimatePresence>
                            {carActiveDropdown === 'dropoff-time' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[320px] z-[100]"
                              >
                                <div className="bg-white rounded-[12px] shadow-lg border border-slate-200 overflow-hidden">
                                  <div className="px-4 py-3 border-b border-slate-200/60 text-[14px] font-bold text-black">
                                    Select drop-off time
                                  </div>
                                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                                    {carTimeOptions.map(time => (
                                      <button
                                        key={time}
                                        onClick={(e) => { e.stopPropagation(); setCarDropoffTime(time); setCarActiveDropdown(null); }}
                                        className={`py-2 text-center rounded-[8px] text-[13px] font-bold transition-colors ${carDropoffTime === time ? 'bg-[#3A4045] text-white' : 'bg-[#DDE0E3] text-[#1A1F24] hover:bg-slate-300'}`}
                                      >
                                        {time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row checkboxes */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-2 mt-1">
                    <div className="mt-3 sm:mt-0">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] border-slate-300 text-[#006CE4] focus:ring-0 cursor-pointer accent-[#006CE4]" />
                        <span className="text-[13px] text-slate-700 group-hover:text-slate-900 transition-colors">SUVs only</span>
                      </label>
                    </div>
                  </div>

                </div>
              )}
              {activeCategory === 'packages' && (
                <div className="w-full flex flex-col gap-3 relative z-30">
                  {/* Main search bar */}
                  <div className="relative z-30 flex flex-col lg:flex-row items-stretch bg-[#F0F2F4] border border-slate-200 transition-all w-full shadow-sm p-1.5 lg:p-2 gap-1 lg:gap-2">
                    
                    {/* Location fields */}
                    <div className="flex-1 flex flex-col md:flex-row items-stretch relative">
                      <div className="flex-1 relative w-full">
                        <div 
                          className="w-full h-full px-5 py-3.5 relative cursor-text hover:bg-slate-200/60 flex items-center gap-3 transition-colors border-2 border-transparent focus-within:border-slate-300"
                          onClick={() => setActiveDropdown(activeDropdown?.type === 'package-from' ? null : { type: 'package-from' })}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <MapPin size={22} className="text-slate-500 shrink-0" />
                          <input 
                            type="text" 
                            placeholder="From" 
                            value={packageFrom}
                            onChange={(e) => { setPackageFrom(e.target.value); setActiveDropdown({ type: 'package-from' }); }}
                            className="bg-transparent text-[14px] lg:text-[15px] font-bold text-slate-800 w-full focus:outline-none placeholder-slate-400 truncate" 
                          />
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const temp = packageFrom;
                            setPackageFrom(packageTo);
                            setPackageTo(temp);
                          }}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer group/swap"
                        >
                          <ArrowLeftRight size={14} className="group-hover/swap:rotate-180 transition-transform duration-300" />
                        </button>
                      </div>

                      <div className="w-full h-[1px] md:w-[1px] md:h-8 md:my-auto bg-slate-200 block shrink-0 hidden md:block"></div>
                      
                      <div className="flex-1 relative w-full mt-2 md:mt-0">
                        <div 
                          className="w-full h-full px-5 py-3.5 pl-8 relative cursor-text hover:bg-slate-200/60 flex items-center gap-3 transition-colors border-2 border-transparent focus-within:border-slate-300"
                          onClick={() => setActiveDropdown(activeDropdown?.type === 'package-to' ? null : { type: 'package-to' })}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <MapPin size={22} className="text-slate-500 shrink-0" />
                          <input 
                            type="text" 
                            placeholder="To?" 
                            value={packageTo}
                            onChange={(e) => { setPackageTo(e.target.value); setActiveDropdown({ type: 'package-to' }) }}
                            className="bg-transparent text-[14px] lg:text-[15px] font-bold text-slate-800 w-full focus:outline-none placeholder-slate-400 truncate" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Autocomplete Dropdown for Packages */}
                    <AnimatePresence>
                      {(activeDropdown?.type === 'package-from' || activeDropdown?.type === 'package-to') && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className={`absolute top-[calc(100%+4px)] ${activeDropdown?.type === 'package-to' ? 'left-auto right-[35%]' : 'left-0'} w-full md:w-[450px] bg-[#EBEBEB] rounded-[12px] shadow-lg border border-slate-200 z-[100] overflow-hidden`}
                        >
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}
                            className="absolute top-2 right-2 p-1.5 hover:bg-slate-300 rounded-full text-slate-500 hover:text-slate-700 transition-colors z-10 cursor-pointer"
                          >
                            <X size={16} />
                          </button>
                          <div className="max-h-[400px] overflow-y-auto pb-2 relative z-0">
                            {/* Cities Section */}
                            {alphabetCities.filter(item => item.name.toLowerCase().includes((activeDropdown?.type === 'package-from' ? packageFrom : packageTo).toLowerCase())).length > 0 && (
                              <div className="px-4 pt-4 pb-2">
                                <div className="text-[13px] font-bold text-slate-800 mb-2">Cities</div>
                                
                                {alphabetCities.filter(item => item.name.toLowerCase().includes((activeDropdown?.type === 'package-from' ? packageFrom : packageTo).toLowerCase())).map(item => (
                                  <button 
                                    key={item.name}
                                    onClick={() => { 
                                      if (activeDropdown?.type === 'package-from') setPackageFrom(item.name); 
                                      else setPackageTo(item.name); 
                                      setActiveDropdown(null); 
                                    }} 
                                    className="w-full flex items-center gap-4 px-2 py-2 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors text-left group"
                                  >
                                    <div className="w-12 h-12 rounded-xl bg-slate-300/60 flex items-center justify-center shrink-0">
                                      <MapPin size={22} className="text-slate-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-[14px] font-bold text-slate-900 group-hover:text-black">{item.name}</div>
                                      <div className="text-[13px] text-slate-500 mt-0.5">{item.country}</div>
                                    </div>
                                    <div className="text-[12px] font-bold text-slate-400">{item.code}</div>
                                  </button>
                                ))}
                              </div>
                            )}
                            
                            {alphabetCities.filter(item => item.name.toLowerCase().includes((activeDropdown?.type === 'package-from' ? packageFrom : packageTo).toLowerCase())).length === 0 && (
                              <div className="px-6 py-8 text-center text-slate-500 text-[14px]">
                                No matches found
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="w-full h-[1px] lg:w-[1px] lg:h-8 lg:my-auto bg-slate-200 block shrink-0"></div>

                    {/* Dates */}
                    <div 
                      className="flex-[0.8] px-5 py-3.5 relative flex items-center gap-3 transition-colors border-2 border-transparent hover:bg-slate-200/60 cursor-pointer"
                      onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                    >
                      <CalendarDays size={22} className="text-slate-500 shrink-0" />
                      <div className="flex items-center gap-2 text-[14px] lg:text-[15px] text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="font-bold">{formatDateString(departDate).split(',')[0]} {departDate.getDate()} {departDate.toLocaleString('default', {month:'short'})}</span>
                        <span className="text-slate-400 font-normal shrink-0">-</span>
                        <span className="font-bold">{formatDateString(returnDate).split(',')[0]} {returnDate ? `${returnDate.getDate()} ${returnDate.toLocaleString('default', {month:'short'})}` : ''}</span>
                        {departDate && returnDate && (
                          <span className="ml-2 px-2 py-0.5 bg-slate-200/70 text-slate-700 text-[11px] font-bold rounded-md hidden xl:inline-block">
                            {Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24))} nights
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full h-[1px] lg:w-[1px] lg:h-8 lg:my-auto bg-slate-200 block shrink-0"></div>

                    {/* Travelers */}
                    <div className="flex-[0.7] px-5 py-3.5 relative flex items-center transition-colors border-2 border-transparent hover:bg-slate-200/60 cursor-pointer group"
                         onClick={() => setActiveDropdown(activeDropdown?.type === 'package-travelers' ? null : { type: 'package-travelers' })}
                         onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-3 text-[14px] lg:text-[15px] text-slate-800 whitespace-nowrap w-full">
                        <User size={22} className="text-slate-500 group-hover:text-slate-700 transition-colors shrink-0" />
                        <span className="font-bold text-slate-800 w-full truncate">
                          {packageAdults + packageChildren} traveler{packageAdults + packageChildren > 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <AnimatePresence>
                        {activeDropdown?.type === 'package-travelers' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="absolute top-[calc(100%+4px)] right-0 w-[300px] bg-[#EBEBEB] rounded-[8px] shadow-lg border border-slate-300 z-[100] overflow-hidden"
                          >
                            <div className="p-4 flex flex-col gap-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[15px] text-slate-800">Adults</span>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setPackageAdults(Math.max(1, packageAdults - 1)) }}
                                    className="w-7 h-7 rounded-[4px] border border-slate-400 flex items-center justify-center bg-transparent hover:bg-slate-200 disabled:opacity-40"
                                    disabled={packageAdults <= 1}
                                  >
                                    <Minus size={16} className="text-slate-900" />
                                  </button>
                                  <span className="text-[15px] font-bold text-slate-900 w-4 text-center">{packageAdults}</span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setPackageAdults(packageAdults + 1) }}
                                    className="w-7 h-7 rounded-[4px] border border-slate-400 flex items-center justify-center bg-transparent hover:bg-slate-200"
                                  >
                                    <Plus size={16} className="text-slate-900" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-[15px] text-slate-800">Children</span>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      if (packageChildren > 0) {
                                        setPackageChildren(packageChildren - 1);
                                        setPackageChildAges(prev => prev.slice(0, -1));
                                      }
                                    }}
                                    className="w-7 h-7 rounded-[4px] border border-slate-400 flex items-center justify-center bg-transparent hover:bg-slate-200 disabled:opacity-40"
                                    disabled={packageChildren <= 0}
                                  >
                                    <Minus size={16} className="text-slate-900" />
                                  </button>
                                  <span className="text-[15px] font-bold text-slate-900 w-4 text-center">{packageChildren}</span>
                                  <button 
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      setPackageChildren(packageChildren + 1);
                                      setPackageChildAges([...packageChildAges, '10 years']);
                                    }}
                                    className="w-7 h-7 rounded-[4px] border border-slate-400 flex items-center justify-center bg-transparent hover:bg-slate-200"
                                  >
                                    <Plus size={16} className="text-slate-900" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {packageChildren > 0 && (
                              <div className="border-t border-slate-300 p-4 flex flex-col gap-3">
                                {packageChildAges.map((age, i) => (
                                  <div key={i} className="flex items-center justify-between">
                                    <span className="text-[15px] text-slate-800">Age of child {i + 1}</span>
                                    <div className="relative">
                                      <select 
                                        value={age}
                                        onChange={(e) => {
                                          const newAges = [...packageChildAges];
                                          newAges[i] = e.target.value;
                                          setPackageChildAges(newAges);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="appearance-none bg-transparent border border-slate-400 rounded-[4px] py-1.5 pl-3 pr-8 text-[14px] text-slate-800 focus:outline-none focus:border-slate-500 cursor-pointer"
                                      >
                                        <option value="Under 1">Under 1</option>
                                        {[...Array(17)].map((_, idx) => (
                                          <option key={idx} value={`${idx + 1} years`}>{idx + 1} years</option>
                                        ))}
                                      </select>
                                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              )}


              {/* Bottom row: Search Button Area */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-end gap-3 z-20 relative">
                <button className="w-full md:w-auto px-10 py-3 bg-[#E11D48] hover:bg-rose-600 text-white font-extrabold text-[15px] rounded-[4px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer relative group">
                  <Search size={18} strokeWidth={2.5} />
                  <span>Search</span>
                </button>
              </div>

                {/* Calendar - perfectly centered over the search panel without fixed positioning */}
                <AnimatePresence>
                  {isCalendarOpen && (
                    <motion.div
                      key="cal-panel"
                      ref={calendarRef}
                      initial={{ opacity: 0, y: '-45%', x: '-50%', scale: 0.98 }}
                      animate={{ opacity: 1, y: '-50%', x: '-50%', scale: 1 }}
                      exit={{ opacity: 0, y: '-45%', x: '-50%', scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-1/2 left-1/2 z-[60] w-[95%] lg:w-[850px] bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-slate-200 flex flex-col overflow-hidden"
                    >
                      {/* Top bar: Depart / Return chips + Close */}
                      <div className="flex items-stretch border-b border-slate-100">
                        {activeCategory !== 'cars' && (
                          <>
                            <button onClick={() => setCalendarTarget({ type: 'depart', index: null })} className={`flex-1 text-left px-5 py-4 transition-all ${calendarTarget.type === 'depart' ? 'border-b-[3px] border-[#E11D48]' : 'border-b-[3px] border-transparent hover:bg-slate-50'}`}>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Depart</div>
                              <div className={`text-[15px] font-extrabold ${calendarTarget.type === 'depart' ? 'text-[#E11D48]' : 'text-slate-800'}`}>{formatDateString(departDate)}</div>
                            </button>
                            <div className="w-px bg-slate-100 my-3" />
                            {tripType !== 'one-way' && (
                              <button onClick={() => setCalendarTarget({ type: 'return', index: null })} className={`flex-1 text-left px-5 py-4 transition-all ${calendarTarget.type === 'return' ? 'border-b-[3px] border-[#E11D48]' : 'border-b-[3px] border-transparent hover:bg-slate-50'}`}>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Return</div>
                                <div className={`text-[15px] font-extrabold ${calendarTarget.type === 'return' ? 'text-[#E11D48]' : 'text-slate-800'}`}>
                                  {returnDate ? formatDateString(returnDate) : <span className="text-slate-300">Select date</span>}
                                </div>
                              </button>
                            )}
                          </>
                        )}
                        <button onClick={() => setIsCalendarOpen(false)} className={`px-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer ${activeCategory === 'cars' ? 'ml-auto py-4' : ''}`}><X size={20} /></button>
                      </div>

                      {/* Calendar body */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <motion.button onClick={() => navigateMonth(-1)} whileHover={{ backgroundColor: '#f1f5f9' }} whileTap={{ scale: 0.92 }} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#E11D48] transition-colors cursor-pointer"><ChevronLeft size={20} /></motion.button>
                          <div className="flex flex-1 justify-around">
                            <span className="text-[15px] font-extrabold text-slate-800">{monthNames[currentMonth]} {currentYear}</span>
                            <span className="text-[15px] font-extrabold text-slate-800 hidden md:block">{monthNames[(currentMonth + 1) % 12]} {currentMonth === 11 ? currentYear + 1 : currentYear}</span>
                          </div>
                          <motion.button onClick={() => navigateMonth(1)} whileHover={{ backgroundColor: '#f1f5f9' }} whileTap={{ scale: 0.92 }} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#E11D48] transition-colors cursor-pointer"><ChevronRight size={20} /></motion.button>
                        </div>
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <div className="grid grid-cols-7 text-[11px] font-bold text-slate-400 uppercase mb-2 text-center"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
                            <div className="grid grid-cols-7 gap-y-1">{renderCalendarDays(currentYear, currentMonth, false)}</div>
                          </div>
                          <div className="w-px bg-slate-100 hidden md:block" />
                          <div className="flex-1 hidden md:block">
                            <div className="grid grid-cols-7 text-[11px] font-bold text-slate-400 uppercase mb-2 text-center"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
                            <div className="grid grid-cols-7 gap-y-1">{renderCalendarDays(currentMonth === 11 ? currentYear + 1 : currentYear, (currentMonth + 1) % 12, true)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-5 pb-4 flex justify-end border-t border-slate-100 pt-3">
                        <button onClick={() => setIsCalendarOpen(false)} className="px-8 py-2 bg-[#E11D48] hover:bg-rose-600 text-white font-bold text-[14px] rounded-[8px] transition-all cursor-pointer shadow-sm">Done</button>
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

