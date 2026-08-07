import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ShieldCheck, Truck, Loader2, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext'; 
import { useGetProductDetailsQuery } from '../redux/api/productApi'; // 🌟 RTK Query Import

const ProductDetail = () => {
  const { id } = useParams(); // Get the Product ID from the URL
  const { addToCart } = useContext(CartContext);
  
  // 🌟 Fetch Product Details from the Backend
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0); // State to handle the main image preview
  
  // Track the previous ID to reset state when URL changes
  const [prevId, setPrevId] = useState(id); 

  // ✅ CORRECT WAY: Reset quantity and active image when the product changes (Without useEffect)
  if (id !== prevId) {
    setPrevId(id);
    setQuantity(1);
    setActiveImage(0);
  }

  // 🌟 Loading State Design
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060913] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-semibold tracking-widest text-sm animate-pulse">
          LOADING PRODUCT DETAILS...
        </p>
      </div>
    );
  }

  // 🌟 Error State Design
  if (isError || !data?.product) {
    return (
      <div className="min-h-screen bg-[#060913] flex flex-col items-center justify-center gap-4">
        <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-xl text-center space-y-3">
          <h2 className="text-xl font-bold text-red-500">Product Not Found</h2>
          <p className="text-slate-400">The product you are looking for does not exist or has been removed.</p>
          <Link to="/products" className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const product = data.product;

  // Safely extract images (fallback to placeholder if empty)
  const productImages = product?.images?.length > 0 
    ? product.images 
    : [{ url: 'https://via.placeholder.com/1000' }];

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold tracking-wider">
          <ArrowLeft size={16} /> BACK TO STORE
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* ================= Left - Images Gallery ================= */}
        <div className="space-y-4">
          <div className="bg-[#0b1021]/80 border border-slate-800/80 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-8 relative shadow-2xl">
            <img 
              src={productImages[activeImage]?.url} 
              alt={product.name} 
              className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500"
            />
          </div>
          
          {/* Thumbnails (show only if there are multiple images) */}
          {productImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {productImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-blue-500 opacity-100' : 'border-slate-800 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= Right - Info & Actions ================= */}
        <div className="flex flex-col justify-center">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded font-bold tracking-widest uppercase">
              {product.category?.name || product.category || 'Product'}
            </span>
            
            {/* Dynamic Stock Indicator */}
            {product.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
                IN STOCK ({product.stock} left)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[11px] text-red-400 font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 
                OUT OF STOCK
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {product.name}
          </h1>
          
          {/* Rating Section */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-blue-500 text-sm">
              {'★'.repeat(Math.round(product.ratings || 0))}{'☆'.repeat(5 - Math.round(product.ratings || 0))}
            </div>
            <span className="text-sm text-slate-500">
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-400 mb-6">${product.price}</p>

          <p className="text-sm text-slate-400 leading-relaxed mb-8 whitespace-pre-line">
            {product.description}
          </p>

          {/* ================= Actions ================= */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">QUANTITY</span>
              <div className="flex items-center bg-[#0b1021] border border-slate-800 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  disabled={product.stock === 0}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} 
                  disabled={product.stock === 0 || quantity >= product.stock}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  // Logic to send product with quantity to CartContext
                  addToCart({ ...product, quantity });
                }}
                disabled={product.stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} /> 
                {product.stock <= 0 ? 'Unavailable' : 'Add to Cart'}
              </button>
              
              <button className="w-14 h-14 flex items-center justify-center rounded-xl border border-slate-700 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 transition-colors bg-[#0b1021]">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* ================= Trust Features ================= */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
            <div className="bg-[#0b1021]/50 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="text-blue-400 w-6 h-6 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">1 Year Warranty</p>
                <p className="text-[10px] text-slate-400">Official Brand Warranty</p>
              </div>
            </div>
            <div className="bg-[#0b1021]/50 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
              <Truck className="text-blue-400 w-6 h-6 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Free Shipping</p>
                <p className="text-[10px] text-slate-400">On orders over $500</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;