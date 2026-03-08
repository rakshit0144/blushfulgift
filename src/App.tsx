import { ShoppingBag, Heart, Menu, X, Instagram, MessageCircle, Star, ShieldCheck, Truck, Package, Droplets, Clock, ChevronUp, Camera, Home, Phone, CircleSlash, Gem, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// --- Types ---

interface ProductOption {
  label: string;
  price: number;
  highlight?: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  options: ProductOption[];
  note?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  optionLabel: string;
  price: number;
  quantity: number;
  image: string;
  referencePhoto?: File | null;
  eventDate?: string;
  brideName?: string;
  groomName?: string;
}

// --- Data ---

const BRAND_LOGO = "https://i.pinimg.com/736x/a2/93/af/a293aff7883276e7111da38b7af1c8ac.jpg";

const PRODUCTS: Product[] = [
  // LED Blocks
  {
    id: 'led-block-8',
    name: '8 inch Circular LED Block',
    category: 'LED Blocks',
    image: 'https://i.pinimg.com/736x/cc/45/8b/cc458b9afd29371266f96bd1f52f2c4f.jpg',
    options: [{ label: 'Standard', price: 3499 }],
    note: 'A Snug home for your flowers. 🌸'
  },
  // Flower Clocks
  {
    id: 'clock-10',
    name: '10 inch Flower Clock',
    category: 'Flower Clocks',
    image: 'https://i.pinimg.com/736x/3d/f7/e6/3df7e6755e83413f4cb810544e3f495b.jpg',
    options: [
      { label: 'Without LED', price: 2999 },
      { label: 'With LED', price: 3499 },
    ],
    note: 'Experience our Express Magic! ⏳'
  },
  {
    id: 'clock-12',
    name: '12 inch Flower Clock',
    category: 'Flower Clocks',
    image: 'https://i.pinimg.com/736x/3d/f7/e6/3df7e6755e83413f4cb810544e3f495b.jpg',
    options: [
      { label: 'Without LED', price: 3499 },
      { label: 'With LED', price: 3899 },
    ],
    note: 'Experience our Express Magic! ⏳'
  },
  // Varmala Preservations - Rectangular
  {
    id: 'varmala-rect-10x12',
    name: '10x12 inch Rectangular Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/75/c2/ad/75c2ad51d2cf34b10f60560baaf577fd.jpg',
    options: [{ label: 'Standard', price: 3500 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-rect-12x15',
    name: '12x15 inch Rectangular Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/75/c2/ad/75c2ad51d2cf34b10f60560baaf577fd.jpg',
    options: [{ label: 'Standard', price: 3999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-rect-15x18',
    name: '15x18 inch Rectangular Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/75/c2/ad/75c2ad51d2cf34b10f60560baaf577fd.jpg',
    options: [{ label: 'Standard', price: 4999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-rect-18x24',
    name: '18x24 inch Rectangular Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/75/c2/ad/75c2ad51d2cf34b10f60560baaf577fd.jpg',
    options: [{ label: 'Standard', price: 6999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  // Varmala Preservations - Square
  {
    id: 'varmala-sq-10x10',
    name: '10x10 inch Square Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/41/51/30/415130be818e26ef33a801148977bcb9.jpg',
    options: [{ label: 'Standard', price: 3500 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-sq-12x12',
    name: '12x12 inch Square Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/41/51/30/415130be818e26ef33a801148977bcb9.jpg',
    options: [{ label: 'Standard', price: 3999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-sq-15x15',
    name: '15x15 inch Square Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/41/51/30/415130be818e26ef33a801148977bcb9.jpg',
    options: [{ label: 'Standard', price: 4999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-sq-18x18',
    name: '18x18 inch Square Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/41/51/30/415130be818e26ef33a801148977bcb9.jpg',
    options: [{ label: 'Standard', price: 6999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'varmala-sq-20x20',
    name: '20x20 inch Square Frame',
    category: 'Varmala Preservations',
    image: 'https://i.pinimg.com/736x/41/51/30/415130be818e26ef33a801148977bcb9.jpg',
    options: [{ label: 'Standard', price: 8999 }],
    note: 'Preserve your sacred Varmala in our premium Eternity-Grade resin. ✨'
  }
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', href: '#shop' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-gradient-to-b from-black/60 to-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Row: Search, Logo, Icons */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-0 md:mb-6">
            <div className="flex items-center">
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-gold transition-all active:scale-95 shadow-lg"
                  aria-label="Open Menu"
                >
                  <Menu size={20} />
                </button>
              </div>

              <div className="hidden md:block">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 hover:border-white/20 rounded-full text-white/60 hover:text-gold transition-all"
                  aria-label="Open Menu"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
            
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <img 
                  src={BRAND_LOGO} 
                  alt="BlushfulGifts Logo" 
                  className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-gold/30 shadow-lg object-cover flex-shrink-0" 
                  referrerPolicy="no-referrer" 
                />
                <h1 className="text-xl sm:text-2xl md:text-5xl font-decorative tracking-wider md:tracking-widest text-white text-glow whitespace-nowrap">
                  BlushfulGifts
                </h1>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 md:gap-6">
              <div className="hidden md:flex gap-4 text-white/40">
                <a href="https://www.instagram.com/blushfulgifts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://wa.me/918882678712" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
              <button 
                onClick={onOpenCart} 
                className="relative w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-gold transition-all active:scale-95 shadow-lg flex-shrink-0"
                aria-label="Open Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-dark-bg text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation */}
          <nav className="hidden md:flex justify-center gap-12 text-[11px] uppercase tracking-[0.3em] font-medium text-white/70">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-gold transition-colors">{link.name}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[80%] max-w-xs bg-dark-surface z-[101] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <img src={BRAND_LOGO} alt="Logo" className="w-10 h-10 rounded-full border border-gold/30 object-cover" referrerPolicy="no-referrer" />
                  <span className="text-xl font-decorative tracking-widest text-gold">Blushful</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/40"><X size={24} /></button>
              </div>
              
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-serif text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-white/5 space-y-6">
                <div className="flex gap-6 text-white/40">
                  <a href="https://www.instagram.com/blushfulgifts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="https://wa.me/918882678712" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    <MessageCircle size={24} />
                  </a>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/20">
                  Handcrafted with Magic ✨
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  onViewDetails: (product: Product) => void;
}> = ({ product, onViewDetails }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group text-center cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm border border-white/5 group-hover:border-gold/30 transition-all duration-700 shadow-lg">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
        
        {/* Customizable Tag Overlay */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-dark-bg/80 backdrop-blur-md border border-gold/50 rounded-full px-3 py-1 shadow-xl">
            <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-bold">Completely Customizable</span>
          </div>
        </div>

        {/* View Details Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="px-6 py-3 bg-gold text-dark-bg text-[10px] uppercase tracking-widest font-bold rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Details
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="inline-block mb-1">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold/60 font-medium">Handcrafted Magic</span>
          </div>
          <h3 className="text-lg font-serif tracking-wide text-white/90">{product.name}</h3>
        </div>
        <div className="text-gold font-serif">Starting from ₹{Math.min(...product.options.map(o => o.price)).toLocaleString()}</div>
      </div>
    </motion.div>
  );
};

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onBuyNow 
}: { 
  product: Product | null, 
  isOpen: boolean, 
  onClose: () => void,
  onAddToCart: (item: CartItem) => void,
  onBuyNow: (item: CartItem) => void
}) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
  const [referencePhoto, setReferencePhoto] = useState<File | null>(null);
  const [eventDate, setEventDate] = useState('');
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedOption(product.options[0]);
      setReferencePhoto(null);
      setEventDate('');
      setBrideName('');
      setGroomName('');
    }
  }, [product]);

  if (!product || !selectedOption) return null;

  const item: CartItem = {
    id: `${product.id}-${selectedOption.label}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    optionLabel: selectedOption.label,
    price: selectedOption.price,
    quantity: 1,
    image: product.image,
    referencePhoto: referencePhoto,
    eventDate: eventDate,
    brideName: brideName,
    groomName: groomName
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-dark-surface border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 backdrop-blur-md rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-2 block">
                  {product.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{product.name}</h2>
                <div className="w-12 h-px bg-gold/50 mb-6" />
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Description</h4>
                  <p className="text-white/60 leading-relaxed font-light italic">
                    {product.note || "Preserve your most cherished memories in our premium Eternity-Grade resin. Each piece is handcrafted with magic and care to ensure your love story twinkles forever. ✨"}
                  </p>
                </div>

                {/* Product Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                  {[
                    { icon: <Video size={14} />, text: "Making Video sharing" },
                    { icon: <Home size={14} />, text: "Home Pick & Drop Facility" },
                    { icon: <Phone size={14} />, text: "On Call Customization" },
                    { icon: <Truck size={14} />, text: "7–12 Days Delivery Time" },
                    { icon: <CircleSlash size={14} />, text: "No Cash on Delivery" },
                    { icon: <Gem size={14} />, text: "Extra Shine Resin" },
                  ].map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 px-3 py-2 border border-[#E91E63] bg-white rounded-md shadow-sm"
                    >
                      <span className="text-[#E91E63]">{feature.icon}</span>
                      <span className="text-[10px] font-semibold text-gray-800 tracking-tight">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 mt-auto">
                {/* Options Selector */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Select Size / Option</label>
                  <div className="grid grid-cols-1 gap-2">
                    {product.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedOption(opt)}
                        className={`flex justify-between items-center px-6 py-3 rounded-xl border transition-all duration-300 ${selectedOption.label === opt.label ? 'bg-gold/10 border-gold text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
                      >
                        <span className="text-xs uppercase tracking-widest">{opt.label}</span>
                        <span className="text-gold font-serif">₹{opt.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reference Photo */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Add Reference Photo (Optional)</label>
                  <label className={`flex items-center justify-center gap-3 w-full border rounded-xl py-4 text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 ${referencePhoto ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/40 hover:border-gold/50'}`}>
                    <Camera size={18} className={referencePhoto ? 'animate-pulse' : ''} />
                    <span className="truncate max-w-[200px]">
                      {referencePhoto ? referencePhoto.name : 'Upload Image'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={(e) => setReferencePhoto(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                {/* Customization Fields */}
                <div className="mt-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif text-gray-900 mb-1">Place Customised order</h3>
                    <p className="text-xs text-gray-500 font-medium">Fill Below Details Which will be used during product making</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1">Event Date (Optional)</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] outline-none transition-all text-gray-900"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1">Bride Name (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Bride Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] outline-none transition-all text-gray-900"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1">Groom Name (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Groom Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] outline-none transition-all text-gray-900"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => {
                      onAddToCart(item);
                      onClose();
                    }}
                    className="bg-white/5 border border-gold/30 text-gold py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-gold hover:text-dark-bg transition-all duration-500"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => {
                      onBuyNow(item);
                      onClose();
                    }}
                    className="bg-gold text-dark-bg py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-gold-light transition-all duration-500"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal = ({ isOpen, onClose, items, total }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  total: number
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    referencePhoto: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const orderDetails = items.map(item => {
      const photoNote = item.referencePhoto ? ' [Reference Photo Attached]' : '';
      let customizationDetails = '';
      if (item.eventDate) customizationDetails += `\n   - Event Date: ${item.eventDate}`;
      if (item.brideName) customizationDetails += `\n   - Bride: ${item.brideName}`;
      if (item.groomName) customizationDetails += `\n   - Groom: ${item.groomName}`;
      
      return `- ${item.name} (${item.optionLabel})${photoNote} x ${item.quantity}: ₹${(item.price * item.quantity).toLocaleString()}${customizationDetails}`;
    }).join('\n');

    const message = `*New Order from BlushfulGifts*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n` +
      `*General Reference Photo:* ${formData.referencePhoto ? 'Yes (Will share on WhatsApp)' : 'Not provided'}\n\n` +
      `*Order Summary:*\n${orderDetails}\n\n` +
      `*Total Amount:* ₹${total.toLocaleString()}\n\n` +
      `Please confirm the order and share payment details. ✨`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918882678712?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-dark-surface border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        >
          {step === 'details' ? (
            <div className="grid md:grid-cols-2 max-h-[90vh] overflow-y-auto md:max-h-none">
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02]">
                <h2 className="text-xl md:text-2xl font-serif mb-6 text-gold">
                  Order Summary
                </h2>
                <div className="space-y-4 max-h-[200px] md:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="text-xs md:text-sm font-medium">{item.name}</h4>
                        <p className="text-[9px] md:text-[10px] text-white/40">{item.optionLabel} x {item.quantity}</p>
                      </div>
                      <div className="text-xs md:text-sm">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-lg md:text-xl font-serif">
                    <span>Total</span>
                    <span className="text-gold">₹{total.toLocaleString()}</span>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-white/30 mt-2 italic">* 60% advance required to lock schedule as per Blushful Policies.</p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl md:text-2xl font-serif">Shipping Details</h2>
                  <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      required
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                      required
                      type="tel" 
                      placeholder="Phone" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Full Address" 
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="City" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="Pincode" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Reference Photo (Optional)</label>
                    <div className="relative group/file">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id="ref-photo"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({...formData, referencePhoto: file});
                        }}
                      />
                      <label 
                        htmlFor="ref-photo"
                        className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm cursor-pointer hover:border-gold transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold">
                          <Camera size={16} />
                        </div>
                        <span className="text-white/60 flex-1 truncate">
                          {formData.referencePhoto ? formData.referencePhoto.name : 'Upload reference photo...'}
                        </span>
                        {formData.referencePhoto && (
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setFormData({...formData, referencePhoto: null});
                            }}
                            className="text-white/40 hover:text-red-500"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </label>
                    </div>
                    {formData.referencePhoto && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-white/10"
                      >
                        <img 
                          src={React.useMemo(() => formData.referencePhoto ? URL.createObjectURL(formData.referencePhoto) : '', [formData.referencePhoto])} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                        />
                      </motion.div>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-gold text-dark-bg py-4 rounded-xl font-bold hover:bg-gold-light transition-all duration-300 uppercase tracking-widest text-sm mt-4">
                    Confirm Order via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-16 text-center space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-gold" size={32} md:size={40} fill="currentColor" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif">Order Received!</h2>
              <p className="text-white/60 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Thank you for trusting BlushfulGifts with your treasured memories. Your order details have been transferred to our artisan at <span className="text-white">+91 8882678712</span>. We will contact you shortly for the next steps! ✨
              </p>
              <button 
                onClick={onClose}
                className="bg-gold text-dark-bg px-8 md:px-12 py-3 md:py-4 rounded-full font-bold hover:bg-gold-light transition-all uppercase tracking-widest text-xs md:text-sm"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemove: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-surface z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-serif">Your Cart</h2>
              <button onClick={onClose} className="hover:text-gold transition-colors"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                  <ShoppingBag size={48} />
                  <p>Your cart is empty</p>
                  <button onClick={onClose} className="text-gold underline">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        {item.name}
                        {item.referencePhoto && <Camera size={12} className="text-gold animate-pulse" />}
                      </h4>
                      <p className="text-[10px] md:text-xs text-white/40 mb-2">
                        {item.optionLabel}
                        {item.referencePhoto && <span className="ml-2 text-gold/60 italic">(Photo attached)</span>}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/10 rounded-md">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1.5 hover:text-gold">-</button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1.5 hover:text-gold">+</button>
                        </div>
                        <div className="text-gold text-sm md:text-base">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-red-500 p-1"><X size={16} /></button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-lg font-serif">
                  <span>Total</span>
                  <span className="text-gold">₹{total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-gold text-dark-bg py-4 rounded-xl font-bold hover:bg-gold-light transition-colors uppercase tracking-widest block"
                >
                  Secure Checkout
                </button>
                <div className="flex justify-center gap-4 opacity-40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 invert" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4 invert" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const buyNow = (item: CartItem) => {
    setCheckoutItems([item]);
    setIsCheckoutOpen(true);
  };

  const handleCartCheckout = () => {
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-dark-bg relative">
      {/* Fairy Bokeh Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bokeh w-64 h-64 bg-fairy-purple/20 top-1/4 -left-32" />
        <div className="bokeh w-96 h-96 bg-fairy-pink/10 bottom-1/4 -right-48" style={{ animationDelay: '-2s' }} />
        <div className="bokeh w-48 h-48 bg-gold/10 top-3/4 left-1/2" style={{ animationDelay: '-5s' }} />
        <div className="absolute inset-0 fairy-dust" />
      </div>


      <Navbar cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />

      {/* Latest Arrivals Section */}
      <section id="shop" className="pt-32 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-6xl mb-4 md:mb-6 font-decorative tracking-wide text-glow">Our Collections</h2>
          <div className="w-16 md:w-24 h-px bg-gold/30 mx-auto glow-gold mb-12" />
          
          {/* Category Navigation Bar */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {Array.from(new Set(PRODUCTS.map(p => p.category))).map(category => (
              <a 
                key={category} 
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold hover:border-gold hover:text-gold transition-all duration-300"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-24">
          {Array.from(new Set(PRODUCTS.map(p => p.category))).map(category => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-40 md:scroll-mt-56">
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-2xl md:text-4xl font-serif text-gold tracking-[0.2em] uppercase whitespace-nowrap">{category}</h3>
                <div className="h-px bg-gold/20 flex-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {PRODUCTS.filter(p => p.category === category).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Section (Split Layout) */}
      <section id="about" className="py-16 md:py-32 relative overflow-hidden bg-dark-bg z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-6xl leading-tight font-decorative">Welcome to the <br/><span className="text-white">BlushfulGifts</span></h2>
            <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto md:mx-0">
              Step into a world of enchantment and magic, where your most <span className="text-gold">Treasured</span> memories are kept <span className="text-gold">Snug</span> and safe. At BlushfulGifts, we create <span className="text-gold">Heartfelt</span> treasures with <span className="text-gold">Express</span> speed, ensuring your love story <span className="text-gold">Twinkles</span> <span className="text-gold">Forever</span>. ✨
            </p>
            <a href="#why-us" className="inline-block">
              <button className="group relative px-8 md:px-10 py-3 md:py-4 overflow-hidden border border-white/20 transition-all hover:border-gold">
                <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.3em] group-hover:text-dark-bg transition-colors">More About Us</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Memories Effect Background */}
            <div className="absolute -inset-10 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="relative rounded-sm overflow-hidden aspect-[4/5] border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80" 
                alt="Ethereal Portrait" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Browse by Collections */}
      <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-decorative">Browse by Collections</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {['Varmala Preservations', 'Flower Clocks', 'LED Blocks'].map((cat, i) => (
            <motion.a 
              href="#shop"
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-sm overflow-hidden cursor-pointer border border-white/5"
            >
              <img 
                src={i === 2 ? "https://i.pinimg.com/736x/75/c2/ad/75c2ad51d2cf34b10f60560baaf577fd.jpg" : `https://picsum.photos/seed/coll${i}/800/600`} 
                alt={cat} 
                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl tracking-widest uppercase font-decorative text-white group-hover:scale-110 transition-transform">{cat}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 md:py-32 bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 nebula-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {[
              { icon: <Droplets className="text-gold" />, title: "Eternity-Grade Resin" },
              { icon: <Clock className="text-gold" />, title: "Express Magic Speed" },
              { icon: <ShieldCheck className="text-gold" />, title: "Eternity Seal Protection" },
              { icon: <Package className="text-gold" />, title: "Heartfelt Packaging" },
              { icon: <Truck className="text-gold" />, title: "Express Pan India Delivery" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-6 group"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:glow-gold transition-all duration-700">
                  {item.icon}
                </div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 group-hover:text-gold transition-colors">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blushful Policies Section */}
      <section id="policies" className="py-16 md:py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-decorative">Blushful Policies 🌸</h2>
          <p className="text-white/40 uppercase tracking-widest text-[10px] md:text-xs mt-4">Transparent & Adorable</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {[
            { q: "Can I get a discount?", a: "To keep our 'Gifting in Minutes' speed and use our premium Eternity-Grade resin, our prices are fixed. However, I’d love to tuck in a surprise Tiny Treasure keychain just for you! ✨" },
            { q: "What is the booking process?", a: "Our system automatically triggers your professional pickup and locks in your artisan’s schedule the moment the 60% booking fee is received! ⏳" },
            { q: "Can I see work-in-progress photos?", a: "We love your excitement! To ensure our artists stay focused on making your piece perfect, we keep the final look a 'Grand Reveal' surprise. 🧸" },
            { q: "What if I want to change the design?", a: "Since your memory is already in the 'Eternity Seal' phase, we can't change the layout. But don't worry, it’s looking absolutely adorable! 🌸" },
            { q: "Do you offer refunds?", a: "As each piece is a custom-made memory, we don't offer refunds. However, if there’s any issue, we will make it right for you immediately! Forever yours. ✨" },
            { q: "Can I visit your workshop?", a: "Currently we're serving online only to maintain our 'Express Magic' flow. You can see our 'Behind the Scenes' on our Reels! ⏳" }
          ].map((policy, i) => (
            <div key={i} className="p-8 rounded-sm border border-white/5 bg-white/[0.01]">
              <h4 className="text-gold font-serif text-xl mb-4">{policy.q}</h4>
              <p className="text-white/50 font-light leading-relaxed">{policy.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-6xl mb-4 md:mb-6 font-decorative">Client Stories</h2>
          <div className="flex justify-center gap-2 text-gold/40">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} md:size={14} fill="currentColor" />)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { name: "Ananya Sharma", text: "The preservation is absolutely magical. It brings back all the emotions of my wedding day every time I look at it." },
            { name: "Rahul Verma", text: "Exceptional quality and very professional service. The LED block is a stunning addition to our home decor." },
            { name: "Priya Patel", text: "I was worried about shipping my varmala, but the team guided me perfectly. The final piece is beyond beautiful." }
          ].map((t, i) => (
            <motion.div 
              key={i}
              className="p-10 rounded-sm border border-white/5 bg-white/[0.02] relative group hover:border-gold/20 transition-colors"
            >
              <div className="text-gold text-5xl font-serif absolute top-6 left-8 opacity-10 group-hover:opacity-20 transition-opacity">“</div>
              <p className="text-white/50 italic mb-8 relative z-10 leading-relaxed text-lg">
                {t.text}
              </p>
              <div className="font-decorative text-gold text-sm tracking-widest">— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark-bg border-t border-white/5 pt-16 md:pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 nebula-bg opacity-30" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-32 relative z-10">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <img src={BRAND_LOGO} alt="Logo" className="w-12 h-12 rounded-full border border-gold/30 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <div className="text-2xl md:text-3xl font-decorative tracking-widest text-white text-glow">BlushfulGifts</div>
            </div>
            <p className="text-white/30 text-xs md:text-sm leading-relaxed font-light">
              Preserving your most cherished wedding memories through the art of high-end resin preservation. Handcrafted with magic in every detail.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <a href="https://www.instagram.com/blushfulgifts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/918882678712" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6 md:mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#shop" className="hover:text-gold transition-colors">Collections</a></li>
              <li><a href="#why-us" className="hover:text-gold transition-colors">Our Process</a></li>
              <li><a href="#policies" className="hover:text-gold transition-colors">Care Instructions</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6 md:mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#policies" className="hover:text-gold transition-colors">FAQ</a></li>
              <li><a href="#policies" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#policies" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#policies" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6 md:mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>omkarathakur763@gmail.com</li>
              <li>+91 8882678712</li>
              <li>Based in India</li>
              <li>Pan India Shipping</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/20">
          <div>© 2024 BlushfulGifts. Building the Heartbeat of Gifting, from the Heart. 🌸</div>
          <div className="flex gap-8">
            <span>Sending you hearts, Blushfulgifts Team ✨</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/918882678712" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={buyNow}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={handleCartCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        total={checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
      />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-8 w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gold hover:text-dark-bg transition-all z-50"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
