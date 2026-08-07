import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, CreditCard, Minus, Plus, Trash2, ShieldCheck, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  // 🌟 Bring in state and functions from CartContext
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // 🌟 Calculate the total price based on items in the cart
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Progress Steps (Visual only for now) */}
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

        {/* 🌟 If Cart is Empty */}
        {cart.length === 0 ? (
          <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl p-12 text-center shadow-xl flex flex-col items-center justify-center gap-4">
             <ShoppingCart size={48} className="text-slate-600 mb-2" />
             <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
             <p className="text-slate-400 max-w-md mx-auto">Looks like you haven't added any premium tech to your cart yet.</p>
             <Link to="/products" className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 inline-flex items-center gap-2">
               <ArrowLeft size={16} /> Continue Shopping
             </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left - Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-end border-b border-slate-800 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-white">Review Your Cart</h2>
                  <span className="text-sm text-slate-400">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
                </div>

                {/* 🌟 Dynamic Cart Items */}
                {cart.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-slate-800/60 last:border-0 last:pb-0">
                    
                    {/* Item Image */}
                    <div className="w-24 h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800 p-2 mx-auto sm:mx-0">
                      <img 
                        src={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/200'} 
                        alt={item.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                          <h3 className="text-base font-bold text-white line-clamp-2">{item.name}</h3>
                          <p className="text-lg font-bold text-white whitespace-nowrap">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 sm:mt-1">
                          <span className="bg-slate-800 text-slate-300 text-[9px] px-2 py-0.5 rounded font-bold tracking-widest">
                            {item.category?.name || 'PRODUCT'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Item Actions (Quantity & Remove) */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center bg-[#060913] border border-slate-700 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1, item.stock)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-slate-400 hover:text-white disabled:opacity-50"
                          >
                            <Minus size={14}/>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1, item.stock)}
                            disabled={item.stock && item.quantity >= item.stock}
                            className="p-2 text-slate-400 hover:text-white disabled:opacity-50"
                          >
                            <Plus size={14}/>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span>${cartTotal.toFixed(2)}</span>
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
                  <span className="text-2xl font-bold text-blue-400">${cartTotal.toFixed(2)}</span>
                </div>

                <Link 
                  to="/checkout" // Note: Ensure you have a route set up for /checkout in Phase 4
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 mb-6 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>

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
        )}
      </div>
    </div>
  );
};

export default Cart;