import ImageSlider from "../components/imageSlider";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, PackageCheck, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 space-y-20 relative overflow-hidden">
      {/* 🌟 Background Luxury Glow Elements */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================
          1. HERO SECTION (Value Proposition & Visual Anchor)
      ============================================================ */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <Sparkles size={14} /> Welcome to Shopping Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Next-Gen Tech & <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Lifestyle Essentials</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Elevate your lifestyle with our curated collection of high-performance smart gadgets, trendy apparel, and everyday luxury assets built for speed and reliability.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link 
              to="/products"
              className="flex items-center gap-2 py-3.5 px-7 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link 
              to="/about"
              className="py-3.5 px-7 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all shadow-inner cursor-pointer"
            >
              Our Mission
            </Link>
          </div>
        </motion.div>

        {/* 🌟 Image Slider Integration (Visual Anchor) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageSlider />
        </motion.div>
      </section>

      {/* ============================================================
          2. TRUST & VALUE PROPOSITION BAR (Friction Elimination)
      ============================================================ */}
      <section className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-black/30">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0 shadow-inner">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Lightning Fast Shipping</h3>
            <p className="text-xs text-slate-400 mt-0.5">Prompt nationwide dispatch</p>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-black/30">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0 shadow-inner">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Secure Transactions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Fully encrypted checkout</p>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-black/30">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0 shadow-inner">
            <PackageCheck size={22} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Verified Premium Stock</h3>
            <p className="text-xs text-slate-400 mt-0.5">Guaranteed top-tier quality</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. FEATURED CATEGORIES PREVIEW
      ============================================================ */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Curated Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Shop by Category</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 w-fit transition-colors">
            View All Products <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Smart Gadgets", items: "120+ Items", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
            { title: "Fashion Apparel", items: "85+ Items", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" },
            { title: "Smart Home", items: "64+ Items", image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80" },
            { title: "Accessories", items: "95+ Items", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
          ].map((cat, idx) => (
            <Link to="/products" key={idx} className="group relative h-64 rounded-3xl overflow-hidden border border-slate-800 shadow-xl shadow-black/40 block cursor-pointer">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                <p className="text-xs text-slate-400">{cat.items}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          4. LATEST COLLECTIONS CALLOUT SECTION
      ============================================================ */}
      <section className="max-w-4xl mx-auto text-center space-y-5 pt-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <TrendingUp size={14} /> Fresh Arrivals
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Latest <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Collections</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          We specialize in delivering innovative solutions and high-grade products designed to suit your workflow and personal style. Check out our active stock and start shopping today.
        </p>
        <div className="pt-4">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl text-sm font-semibold text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-all shadow-xl shadow-black/30 cursor-pointer"
          >
            Browse Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;