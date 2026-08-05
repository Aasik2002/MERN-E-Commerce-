import { ShoppingCart, Truck, CreditCard, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-slate-800 -z-10"></div>
          
          <div className="flex flex-col items-center gap-2 bg-[#060913] px-4">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-400 bg-blue-900/20">
              <ShoppingCart size={16} />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-blue-400">CART</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-[#060913] px-4 opacity-50">
            <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-400 bg-slate-900">
              <Truck size={16} />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400">SHIPPING</span>
          </div>

          <div className="flex flex-col items-center gap-2 bg-[#060913] px-4 opacity-50">
            <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-400 bg-slate-900">
              <CreditCard size={16} />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400">PAYMENT</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-end border-b border-slate-800 pb-4 mb-6">
                <h2 className="text-xl font-bold text-white">Review Your Cart</h2>
                <span className="text-sm text-slate-400">2 Items</span>
              </div>

              {/* Item 1 */}
              <div className="flex gap-6 py-6 border-b border-slate-800/60">
                <div className="w-24 h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800 p-2">
                  <img src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80" alt="RTX 4090" className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-white">NVIDIA RTX 4090 Founders Edition</h3>
                      <p className="text-lg font-bold text-white">$1,599.00</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-slate-800 text-slate-300 text-[9px] px-2 py-0.5 rounded font-bold tracking-widest">IN STOCK</span>
                      <span className="text-xs text-slate-500">SKU: NV-4090-FE</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center bg-[#060913] border border-slate-700 rounded-lg">
                      <button className="p-2 text-slate-400 hover:text-white"><Minus size={14}/></button>
                      <span className="w-8 text-center text-sm font-semibold">1</span>
                      <button className="p-2 text-slate-400 hover:text-white"><Plus size={14}/></button>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6 pt-6">
                <div className="w-24 h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800 p-2">
                  <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=200&q=80" alt="Samsung 990 PRO" className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-white">Samsung 990 PRO 2TB PCIe 4.0</h3>
                      <p className="text-lg font-bold text-white">$189.99</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-slate-800 text-slate-300 text-[9px] px-2 py-0.5 rounded font-bold tracking-widest">IN STOCK</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center bg-[#060913] border border-slate-700 rounded-lg">
                      <button className="p-2 text-slate-400 hover:text-white"><Minus size={14}/></button>
                      <span className="w-8 text-center text-sm font-semibold">2</span>
                      <button className="p-2 text-slate-400 hover:text-white"><Plus size={14}/></button>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Locked Next Step preview */}
            <div className="bg-[#0b1021]/30 border border-slate-800/40 rounded-2xl p-6 opacity-60">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-400"><Lock size={18} /> Shipping Details (Locked)</h3>
              <p className="text-sm text-slate-500 mt-1 pl-6">Complete cart review to proceed to shipping.</p>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl p-6 sticky top-28 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 border-b border-slate-800/60 pb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal (2 items)</span>
                  <span>$1,978.98</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax</span>
                  <span>Calculated at next step</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-blue-400">$1,978.98</span>
              </div>

              <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 mb-6 flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <div className="flex flex-col items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure Checkout</span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">VISA</span>
                  <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">MC</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Simple lock icon for the locked section
const Lock = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
// Simple ArrowRight icon for the checkout button
const ArrowRight = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

export default Cart;