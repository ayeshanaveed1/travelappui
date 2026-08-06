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
  FileText,
  Train,
  Home
} from 'lucide-react'
import heroVideo from './assets/create_a_video_for_my_website (1).mp4'
import staysVideo from './assets/create_a_video_of_hotel_stays.mp4'
import RegisterPage from './RegisterPage';
import heroImg from './assets/hero_poster.jpg'
import FeaturedHotels from './FeaturedHotels';
import FeaturedFlights from './FeaturedFlights';
import FeaturedTours from './FeaturedTours';
import Footer from './Footer';
import SignInModal from './components/SignInModal';
import CurrencyModal from './components/CurrencyModal';
import CountryModal from './components/CountryModal';
import LiveBookingWidget from './components/LiveBookingWidget';

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

const locationSuggestions = [
  { id: 101, type: 'city', name: 'Amsterdam', subtitle: 'Netherlands' },
  { id: 102, type: 'airport', name: 'Atlanta Hartsfield-Jackson (ATL)', subtitle: 'Atlanta, United States', terminals: ['North Terminal', 'South Terminal'] },
  { id: 103, type: 'city', name: 'Bangkok', subtitle: 'Thailand' },
  { id: 104, type: 'station', name: 'Berlin Hauptbahnhof', subtitle: 'Berlin, Germany' },
  { id: 105, type: 'city', name: 'Chicago', subtitle: 'Illinois, United States' },
  { id: 106, type: 'airport', name: 'Charles de Gaulle Airport (CDG)', subtitle: 'Paris, France', terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3'] },
  { id: 107, type: 'city', name: 'Dubai', subtitle: 'United Arab Emirates' },
  { id: 108, type: 'airport', name: 'Dubai International Airport (DXB)', subtitle: 'Dubai, UAE', terminals: ['Terminal 1', 'Terminal 3'] },
  { id: 109, type: 'city', name: 'Edinburgh', subtitle: 'Scotland, United Kingdom' },
  { id: 110, type: 'hotel', name: 'Emirates Palace', subtitle: 'Abu Dhabi, UAE' },
  { id: 111, type: 'city', name: 'Frankfurt', subtitle: 'Germany' },
  { id: 112, type: 'airport', name: 'Frankfurt Airport (FRA)', subtitle: 'Frankfurt, Germany', terminals: ['Terminal 1', 'Terminal 2'] },
  { id: 113, type: 'city', name: 'Geneva', subtitle: 'Switzerland' },
  { id: 114, type: 'station', name: 'Grand Central Terminal', subtitle: 'New York, United States' },
  { id: 115, type: 'city', name: 'Hong Kong', subtitle: 'Hong Kong SAR' },
  { id: 116, type: 'airport', name: 'Heathrow Airport (LHR)', subtitle: 'London, United Kingdom', terminals: ['Terminal 2', 'Terminal 3', 'Terminal 4', 'Terminal 5'] },
  { id: 117, type: 'city', name: 'Istanbul', subtitle: 'Turkey' },
  { id: 118, type: 'airport', name: 'Incheon International Airport (ICN)', subtitle: 'Seoul, South Korea', terminals: ['Terminal 1', 'Terminal 2'] },
  { id: 1, type: 'city', name: 'Jeju Island', subtitle: 'South Korea' },
  { id: 2, type: 'station', name: 'Jamaica', subtitle: 'New York, New York State, United States' },
  { id: 3, type: 'airport', name: 'John F. Kennedy International Airport (JFK)', subtitle: 'New York, New York State, United States', terminals: ['Terminal 1', 'Terminal 4', 'Terminal 5', 'Terminal 8'] },
  { id: 4, type: 'city', name: 'Jakarta', subtitle: 'Special Capital Region of Jakarta, Indonesia' },
  { id: 5, type: 'hotel', name: 'Jumeirah Beach Hotel', subtitle: 'Dubai, United Arab Emirates' },
  { id: 119, type: 'city', name: 'Kuala Lumpur', subtitle: 'Malaysia' },
  { id: 120, type: 'airport', name: 'Kansai International Airport (KIX)', subtitle: 'Osaka, Japan', terminals: ['Terminal 1', 'Terminal 2'] },
  { id: 121, type: 'city', name: 'London', subtitle: 'United Kingdom' },
  { id: 122, type: 'airport', name: 'Los Angeles International Airport (LAX)', subtitle: 'California, United States', terminals: ['Terminal B', 'Terminal 2', 'Terminal 3'] },
  { id: 123, type: 'city', name: 'Madrid', subtitle: 'Spain' },
  { id: 124, type: 'hotel', name: 'Marina Bay Sands', subtitle: 'Singapore' },
  { id: 125, type: 'city', name: 'New York', subtitle: 'New York State, United States' },
  { id: 126, type: 'airport', name: 'Narita International Airport (NRT)', subtitle: 'Tokyo, Japan', terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3'] },
  { id: 127, type: 'city', name: 'Osaka', subtitle: 'Japan' },
  { id: 128, type: 'airport', name: 'O\'Hare International Airport (ORD)', subtitle: 'Chicago, United States', terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3', 'Terminal 5'] },
  { id: 129, type: 'city', name: 'Paris', subtitle: 'France' },
  { id: 130, type: 'station', name: 'Paddington Station', subtitle: 'London, United Kingdom' },
  { id: 131, type: 'city', name: 'Quebec City', subtitle: 'Canada' },
  { id: 132, type: 'city', name: 'Quito', subtitle: 'Ecuador' },
  { id: 133, type: 'city', name: 'Rome', subtitle: 'Italy' },
  { id: 134, type: 'hotel', name: 'Ritz Paris', subtitle: 'Paris, France' },
  { id: 135, type: 'city', name: 'Singapore', subtitle: 'Singapore' },
  { id: 136, type: 'airport', name: 'Sydney Airport (SYD)', subtitle: 'Sydney, Australia', terminals: ['T1 International', 'T2 Domestic'] },
  { id: 137, type: 'city', name: 'Tokyo', subtitle: 'Japan' },
  { id: 138, type: 'station', name: 'Tokyo Station', subtitle: 'Tokyo, Japan' },
  { id: 139, type: 'city', name: 'Ushuaia', subtitle: 'Argentina' },
  { id: 140, type: 'city', name: 'Utrecht', subtitle: 'Netherlands' },
  { id: 141, type: 'city', name: 'Venice', subtitle: 'Italy' },
  { id: 142, type: 'city', name: 'Vienna', subtitle: 'Austria' },
  { id: 143, type: 'city', name: 'Washington D.C.', subtitle: 'United States' },
  { id: 144, type: 'airport', name: 'Warsaw Chopin Airport (WAW)', subtitle: 'Warsaw, Poland' },
  { id: 145, type: 'city', name: 'Xi\'an', subtitle: 'Shaanxi, China' },
  { id: 146, type: 'city', name: 'Yokohama', subtitle: 'Japan' },
  { id: 147, type: 'airport', name: 'YVR - Vancouver International Airport', subtitle: 'Vancouver, Canada' },
  { id: 148, type: 'city', name: 'Zurich', subtitle: 'Switzerland' },
  { id: 149, type: 'airport', name: 'Zurich Airport (ZRH)', subtitle: 'Zurich, Switzerland' }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('flights')
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isRegisterPageOpen, setIsRegisterPageOpen] = useState(false)
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false)
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Pakistan', code: 'PK' })
  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'PKR', symbol: 'Rs' })

  const countriesList = [
    { name: 'Pakistan', code: 'PK' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Angola', code: 'AO' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Australia', code: 'AU' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Congo, Dem Rep of', code: 'CD' },
    { name: 'Cote d\'Ivoire', code: 'CI' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' }
  ];

  const currenciesList = [
    { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
    { code: 'AED', name: 'Emirates Dirham', symbol: 'د.إ' },
    { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'BWP', name: 'Botswana Pula', symbol: 'P' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'COP', name: 'Colombian Peso', symbol: '$' },
    { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'GHS', name: 'Ghana Cedi', symbol: 'GH₵' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د' },
    { code: 'IRR', name: 'Iranian Rial', symbol: '﷼' },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'USD', name: 'US Dollar', symbol: '$' }
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
  const [passengers, setPassengers] = useState('1 Adult')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [travelClass, setTravelClass] = useState('Economy')
  const [rooms, setRooms] = useState(1)
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
          
          {/* Magical Icon Animation using layoutId */}
          {((!returnDate && isDepart) || (returnDate && isReturn)) && (
            <motion.div
              layoutId="calendar-active-icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute -top-3 -right-2 text-[#E11D48] z-30 drop-shadow-[0_4px_8px_rgba(225,29,72,0.4)] pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {activeCategory === 'stays' ? (
                  <Home size={18} fill="currentColor" />
                ) : activeCategory === 'cars' ? (
                  <Car size={18} fill="currentColor" />
                ) : (
                  <Plane size={18} className="rotate-45" fill="currentColor" />
                )}
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
            key={activeCategory === 'stays' ? 'stays' : 'default'}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
            src={activeCategory === 'stays' ? staysVideo : heroVideo}
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
        <nav className="relative z-50 px-2 sm:px-4 md:px-8 py-3 sm:py-4 w-full shrink-0 bg-[#EBEBEB] shadow-sm border-b border-slate-200/60">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
          {/* Left side: Menu & Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xl sm:text-2xl font-black tracking-[0.15em] text-[#E11D48] cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              TRAVEL<span className="text-slate-900 tracking-[0.15em]">IQ</span>
            </span>
          </div>

          {/* Center side: Links (Little big as requested) */}
          <div className="hidden md:flex items-center gap-12">
            
            {/* Services Dropdown */}
            <div className="group py-4">
              <a href="#" className="text-[15px] font-extrabold tracking-wide text-slate-700 group-hover:text-[#E11D48] transition-colors flex items-center gap-1.5 relative">
                Services
                <ChevronDown size={16} className="text-slate-500 group-hover:text-[#E11D48] transition-transform duration-300 group-hover:rotate-180" strokeWidth={3} />
                <span className="absolute left-1/2 -bottom-[16px] w-0 h-[3px] bg-[#E11D48] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 rounded-full"></span>
              </a>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-max">
                <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200/80 border-t border-t-slate-300 p-3">
                  <div className="flex flex-wrap justify-center max-w-[1200px] gap-2">
                    {servicesDropdown.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a key={idx} href="#" className="flex items-center gap-3 py-2.5 pl-2.5 pr-5 rounded-full hover:bg-slate-50 transition-all duration-300 group/item relative overflow-hidden hover:shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-transparent hover:border-slate-200/60">
                          
                          <div className="w-[40px] h-[40px] rounded-full bg-slate-50 border border-slate-100 text-slate-600 flex justify-center items-center group-hover/item:bg-[#E11D48] group-hover/item:border-[#E11D48] group-hover/item:text-white transition-all duration-300 shadow-sm group-hover/item:shadow-[0_6px_16px_rgba(225,29,72,0.4)] z-10 shrink-0 group-hover/item:scale-105">
                            <Icon size={18} strokeWidth={1.5} />
                          </div>
                          
                          <div className="flex flex-col z-10 justify-center">
                            <span className="font-extrabold text-slate-800 text-[14px] leading-tight group-hover/item:text-[#E11D48] transition-colors">
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider group-hover/item:text-[#E11D48]/70">
                                {item.subtitle}
                              </span>
                            )}
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
            <div className="flex items-center h-full">
              <button 
                onClick={() => setIsCurrencyModalOpen(true)}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 text-slate-800 font-extrabold text-[13px] sm:text-[14px] rounded-full transition-all duration-200 cursor-pointer"
              >
                {selectedCurrency.code}
              </button>
            </div>

            {/* Country Button */}
            <div className="flex items-center h-full">
              <button 
                onClick={() => setIsCountryModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 text-slate-700 font-bold text-[14px] rounded-full transition-all duration-200 cursor-pointer"
              >
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <Flag code={selectedCountry.code} className="w-full h-full object-cover" />
                </div>
              </button>
            </div>

            {/* Sign In Button */}
            <button 
              onClick={() => setIsSignInModalOpen(true)}
              className="px-2 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#D4D6DB] hover:bg-slate-300 text-slate-800 font-extrabold text-[12px] sm:text-[15px] whitespace-nowrap transition-all cursor-pointer shadow-sm"
            >
              Sign In
            </button>

            {/* Register Button */}
            <button 
              onClick={() => setIsRegisterPageOpen(true)}
              className="px-2.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#E11D48] hover:bg-rose-600 text-white font-extrabold text-[12px] sm:text-[15px] whitespace-nowrap shadow-[0_4px_14px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            >
              Register
            </button>
            
          </div>
          </div>
        </nav>

        {/* Main Content Wrapper */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full pb-8 pt-10">
          
          {/* Hero Content overlaid on video */}
          <div className="flex flex-col items-center justify-center text-center px-4 mb-10 h-[80px] sm:h-[100px]">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tighter w-full sm:whitespace-nowrap text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              >
                {activeCategory === 'flights' && <>Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">best flight deals</span> across the globe.</>}
                {activeCategory === 'stays' && <>Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">extraordinary stays</span> for your next trip.</>}
                {activeCategory === 'cars' && <>Hit the road with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">perfect rental car</span>.</>}
                {activeCategory === 'packages' && <>Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">unbeatable packages</span> for your dream vacation.</>}
                {activeCategory === 'cruises' && <>Sail away on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700">ultimate ocean getaway</span>.</>}
              </motion.h1>
            </AnimatePresence>
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
                  <div className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[18px] flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:rounded-full ${
                    isSel 
                      ? 'bg-[#E11D48] text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)]' 
                      : 'bg-white/90 backdrop-blur-md text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/60 hover:bg-white hover:text-[#E11D48] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5'
                  }`}>
                    <IconComponent size={26} strokeWidth={1.5} className="fill-none transition-transform duration-300 group-hover:scale-110" />
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
            
            
            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] relative z-10">
              <div className="p-6 relative rounded-2xl">

              {activeCategory === 'flights' && (
                <>
              {/* Top row: Trip Type Selector & Direct Flights */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                  {[
                    { id: 'round-trip', label: 'Round-trip' },
                    { id: 'one-way', label: 'One-way' },
                    { id: 'multi-city', label: 'Multi-city' }
                  ].map((t) => {
                    const isActive = tripType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTripType(t.id)}
                        className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {t.label}
                      </button>
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
                      <div className="w-8 bg-[#E11D48] text-white flex items-center justify-center rounded-md font-bold text-sm shrink-0 shadow-sm mr-2">
                        {index + 1}
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row items-stretch bg-[#F7F8FA] border border-slate-200/80 rounded-xl transition-all flex-1 shadow-sm w-full">
                      
                      {/* FROM / TO Connected Block */}
                      <div className="flex flex-col sm:flex-row flex-[1.1] items-stretch relative group">
                        
                        {/* FROM */}
                        <div 
                          className="flex-1 px-5 py-4 relative cursor-text group-hover:bg-white rounded-l-xl transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                          }}
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Leaving from</div>
                          <div className="relative flex items-center w-full pr-4">
                            <input 
                              type="text" 
                              placeholder="From" 
                              value={tripType === 'multi-city' ? flight.from : fromCity}
                              onChange={(e) => {
                                tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', e.target.value) : setFromCity(e.target.value);
                                setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                              }}
                              className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight" 
                            />
                            {(tripType === 'multi-city' ? flight.from : fromCity) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', '') : setFromCity('');
                                  setActiveDropdown({ type: 'from', index: tripType === 'multi-city' ? index : 'single' });
                                }}
                                className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                              >
                                <X size={12} strokeWidth={2.5} />
                              </button>
                            )}
                          </div>
                          {/* FROM Dropdown */}
                          <AnimatePresence>
                            {activeDropdown?.type === 'from' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-[110%] left-0 w-[320px] sm:w-[480px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] py-2 z-[100] border border-slate-100 overflow-hidden"
                              >
                                {locationSuggestions.filter(item => {
                                  const searchStr = (tripType === 'multi-city' ? flight.from : fromCity).toLowerCase();
                                  if (!searchStr) return true;
                                  return item.name.toLowerCase().startsWith(searchStr) || item.subtitle.toLowerCase().startsWith(searchStr);
                                }).map((item) => (
                                  <div
                                    key={item.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', item.name) : setFromCity(item.name);
                                      setActiveDropdown(null);
                                    }}
                                    className="px-4 py-3 cursor-pointer transition-colors hover:bg-[#F2F6F9] flex flex-col group/sugg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="text-slate-400 group-hover/sugg:text-[#E11D48] transition-colors shrink-0">
                                        {item.type === 'city' && <MapPin size={18} />}
                                        {item.type === 'airport' && <Plane size={18} />}
                                        {item.type === 'station' && <Train size={18} />}
                                        {item.type === 'hotel' && <Building2 size={18} />}
                                      </div>
                                      <div className="flex flex-col flex-1 min-w-0">
                                        <div className="text-[14px] font-bold text-slate-800 truncate">{item.name}</div>
                                        <div className="text-[12px] text-slate-500 truncate mt-0.5">{item.subtitle}</div>
                                      </div>
                                    </div>
                                    
                                    {item.terminals && (
                                      <div className="flex flex-wrap gap-2 mt-2 pl-7">
                                        {item.terminals.map((terminal, tidx) => (
                                          <button 
                                            key={tidx}
                                            onClick={(e) => {
                                               e.stopPropagation();
                                               const fullName = `${item.name} - ${terminal}`;
                                               tripType === 'multi-city' ? handleUpdateMultiCity(index, 'from', fullName) : setFromCity(fullName);
                                               setActiveDropdown(null);
                                            }}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                                          >
                                            {terminal}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {locationSuggestions.filter(item => {
                                  const searchStr = (tripType === 'multi-city' ? flight.from : fromCity).toLowerCase();
                                  if (!searchStr) return true;
                                  return item.name.toLowerCase().startsWith(searchStr) || item.subtitle.toLowerCase().startsWith(searchStr);
                                }).length === 0 && (
                                  <div className="px-4 py-6 text-center text-slate-500 text-[13px]">
                                    No matches found
                                  </div>
                                )}
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
                            className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 shadow-md hover:border-[#E11D48]/40 hover:shadow-[0_0_0_3px_rgba(225,29,72,0.1)] flex items-center justify-center text-[#E11D48] transition-all duration-200 cursor-pointer group/swap z-20"
                          >
                            <ArrowLeftRight size={14} className="group-hover/swap:rotate-180 transition-transform duration-300" />
                          </button>
                        </div>
  
                        <div className="w-full h-[1px] sm:w-[1px] sm:h-8 bg-slate-200 block sm:hidden lg:block"></div>
  
                        {/* TO */}
                        <div 
                          className="flex-1 px-5 py-4 relative cursor-text hover:bg-white transition-colors border-b lg:border-b-0 lg:border-r border-slate-200/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                          }}
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Going to</div>
                          <div className="relative flex items-center w-full pr-4">
                            <input 
                              type="text" 
                              placeholder="To" 
                              value={tripType === 'multi-city' ? flight.to : toCity}
                              onChange={(e) => {
                                tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', e.target.value) : setToCity(e.target.value);
                                setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                              }}
                              className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight" 
                            />
                            {(tripType === 'multi-city' ? flight.to : toCity) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', '') : setToCity('');
                                  setActiveDropdown({ type: 'to', index: tripType === 'multi-city' ? index : 'single' });
                                }}
                                className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                              >
                                <X size={12} strokeWidth={2.5} />
                              </button>
                            )}
                          </div>
                          {/* TO Dropdown */}
                          <AnimatePresence>
                            {activeDropdown?.type === 'to' && activeDropdown?.index === (tripType === 'multi-city' ? index : 'single') && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-[110%] left-0 lg:left-6 w-[320px] sm:w-[480px] bg-white rounded-[16px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] py-2 z-[100] border border-slate-100 overflow-hidden"
                              >
                                {locationSuggestions.filter(item => {
                                  const searchStr = (tripType === 'multi-city' ? flight.to : toCity).toLowerCase();
                                  if (!searchStr) return true;
                                  return item.name.toLowerCase().startsWith(searchStr) || item.subtitle.toLowerCase().startsWith(searchStr);
                                }).map((item) => (
                                  <div
                                    key={item.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', item.name) : setToCity(item.name);
                                      setActiveDropdown(null);
                                    }}
                                    className="px-4 py-3 cursor-pointer transition-colors hover:bg-[#F2F6F9] flex flex-col group/sugg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="text-slate-400 group-hover/sugg:text-[#E11D48] transition-colors shrink-0">
                                        {item.type === 'city' && <MapPin size={18} />}
                                        {item.type === 'airport' && <Plane size={18} />}
                                        {item.type === 'station' && <Train size={18} />}
                                        {item.type === 'hotel' && <Building2 size={18} />}
                                      </div>
                                      <div className="flex flex-col flex-1 min-w-0">
                                        <div className="text-[14px] font-bold text-slate-800 truncate">{item.name}</div>
                                        <div className="text-[12px] text-slate-500 truncate mt-0.5">{item.subtitle}</div>
                                      </div>
                                    </div>
                                    
                                    {item.terminals && (
                                      <div className="flex flex-wrap gap-2 mt-2 pl-7">
                                        {item.terminals.map((terminal, tidx) => (
                                          <button 
                                            key={tidx}
                                            onClick={(e) => {
                                               e.stopPropagation();
                                               const fullName = `${item.name} - ${terminal}`;
                                               tripType === 'multi-city' ? handleUpdateMultiCity(index, 'to', fullName) : setToCity(fullName);
                                               setActiveDropdown(null);
                                            }}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                                          >
                                            {terminal}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {locationSuggestions.filter(item => {
                                  const searchStr = (tripType === 'multi-city' ? flight.to : toCity).toLowerCase();
                                  if (!searchStr) return true;
                                  return item.name.toLowerCase().startsWith(searchStr) || item.subtitle.toLowerCase().startsWith(searchStr);
                                }).length === 0 && (
                                  <div className="px-4 py-6 text-center text-slate-500 text-[13px]">
                                    No matches found
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
  
                      {/* DATES Field */}
                      <div className="flex-[0.8] w-full lg:w-auto h-full border-b lg:border-b-0 lg:border-r border-slate-200/80">
                        <div 
                          onClick={() => { setCalendarTarget(tripType === 'multi-city' ? { type: 'multi', index } : { type: 'depart', index: null }); setIsCalendarOpen(true); }}
                          className="flex items-center hover:bg-white px-5 py-4 h-full transition-all duration-200 cursor-pointer justify-between group/dates"
                        >
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                              {tripType === 'round-trip' ? 'Depart — Return' : 'Date'}
                            </span>
                            {tripType === 'round-trip' ? (
                              <div className="flex items-center gap-2 text-[14px] font-bold text-slate-900 tracking-tight">
                                <span>{formatDateString(departDate) || 'Choose date'}</span>
                                <span className="text-slate-300 font-normal">→</span>
                                <span>{formatDateString(returnDate) || 'Choose date'}</span>
                              </div>
                            ) : (
                              <span className={`text-[14px] font-bold tracking-tight ${
                                !(tripType === 'multi-city' ? flight.date : departDate) ? 'text-slate-300' : 'text-slate-900'
                              }`}>
                                {(tripType === 'multi-city' ? flight.date : departDate) ? formatDateString(tripType === 'multi-city' ? flight.date : departDate) : 'Choose date'}
                              </span>
                            )}
                          </div>
                          <CalendarDays size={18} className="text-slate-300 group-hover/dates:text-[#E11D48] transition-colors shrink-0 ml-3" />
                        </div>
                      </div>

                      {/* PASSENGERS Field */}
                      {(index === 0 || tripType !== 'multi-city') && (
                        <div className="flex-[0.6] w-full lg:w-auto relative group/passclass h-full">
                           <div className="flex items-center justify-between hover:bg-white rounded-r-xl px-5 py-4 h-full transition-all duration-200 cursor-pointer">
                             <div className="flex flex-col justify-center">
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Travelers</span>
                               <span className="text-[14px] font-bold text-slate-900 tracking-tight whitespace-nowrap">{(adults + children)} {(adults + children) === 1 ? 'traveler' : 'travelers'} · {travelClass}</span>
                             </div>
                             <ChevronDown size={14} className="text-slate-300 group-hover/passclass:text-[#E11D48] group-hover/passclass:rotate-180 transition-all duration-200 ml-3 shrink-0" />
                           </div>
                           
                           <div className="absolute right-0 top-full pt-2 w-[280px] sm:w-[320px] z-[99] opacity-0 scale-95 pointer-events-none group-hover/passclass:opacity-100 group-hover/passclass:scale-100 group-hover/passclass:pointer-events-auto transition-all duration-200 origin-top-right">
                             <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-0 overflow-hidden">
                               <div className="p-3">
                                 <div className="text-[13px] font-bold text-slate-900 mb-2">Travelers</div>
                                 
                                 <div className="flex items-center justify-between mb-2">
                                   <div>
                                     <div className="text-[13px] text-slate-700">Adults <span className="text-slate-500">18+</span></div>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">-</button>
                                     <span className="w-4 text-center font-bold text-[14px]">{adults}</span>
                                     <button onClick={() => setAdults(Math.min(8, adults + 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">+</button>
                                   </div>
                                 </div>
                                 
                                 <div className="flex items-center justify-between mb-2">
                                   <div>
                                     <div className="text-[13px] text-slate-700">Children <span className="text-slate-500">0-17</span></div>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <button onClick={() => {
                                        const newCount = Math.max(0, children - 1);
                                        setChildren(newCount);
                                        setChildAges(prev => prev.slice(0, newCount));
                                     }} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">-</button>
                                     <span className="w-4 text-center font-bold text-[14px]">{children}</span>
                                     <button onClick={() => {
                                        if (children >= 6) return;
                                        const newCount = children + 1;
                                        setChildren(newCount);
                                        setChildAges(prev => [...prev, '']);
                                     }} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">+</button>
                                   </div>
                                 </div>
  
                                 {/* Child Ages Dropdowns */}
                                 {children > 0 && (
                                   <div className="mb-2">
                                     {childAges.map((age, idx) => (
                                       <div key={idx} className="flex items-center justify-between mt-2">
                                         <div className="text-[12px] text-slate-800">Child's age</div>
                                         <div className="relative">
                                           <select 
                                             value={age}
                                             onChange={(e) => {
                                               const newAges = [...childAges];
                                               newAges[idx] = e.target.value;
                                               setChildAges(newAges);
                                             }}
                                             className="appearance-none bg-transparent border border-slate-400/80 rounded-[6px] pl-3 pr-8 py-1 text-[12px] text-slate-600 focus:outline-none focus:border-slate-500 cursor-pointer min-w-[60px] shadow-sm transition-colors hover:bg-slate-50"
                                           >
                                             <option value="" disabled>Age</option>
                                             {Array.from({length: 18}).map((_, i) => (
                                               <option key={i} value={i}>{i}</option>
                                             ))}
                                           </select>
                                           <ChevronDown size={14} strokeWidth={2.5} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none" />
                                         </div>
                                       </div>
                                     ))}
                                   </div>
                                 )}
                               </div>
                             
                               <div className="h-[1px] bg-slate-300 w-full opacity-60"></div>
                             
                               <div className="p-3">
                                 <div className="text-[13px] font-bold text-slate-900 mb-2">Cabin Class</div>
                                 <div className="flex flex-wrap gap-1.5">
                                   {['Economy', 'Premium Economy', 'Business', 'First'].map((opt) => (
                                     <button 
                                       key={opt} 
                                       onClick={() => setTravelClass(opt)} 
                                       className={`px-2.5 py-1 text-[13px] rounded-lg border transition-all cursor-pointer ${travelClass === opt ? 'border-slate-800 text-slate-800 bg-slate-200/50' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}
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
                  <button onClick={handleAddMultiCityFlight} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48]/5 hover:border-[#E11D48]/60 font-bold transition-all duration-200 cursor-pointer text-sm">
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
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border-none rounded-lg text-[13px] font-semibold text-slate-700 transition-all duration-200 cursor-pointer">
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

                  <div className="relative z-30 flex flex-col lg:flex-row items-stretch bg-[#F7F8FA] border border-slate-200/80 rounded-xl transition-all w-full shadow-sm">
                  {/* Destination */}
                  <div 
                    className="flex-1 lg:flex-[1.2] px-5 py-4 relative cursor-text hover:bg-white flex items-center gap-3 transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-slate-200/80 focus-within:bg-white dropdown-container group/dest"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown({ type: 'stays-to', index: 'single' });
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <MapPin size={18} className="text-slate-400 group-hover/dest:text-[#E11D48] shrink-0 transition-colors duration-200" />
                    <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Where to?</span>
                      <div className="relative flex items-center w-full">
                        <input 
                          type="text" 
                          placeholder="Search destinations" 
                          value={toCity}
                          onChange={(e) => {
                            setToCity(e.target.value);
                            setActiveDropdown({ type: 'stays-to', index: 'single' });
                          }}
                          className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight" 
                        />
                        {toCity && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setToCity('');
                              setActiveDropdown({ type: 'stays-to', index: 'single' });
                            }}
                            className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                          >
                            <X size={12} strokeWidth={2.5} />
                          </button>
                        )}
                      </div>
                    </div>
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

                  <div className="w-full h-[1px] lg:w-[1px] lg:h-auto bg-slate-200/80 block shrink-0 hidden lg:block"></div>

                  {/* Dates */}
                  <div 
                    onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                    className="flex-[1.2] lg:flex-[1.6] px-5 py-4 relative cursor-pointer hover:bg-white flex items-center gap-3 overflow-hidden transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-slate-200/80 group/staysdates"
                  >
                    <CalendarDays size={18} className="text-slate-400 group-hover/staysdates:text-[#E11D48] shrink-0 transition-colors duration-200" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Check-in — Check-out</span>
                      <div className="flex items-center gap-2 text-[14px] font-bold text-slate-900 tracking-tight w-full whitespace-nowrap overflow-hidden">
                        <span className="truncate">{formatDateString(departDate)}</span>
                        <span className="text-slate-300 font-normal shrink-0">→</span>
                        <span className="truncate">{formatDateString(returnDate)}</span>
                        <span className="ml-auto text-[11px] bg-[#E11D48]/10 text-[#E11D48] px-2 py-0.5 rounded-full font-bold shrink-0">
                          {Math.max(1, Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24)))} night{Math.max(1, Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24))) > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] lg:w-[1px] lg:h-auto bg-slate-200/80 block shrink-0 hidden lg:block"></div>

                  {/* Guests / Rooms */}
                  <div className="flex-1 relative group/stayspass">
                    <div className="px-5 py-4 h-full cursor-pointer hover:bg-white flex items-center gap-3 overflow-hidden transition-colors duration-200 group/staysguests">
                      <User size={18} className="text-slate-400 group-hover/staysguests:text-[#E11D48] shrink-0 transition-colors duration-200" />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guests &amp; rooms</span>
                        <div className="text-[14px] lg:text-[15px] font-bold text-slate-900 tracking-tight whitespace-nowrap truncate">
                          {rooms} room{rooms > 1 ? 's' : ''}, {(adults + children)} traveler{(adults + children) !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute right-0 top-full pt-2 w-[300px] sm:w-[340px] z-[99] opacity-0 scale-95 pointer-events-none group-hover/stayspass:opacity-100 group-hover/stayspass:scale-100 group-hover/stayspass:pointer-events-auto transition-all duration-200 origin-top-right">
                      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-0 overflow-x-hidden overflow-y-auto max-h-[240px] sm:max-h-[300px]">
                        <div className="p-5 pb-4">
                          
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-[13px] text-slate-700">Adults <span className="text-slate-500">18+</span></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">-</button>
                              <span className="w-4 text-center font-bold text-[14px]">{adults}</span>
                              <button onClick={() => setAdults(Math.min(8, adults + 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">+</button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-[13px] text-slate-700">Children <span className="text-slate-500">0-17</span></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => {
                                 const newCount = Math.max(0, children - 1);
                                 setChildren(newCount);
                                 setChildAges(prev => prev.slice(0, newCount));
                              }} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">-</button>
                              <span className="w-4 text-center font-bold text-[14px]">{children}</span>
                              <button onClick={() => {
                                 if (children >= 6) return;
                                 const newCount = children + 1;
                                 setChildren(newCount);
                                 setChildAges(prev => [...prev, '']);
                              }} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">+</button>
                            </div>
                          </div>

                          {/* Child Ages Dropdowns */}
                          {children > 0 && (
                            <div className="mb-2">
                              {childAges.map((age, idx) => (
                                <div key={idx} className="flex items-center justify-between mt-2">
                                  <div className="text-[12px] text-slate-800">Child's age</div>
                                  <div className="relative">
                                    <select 
                                      value={age}
                                      onChange={(e) => {
                                        const newAges = [...childAges];
                                        newAges[idx] = e.target.value;
                                        setChildAges(newAges);
                                      }}
                                      className="appearance-none bg-transparent border border-slate-400/80 rounded-[6px] pl-3 pr-8 py-1 text-[12px] text-slate-600 focus:outline-none focus:border-slate-500 cursor-pointer min-w-[60px] shadow-sm transition-colors hover:bg-slate-50"
                                    >
                                      <option value="" disabled>Age</option>
                                      {Array.from({length: 18}).map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                      ))}
                                    </select>
                                    <ChevronDown size={14} strokeWidth={2.5} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none" />
                                  </div>
                                </div>
                              ))}
                              <div className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                                Please select your child's age at the time of check-in. This will help us find the room types and discounts best suited to your needs.
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-[13px] text-slate-700">Rooms</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">-</button>
                              <span className="w-4 text-center font-bold text-[14px]">{rooms}</span>
                              <button onClick={() => setRooms(Math.min(10, rooms + 1))} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors text-sm">+</button>
                            </div>
                          </div>
                          
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
                    <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                      <button 
                        onClick={() => { setCarDropoffMode('same'); setCarActiveDropdown(null); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer ${carDropoffMode === 'same' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Same drop-off
                      </button>
                      <button 
                        onClick={() => { setCarDropoffMode('different'); setCarActiveDropdown(null); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer ${carDropoffMode === 'different' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Different drop-off
                      </button>
                    </div>
                  </div>

                  {/* Main search bar */}
                  <div className="flex flex-col md:flex-row items-stretch bg-[#F7F8FA] border border-slate-200/80 rounded-xl transition-all w-full shadow-sm">
                    
                    <div className="flex-1 relative flex flex-col md:flex-row items-stretch w-full dropdown-container">
                      {carDropoffMode === 'same' ? (
                        <div className="flex-1 relative cursor-text">
                          <div 
                            className={`w-full h-full px-5 py-4 relative flex items-center gap-3 transition-colors duration-200 border-b md:border-b-0 md:border-r border-slate-200/80 ${carActiveDropdown === 'pickup' ? 'bg-white' : 'hover:bg-white'}`}
                            onClick={() => setCarActiveDropdown(carActiveDropdown === 'pickup' ? null : 'pickup')}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <MapPin size={18} className={`shrink-0 transition-colors duration-200 ${carActiveDropdown === 'pickup' ? 'text-[#E11D48]' : 'text-slate-400'}`} />
                            <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pick-up location</span>
                              <div className="relative flex items-center w-full">
                                <input 
                                  type="text" 
                                  placeholder="Search city or airport" 
                                  value={carPickupLocation}
                                  onChange={(e) => { setCarPickupLocation(e.target.value); setCarActiveDropdown('pickup'); }}
                                  className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight truncate" 
                                />
                                {carPickupLocation && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCarPickupLocation('');
                                      setCarActiveDropdown('pickup');
                                    }}
                                    className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                                  >
                                    <X size={12} strokeWidth={2.5} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col md:flex-row items-stretch relative">
                          <div className="flex-1 relative w-full">
                            <div 
                              className={`w-full h-full px-5 py-4 relative md:pr-10 flex items-center gap-3 transition-colors duration-200 border-b md:border-b-0 md:border-r border-slate-200/80 ${carActiveDropdown === 'pickup' ? 'bg-white' : 'hover:bg-white'}`}
                              onClick={() => setCarActiveDropdown(carActiveDropdown === 'pickup' ? null : 'pickup')}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <MapPin size={18} className={`shrink-0 transition-colors duration-200 ${carActiveDropdown === 'pickup' ? 'text-[#E11D48]' : 'text-slate-400'}`} />
                              <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pick-up</span>
                                <div className="relative flex items-center w-full">
                                  <input 
                                    type="text" 
                                    placeholder="City or airport" 
                                    value={carPickupLocation}
                                    onChange={(e) => { setCarPickupLocation(e.target.value); setCarActiveDropdown('pickup'); }}
                                    className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight truncate" 
                                  />
                                  {carPickupLocation && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCarPickupLocation('');
                                        setCarActiveDropdown('pickup');
                                      }}
                                      className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                                    >
                                      <X size={12} strokeWidth={2.5} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              const temp = carPickupLocation;
                              setCarPickupLocation(carDropoffLocation);
                              setCarDropoffLocation(temp);
                            }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border-2 border-slate-200 shadow-md hover:border-[#E11D48]/40 flex items-center justify-center cursor-pointer transition-all duration-200"
                          >
                            <ArrowLeftRight size={14} className="text-[#E11D48]" />
                          </button>
                          
                          <div className="flex-1 relative w-full mt-2 md:mt-0">
                            <div 
                              className={`w-full h-full px-5 py-4 md:pl-10 relative flex items-center gap-3 transition-colors duration-200 ${carActiveDropdown === 'dropoff' ? 'bg-white' : 'hover:bg-white'}`}
                              onClick={() => setCarActiveDropdown(carActiveDropdown === 'dropoff' ? null : 'dropoff')}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <MapPin size={18} className={`shrink-0 transition-colors duration-200 ${carActiveDropdown === 'dropoff' ? 'text-[#E11D48]' : 'text-slate-400'}`} />
                              <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drop-off</span>
                                <div className="relative flex items-center w-full">
                                  <input 
                                    type="text" 
                                    placeholder="City or airport" 
                                    value={carDropoffLocation}
                                    onChange={(e) => setCarDropoffLocation(e.target.value)}
                                    className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight truncate" 
                                  />
                                  {carDropoffLocation && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCarDropoffLocation('');
                                      }}
                                      className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                                    >
                                      <X size={12} strokeWidth={2.5} />
                                    </button>
                                  )}
                                </div>
                              </div>
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
                    
                    <div className="w-full h-[1px] md:w-[1px] md:h-auto bg-slate-200/80 block shrink-0 hidden md:block"></div>

                    {/* Dates */}
                    <div className="flex-[1.2] px-5 py-4 relative flex items-center gap-5 transition-colors border-t md:border-t-0 md:border-l-0 border-slate-200/80">
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pick-up — Drop-off</span>
                        <div className="flex items-center gap-3 text-[15px] text-slate-900 whitespace-nowrap">
                        <span 
                          className="font-bold cursor-pointer hover:text-[#E11D48] transition-colors"
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
                          className="font-bold cursor-pointer hover:text-[#E11D48] transition-colors"
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
                  <div className="relative z-30 flex flex-col lg:flex-row items-stretch bg-[#F7F8FA] border border-slate-200/80 rounded-xl transition-all w-full shadow-sm">
                    
                    {/* Location fields */}
                    <div className="flex-1 flex flex-col md:flex-row items-stretch relative">
                      <div className="flex-1 relative w-full">
                        <div 
                          className="w-full h-full px-5 py-4 relative cursor-text hover:bg-white flex items-center gap-3 transition-colors duration-200 border-b md:border-b-0 md:border-r border-slate-200/80 focus-within:bg-white group/pkgfrom"
                          onClick={() => setActiveDropdown(activeDropdown?.type === 'package-from' ? null : { type: 'package-from' })}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <MapPin size={18} className="text-slate-400 group-hover/pkgfrom:text-[#E11D48] shrink-0 transition-colors duration-200" />
                          <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From</span>
                            <div className="relative flex items-center w-full">
                              <input 
                                type="text" 
                                placeholder="Origin city" 
                                value={packageFrom}
                                onChange={(e) => { setPackageFrom(e.target.value); setActiveDropdown({ type: 'package-from' }); }}
                                className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight truncate" 
                              />
                              {packageFrom && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPackageFrom('');
                                    setActiveDropdown({ type: 'package-from' });
                                  }}
                                  className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                                >
                                  <X size={12} strokeWidth={2.5} />
                                </button>
                              )}
                            </div>
                          </div>
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
                          className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 shadow-md hover:border-[#E11D48]/40 flex items-center justify-center text-[#E11D48] transition-all duration-200 cursor-pointer group/swap"
                        >
                          <ArrowLeftRight size={14} className="group-hover/swap:rotate-180 transition-transform duration-300" />
                        </button>
                      </div>

                      <div className="w-full h-[1px] md:w-[1px] md:h-auto bg-slate-200/80 block shrink-0 hidden md:block"></div>
                      
                      <div className="flex-1 relative w-full mt-2 md:mt-0">
                        <div 
                          className="w-full h-full px-5 py-4 pl-10 relative cursor-text hover:bg-white flex items-center gap-3 transition-colors duration-200 focus-within:bg-white group/pkgto"
                          onClick={() => setActiveDropdown(activeDropdown?.type === 'package-to' ? null : { type: 'package-to' })}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <MapPin size={18} className="text-slate-400 group-hover/pkgto:text-[#E11D48] shrink-0 transition-colors duration-200" />
                          <div className="flex flex-col flex-1 min-w-0 pr-4 relative">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">To</span>
                            <div className="relative flex items-center w-full">
                              <input 
                                type="text" 
                                placeholder="Destination city" 
                                value={packageTo}
                                onChange={(e) => { setPackageTo(e.target.value); setActiveDropdown({ type: 'package-to' }) }}
                                className="bg-transparent text-[15px] font-bold text-slate-900 w-full focus:outline-none placeholder-slate-300 tracking-tight truncate" 
                              />
                              {packageTo && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPackageTo('');
                                    setActiveDropdown({ type: 'package-to' });
                                  }}
                                  className="absolute right-0 w-[18px] h-[18px] bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                                >
                                  <X size={12} strokeWidth={2.5} />
                                </button>
                              )}
                            </div>
                          </div>
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

                    <div className="w-full h-[1px] lg:w-[1px] lg:h-auto bg-slate-200/80 block shrink-0 hidden lg:block"></div>

                    {/* Dates */}
                    <div 
                      className="flex-[0.8] px-5 py-4 relative flex items-center gap-3 transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-slate-200/80 hover:bg-white cursor-pointer group/pkgdates"
                      onClick={() => { setCalendarTarget({ type: 'depart', index: null }); setIsCalendarOpen(true); }}
                    >
                      <CalendarDays size={18} className="text-slate-400 group-hover/pkgdates:text-[#E11D48] shrink-0 transition-colors duration-200" />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Dates</span>
                        <div className="flex items-center gap-1.5 text-[14px] lg:text-[15px] text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                          <span className="font-bold">{formatDateString(departDate).split(',')[0]} {departDate.getDate()} {departDate.toLocaleString('default', {month:'short'})}</span>
                          <span className="text-slate-300 font-normal shrink-0">→</span>
                          <span className="font-bold">{formatDateString(returnDate).split(',')[0]} {returnDate ? `${returnDate.getDate()} ${returnDate.toLocaleString('default', {month:'short'})}` : ''}</span>
                          {departDate && returnDate && (
                            <span className="ml-1 px-2 py-0.5 bg-[#E11D48]/10 text-[#E11D48] text-[11px] font-bold rounded-full hidden xl:inline-block">
                              {Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24))} nights
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[1px] lg:w-[1px] lg:h-auto bg-slate-200/80 block shrink-0 hidden lg:block"></div>

                    {/* Travelers */}
                    <div className="flex-[0.7] px-5 py-4 relative flex items-center transition-colors duration-200 hover:bg-white cursor-pointer group/pkgtrav"
                         onClick={() => setActiveDropdown(activeDropdown?.type === 'package-travelers' ? null : { type: 'package-travelers' })}
                         onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-3 text-[14px] lg:text-[15px] text-slate-800 whitespace-nowrap w-full">
                        <User size={18} className="text-slate-400 group-hover/pkgtrav:text-[#E11D48] transition-colors duration-200 shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Travelers</span>
                          <span className="font-bold text-slate-900 tracking-tight w-full truncate">
                            {packageAdults + packageChildren} traveler{packageAdults + packageChildren > 1 ? 's' : ''}
                          </span>
                        </div>
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
                                    onClick={(e) => { e.stopPropagation(); setPackageAdults(Math.min(8, packageAdults + 1)) }}
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
                                      if (packageChildren >= 6) return;
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
              <div className="mt-5 flex flex-col md:flex-row md:items-center justify-end gap-3 z-20 relative">
                <button className="w-full md:w-auto group relative px-12 py-3.5 bg-[#E11D48] hover:bg-[#C81040] text-white font-extrabold text-[15px] rounded-xl shadow-[0_4px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_28px_rgba(225,29,72,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden active:scale-[0.98]">
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Search size={18} strokeWidth={2.5} />
                    <span>Search</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
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
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                {activeCategory === 'stays' ? 'Check-in' : 'Depart'}
                              </div>
                              <div className={`text-[15px] font-extrabold ${calendarTarget.type === 'depart' ? 'text-[#E11D48]' : 'text-slate-800'}`}>{formatDateString(departDate)}</div>
                            </button>
                            <div className="w-px bg-slate-100 my-3" />
                            {(tripType !== 'one-way' || activeCategory === 'stays') && (
                              <button onClick={() => setCalendarTarget({ type: 'return', index: null })} className={`flex-1 text-left px-5 py-4 transition-all ${calendarTarget.type === 'return' ? 'border-b-[3px] border-[#E11D48]' : 'border-b-[3px] border-transparent hover:bg-slate-50'}`}>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                  {activeCategory === 'stays' ? 'Check-out' : 'Return'}
                                </div>
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

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
        onOpenRegister={() => {
          setIsSignInModalOpen(false);
          setIsRegisterPageOpen(true);
        }}
      />
      
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currenciesList={currenciesList}
      />

      <CountryModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countriesList={countriesList}
      />

      <LiveBookingWidget />

      <Footer />

      </div>
    </div>
  )
}

export default App

