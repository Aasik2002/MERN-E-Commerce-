import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Go ahead and explore our top categories.</p>
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg">
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h2>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.product._id} 
              className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6"
            >
              <img src={item.product.image} alt={item.product.name} className="w-32 h-32 object-cover rounded-xl shadow-sm" />
              
              <div className="flex-1 flex flex-col justify-between text-center sm:text-left h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.product.name}</h3>
                  <p className="text-xl font-bold text-blue-600 mt-1">${item.product.price}</p>
                </div>
                
                <div className="flex items-center justify-center sm:justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 font-medium text-gray-900 min-w-[3rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="ml-4 sm:ml-0 text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax</span>
                <span className="font-medium text-gray-900">${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
