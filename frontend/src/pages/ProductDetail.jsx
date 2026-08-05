import { useState } from 'react';
import { ShoppingCart, Heart, Activity, Battery } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left - Images */}
        <div className="space-y-4">
          <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-8 relative">
            <img 
              src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80" 
              alt="OmniType Pro X Keyboard" 
              className="w-full object-contain filter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            />
          </div>
          <div className="flex gap-4">
            <button className="w-24 h-24 rounded-xl bg-[#0b1021] border-2 border-blue-500 overflow-hidden"><img src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=200&q=80" alt="Thumb 1" className="w-full h-full object-cover opacity-100" /></button>
            <button className="w-24 h-24 rounded-xl bg-[#0b1021] border border-slate-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity"><img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=200&q=80" alt="Thumb 2" className="w-full h-full object-cover" /></button>
            <button className="w-24 h-24 rounded-xl bg-[#0b1021] border border-slate-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity"><img src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=200&q=80" alt="Thumb 3" className="w-full h-full object-cover" /></button>
          </div>
        </div>

        {/* Right - Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded font-bold tracking-widest">NEW RELEASE</span>
            <span className="flex items-center gap-1.5 text-[11px] text-blue-400 font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> IN STOCK
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">OmniType Pro X</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-blue-500 text-sm">★★★★★</div>
            <span className="text-sm text-slate-500">(128 Reviews)</span>
          </div>

          <p className="text-3xl font-bold text-white mb-6">$249.99</p>

          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            Engineered for absolute precision, the OmniType Pro X combines aerospace-grade aluminum with our custom tactile switches for an unparalleled typing experience in a stealth, low-profile chassis.
          </p>

          {/* Actions */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">QUANTITY</span>
              <div className="flex items-center bg-[#0b1021] border border-slate-800 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">-</button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">+</button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-xl border border-slate-700 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 transition-colors bg-[#0b1021]">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
            <div className="bg-[#0b1021]/50 border border-slate-800 p-4 rounded-xl">
              <Activity className="text-blue-400 mb-2 w-5 h-5" />
              <p className="text-xs text-slate-300">0.1ms Latency</p>
            </div>
            <div className="bg-[#0b1021]/50 border border-slate-800 p-4 rounded-xl">
              <Battery className="text-blue-400 mb-2 w-5 h-5" />
              <p className="text-xs text-slate-300">200h Battery Life</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;