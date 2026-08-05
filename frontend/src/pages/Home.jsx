import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Headphones, Plus } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error("API Fetch Error:", err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-20 pb-16 px-4 sm:px-6 lg:px-8 space-y-28 relative overflow-hidden font-sans">
      
      {/* 🌟 Luxury Ambient Glow Background */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ============================================================
          1. HERO SECTION 
      ============================================================ */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            The Future of <br />
            <span className="text-white">Digital Luxury</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            Experience unparalleled performance and uncompromising design. Our latest collection redefines what's possible in high-end hardware.
          </p>
          <div className="pt-2">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
            >
              Shop Collection <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl bg-slate-900/40"
        >
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80" 
            alt="Digital Luxury Tech Hardware" 
            className="w-full h-[320px] sm:h-[380px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </section>

      {/* ============================================================
          2. VALUE PROPOSITION BAR (Fast Delivery, Secure, Support)
      ============================================================ */}
      <section className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6">
        <div className="bg-[#0b1021]/80 border border-slate-800/80 p-6 rounded-2xl flex items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center border border-slate-800 shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Fast Delivery</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Global expedited shipping on all premium hardware orders.</p>
          </div>
        </div>

        <div className="bg-[#0b1021]/80 border border-slate-800/80 p-6 rounded-2xl flex items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center border border-slate-800 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Secure Payment</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Military-grade encryption for all your transactions.</p>
          </div>
        </div>

        <div className="bg-[#0b1021]/80 border border-slate-800/80 p-6 rounded-2xl flex items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center border border-slate-800 shrink-0">
            <Headphones size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">24/7 Support</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Dedicated concierge service for our elite clientele.</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. FEATURED EQUIPMENT (Dynamic API + Fallbacks)
      ============================================================ */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Equipment</h2>
          <Link to="/products" className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.slice(0, 4).map((product, idx) => (
              <div key={product._id} className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-slate-700 transition-all">
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                  <img 
                    src={product.images[0]?.url || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-semibold text-slate-300 uppercase tracking-wider border border-slate-800">
                    {idx === 0 ? "IN STOCK" : idx === 1 ? "NEW" : "LIMITED"}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow space-y-2">
                  <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{product.description || "Next-gen processing unit"}</p>
                  <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-800/60">
                    <span className="text-white font-bold text-sm">${product.price}</span>
                    <Link to={`/product/${product._id}`} className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white flex items-center justify-center transition-all">
                      <Plus size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Static Luxury Hardware Cards matching screenshot
            <>
              <div className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl overflow-hidden p-4 flex flex-col space-y-3 group hover:border-slate-700 transition-all">
                <div className="h-44 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80" alt="Quantum Core X9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 right-2 bg-black/70 text-[9px] px-2 py-0.5 rounded text-slate-300 border border-slate-800 backdrop-blur-md">IN STOCK</span>
                </div>
                <h3 className="text-white font-bold text-sm">Quantum Core X9</h3>
                <p className="text-[11px] text-slate-400">Next-gen processing unit</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-white font-bold text-sm">$1,299</span>
                  <button className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-all"><Plus size={14}/></button>
                </div>
              </div>

              <div className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl overflow-hidden p-4 flex flex-col space-y-3 group hover:border-slate-700 transition-all">
                <div className="h-44 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" alt="Sonic Nexus Pro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 right-2 bg-black/70 text-[9px] px-2 py-0.5 rounded text-slate-300 border border-slate-800 backdrop-blur-md">NEW</span>
                </div>
                <h3 className="text-white font-bold text-sm">Sonic Nexus Pro</h3>
                <p className="text-[11px] text-slate-400">Studio-grade wireless audio</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-white font-bold text-sm">$499</span>
                  <button className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-all"><Plus size={14}/></button>
                </div>
              </div>

              <div className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl overflow-hidden p-4 flex flex-col space-y-3 group hover:border-slate-700 transition-all">
                <div className="h-44 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" alt="AeroKeys Mech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-white font-bold text-sm">AeroKeys Mech</h3>
                <p className="text-[11px] text-slate-400">Tactile precision keyboard</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-white font-bold text-sm">$249</span>
                  <button className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-all"><Plus size={14}/></button>
                </div>
              </div>

              <div className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl overflow-hidden p-4 flex flex-col space-y-3 group hover:border-slate-700 transition-all">
                <div className="h-44 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" alt="Vanguard Chrono" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 right-2 bg-black/70 text-[9px] px-2 py-0.5 rounded text-slate-300 border border-slate-800 backdrop-blur-md">LIMITED</span>
                </div>
                <h3 className="text-white font-bold text-sm">Vanguard Chrono</h3>
                <p className="text-[11px] text-slate-400">Next-gen biometric tracker</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-white font-bold text-sm">$599</span>
                  <button className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-all"><Plus size={14}/></button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============================================================
          4. EXPLORE CATEGORIES (Computers, Audio, Wearables)
      ============================================================ */}
      <section className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Explore Categories</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link to="/products" className="lg:col-span-2 group relative h-80 rounded-2xl overflow-hidden border border-slate-800 block">
            <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80" alt="Computers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
              <h3 className="text-white font-bold text-xl">Computers</h3>
              <p className="text-xs text-slate-400 max-w-sm">Build your ultimate workstation with our premium components and pre-built rigs.</p>
              <div className="text-xs font-semibold text-blue-400 flex items-center gap-1 pt-1">Shop Now <ArrowRight size={14} /></div>
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            <Link to="/products" className="group relative h-[148px] rounded-2xl overflow-hidden border border-slate-800 block">
              <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" alt="Audio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-base">Audio</h3>
                <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1 mt-0.5">Explore <ArrowRight size={12} /></div>
              </div>
            </Link>

            <Link to="/products" className="group relative h-[148px] rounded-2xl overflow-hidden border border-slate-800 block">
              <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80" alt="Wearables" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-base">Wearables</h3>
                <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1 mt-0.5">Discover <ArrowRight size={12} /></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. JOIN THE ELITE (Newsletter Subscription)
      ============================================================ */}
      <section className="max-w-5xl mx-auto bg-gradient-to-b from-[#0b1021] to-[#080c18] border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Join the Elite</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Subscribe to receive exclusive access to limited-edition drops, early product announcements, and insider tech insights.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            required
            className="bg-[#060913] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full shadow-inner"
          />
          <button 
            type="submit"
            className="py-3 px-7 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg transition-all shrink-0 w-full sm:w-auto"
          >
            Subscribe Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;