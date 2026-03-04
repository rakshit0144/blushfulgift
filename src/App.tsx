import { ShoppingBag, Heart, Menu, X, Instagram, MessageCircle, Star, ShieldCheck, Truck, Package, Droplets, Clock } from 'lucide-react';
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
}

// --- Data ---

const PRODUCTS: Product[] = [
  {
    id: 'wooden-frames-square',
    name: 'Wooden Frames (Square)',
    category: 'Wooden Frames',
    image: 'https://picsum.photos/seed/resin1/800/800',
    options: [
      { label: '10×10', price: 3500 },
      { label: '12×12', price: 3999 },
      { label: '15×15', price: 4999, highlight: true },
      { label: '18×18', price: 6999 },
      { label: '20×20', price: 8999 },
    ],
    note: 'Custom sizes available. Sealed with our premium Eternity-Grade resin. ✨'
  },
  {
    id: 'wooden-frames-rectangle',
    name: 'Wooden Frames (Rectangle)',
    category: 'Wooden Frames',
    image: 'https://picsum.photos/seed/resin2/800/800',
    options: [
      { label: '12×9', price: 3500 },
      { label: '12×16', price: 4500 },
      { label: '14×18', price: 7250 },
      { label: '16×24', price: 8999 },
    ],
    note: '16×24 available on request. Every piece is a Treasured memory. 🧸'
  },
  {
    id: 'mould-preservation',
    name: 'Mould-Based Preservations (Round / Agate)',
    category: 'Mould-Based',
    image: 'https://picsum.photos/seed/resin3/800/800',
    options: [
      { label: '10 inch Without LED', price: 2999 },
      { label: '10 inch With LED', price: 3499 },
      { label: '12 inch Without LED', price: 3499 },
      { label: '12 inch With LED', price: 3899 },
    ],
    note: 'More shapes available on demand. Experience our Express Magic! ⏳'
  },
  {
    id: 'led-blocks',
    name: 'Thick Deep LED Blocks',
    category: 'LED Blocks',
    image: 'https://picsum.photos/seed/resin4/800/800',
    options: [
      { label: 'Circular 8 inch With LED', price: 3499 },
    ],
    note: 'Other shapes available. A Snug home for your flowers. 🌸'
  }
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-4 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row: Search, Logo, Icons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 hidden md:block">
            <button className="text-white/60 hover:text-gold transition-colors">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-5xl font-decorative tracking-widest text-white text-glow">
              BlushfulGifts
            </h1>
          </div>

          <div className="flex-1 flex justify-end items-center gap-6">
            <div className="hidden md:flex gap-4 text-white/40">
              <Instagram size={18} className="hover:text-gold cursor-pointer transition-colors" />
              <MessageCircle size={18} className="hover:text-gold cursor-pointer transition-colors" />
            </div>
            <button onClick={onOpenCart} className="relative hover:text-gold transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-dark-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation */}
        <nav className="hidden md:flex justify-center gap-12 text-[11px] uppercase tracking-[0.3em] font-medium text-white/70">
          <a href="#home" className="hover:text-gold transition-colors">Home</a>
          <a href="#shop" className="hover:text-gold transition-colors">New In</a>
          <a href="#shop" className="hover:text-gold transition-colors">Shop</a>
          <a href="#about" className="hover:text-gold transition-colors">About</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (item: CartItem) => void }> = ({ product, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(product.options[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group text-center"
    >
      <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm border border-white/5 group-hover:border-gold/30 transition-all duration-700">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={() => onAddToCart({
              id: `${product.id}-${selectedOption.label}`,
              productId: product.id,
              name: product.name,
              optionLabel: selectedOption.label,
              price: selectedOption.price,
              quantity: 1,
              image: product.image
            })}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 text-xs uppercase tracking-widest hover:bg-gold hover:text-dark-bg transition-all"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-serif tracking-wide text-white/90">{product.name}</h3>
        <div className="flex flex-col items-center gap-2">
          <select 
            value={selectedOption.label}
            onChange={(e) => {
              const opt = product.options.find(o => o.label === e.target.value);
              if (opt) setSelectedOption(opt);
            }}
            className="bg-transparent text-[10px] uppercase tracking-widest text-white/40 border-none focus:ring-0 cursor-pointer hover:text-gold"
          >
            {product.options.map((opt) => (
              <option key={opt.label} value={opt.label} className="bg-dark-surface">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="text-gold font-serif text-lg">₹{selectedOption.price.toLocaleString()}</div>
        </div>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemove: (id: string) => void
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
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                  <ShoppingBag size={48} />
                  <p>Your cart is empty</p>
                  <button onClick={onClose} className="text-gold underline">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-white/40 mb-2">{item.optionLabel}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/10 rounded-md">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 hover:text-gold">-</button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 hover:text-gold">+</button>
                        </div>
                        <div className="text-gold">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-red-500"><X size={16} /></button>
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
                  <button className="w-full bg-gold text-dark-bg py-4 rounded-xl font-bold hover:bg-gold-light transition-colors uppercase tracking-widest block">
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
    <div className="min-h-screen selection:bg-gold selection:text-dark-bg">
      {/* Announcement Bar */}
      <div className="bg-dark-bg text-white/60 py-2 text-center text-[9px] uppercase tracking-[0.4em] z-[60] relative border-b border-white/5">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={10} className="text-gold" />
          Free Shipping for Orders Over ₹5000
          <ShieldCheck size={10} className="text-gold" />
        </span>
      </div>

      <Navbar cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80" 
            alt="Magical Forest" 
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl pt-32 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="text-5xl md:text-9xl mb-8 leading-tight text-white text-glow font-decorative">
              Memories <br/> <span className="md:ml-24">Magic</span>
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
            >
              <div className="w-12 h-px bg-gold/50 hidden md:block" />
              <p className="text-white/60 text-sm uppercase tracking-[0.5em] font-light">
                Building the Heartbeat of Gifting, from the Heart. 🌸
              </p>
              <div className="w-12 h-px bg-gold/50 hidden md:block" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col md:flex-row gap-4 justify-center mt-12"
            >
              <a href="#shop" className="bg-gold text-dark-bg px-10 py-4 rounded-full font-bold hover:bg-gold-light transition-all duration-300 uppercase tracking-widest text-sm glow-gold block">
                Shop Now
              </a>
              <button className="border border-white/20 hover:border-gold hover:text-gold px-10 py-4 rounded-full font-bold transition-all duration-300 uppercase tracking-widest text-sm backdrop-blur-sm w-full">
                Custom Order
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Latest Arrivals Section */}
      <section id="shop" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl mb-6 font-decorative tracking-wide">Our Latest Arrivals</h2>
          <div className="w-24 h-px bg-gold/30 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Welcome Section (Split Layout) */}
      <section className="py-32 relative overflow-hidden bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-6xl leading-tight font-decorative">Welcome to the <br/><span className="text-white">Heartbeat</span></h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
              Step into a world of enchantment and magic, where your most <span className="text-gold">Treasured</span> memories are kept <span className="text-gold">Snug</span> and safe. At BlushfulGifts, we create <span className="text-gold">Heartfelt</span> treasures with <span className="text-gold">Express</span> speed, ensuring your love story <span className="text-gold">Twinkles</span> <span className="text-gold">Forever</span>. ✨
            </p>
            <button className="group relative px-10 py-4 overflow-hidden border border-white/20 transition-all hover:border-gold">
              <span className="relative z-10 text-xs uppercase tracking-[0.3em] group-hover:text-dark-bg transition-colors">More About Us</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
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
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-decorative">Browse by Collections</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Wooden Frames', 'Mould-Based', 'LED Blocks'].map((cat, i) => (
            <motion.div 
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-sm overflow-hidden cursor-pointer border border-white/5"
            >
              <img 
                src={`https://picsum.photos/seed/coll${i}/800/600`} 
                alt={cat} 
                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl tracking-widest uppercase font-decorative text-white group-hover:scale-110 transition-transform">{cat}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 nebula-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
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

      {/* Heartfelt Policies Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-decorative">Heartfelt Policies 🌸</h2>
          <p className="text-white/40 uppercase tracking-widest text-xs mt-4">Transparent & Adorable</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl mb-6 font-decorative">Client Stories</h2>
          <div className="flex justify-center gap-2 text-gold/40">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
      <footer className="bg-dark-bg border-t border-white/5 pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 nebula-bg opacity-30" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-32 relative z-10">
          <div className="space-y-8">
            <div className="text-3xl font-decorative tracking-widest text-white text-glow">BlushfulGifts</div>
            <p className="text-white/30 text-sm leading-relaxed font-light">
              Preserving your most cherished wedding memories through the art of high-end resin preservation. Handcrafted with magic in every detail.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-gold transition-all"><Instagram size={20} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-all"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-gold transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Custom Orders</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Care Instructions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>omkarathakur763@gmail.com</li>
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
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
}
