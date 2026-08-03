import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw, Plus, Minus, Star } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { _id: '1', name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', description: 'High-quality wireless headphones with active noise cancellation, studio-grade acoustics, and 30-hour battery life.', rating: 4.8 },
  { _id: '2', name: 'Mechanical Keyboard', price: 149, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', description: 'Tactile mechanical keyboard designed for professional developers, gamers, and seamless typists with customizable RGB backlighting.', rating: 4.6 },
  { _id: '3', name: 'Gaming Mouse', price: 79, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&w=800&q=80', description: 'Ergonomic high-precision gaming mouse with ultra-low latency, customizable side buttons, and a 16000 DPI optical sensor.', rating: 4.9 },
  { _id: '4', name: '4K Ultra Monitor', price: 499, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', description: 'Crisp, crystal clear 4K UHD monitor built for immersive content creation, high-end design workflows, and elite PC gaming.', rating: 4.7 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const product = DUMMY_PRODUCTS.find(p => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <Link to="/products" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add product with selected quantity logic if supported by context, otherwise call normal add
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 🌟 Background Glow Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Back Link */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 shadow-inner w-fit"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        {/* Main Product Container */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/50">
          
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </motion.div>
          
          {/* Right: Product Info & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                <Star size={14} fill="currentColor" />
                <span>{product.rating} / 5.0 Rating</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{product.name}</h1>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                ${product.price}.00
              </p>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Quantity</span>
              <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950 p-1 shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold text-white text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <ShoppingBag size={18} />
                {added ? "Added to Cart! ✓" : "Add to Cart"}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-center">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="text-blue-400" size={20} />
                <span className="text-[11px] text-slate-400">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="text-blue-400" size={20} />
                <span className="text-[11px] text-slate-400">Secure Warranty</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="text-blue-400" size={20} />
                <span className="text-[11px] text-slate-400">Easy Returns</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;