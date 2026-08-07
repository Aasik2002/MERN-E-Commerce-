import { useState, useContext } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import { useGetAllProductsQuery } from '../redux/api/productApi'; // 🌟 RTK Query Import

const Products = () => {
  const { addToCart } = useContext(CartContext);
  
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const products = data?.products || []; 
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState('newest');

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryName = product.category?.name || product.category || '';
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(categoryName);
      
      const matchPrice = product.price <= priceRange;
      
      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; 
    });

  //  Loading State Design
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060913] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-semibold tracking-widest text-sm animate-pulse">
          INITIALIZING SECURE DATABANKS...
        </p>
      </div>
    );
  }

  // Error State Design
  if (isError) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-xl text-center space-y-3">
          <h2 className="text-xl font-bold text-red-500">System Error</h2>
          <p className="text-slate-400">Failed to load products from the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* ================= LEFT SIDEBAR (FILTERS) ================= */}
        <div className="w-full lg:w-1/4 space-y-8 bg-[#0b1021]/60 border border-slate-800/80 p-6 rounded-2xl h-fit shadow-xl">
          <h2 className="text-xl font-bold text-white tracking-wide">Filters</h2>
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 tracking-wider">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..." 
                className="w-full bg-[#060913] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 tracking-wider">Categories</label>
            <div className="space-y-2.5">
              {['Laptops', 'Audio', 'Mobile', 'Accessories'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500/50" 
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-400 tracking-wider">Price Range: up to ${priceRange}</label>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>$0</span>
              <span>$5000+</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT (PRODUCT GRID) ================= */}
        <div className="w-full lg:w-3/4 space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0b1021]/40 p-4 rounded-xl border border-slate-800/50">
            <p className="text-sm text-slate-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> products
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0b1021] border border-slate-800 px-3 py-2 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-[#0b1021]/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col group hover:border-slate-700 transition-all shadow-lg">
                  <div className="h-48 bg-slate-900 rounded-xl overflow-hidden relative mb-4">
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/600'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {product.stock <= 0 ? (
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded text-[10px] font-bold tracking-widest border backdrop-blur-md bg-red-900/80 text-red-100 border-red-700/50">
                        OUT OF STOCK
                      </span>
                    ) : product.stock < 5 ? (
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded text-[10px] font-bold tracking-widest border backdrop-blur-md bg-orange-900/80 text-orange-100 border-orange-700/50">
                        LIMITED
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-base truncate pr-2">{product.name}</h3>
                    <span className="text-blue-400 font-bold text-base">${product.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-6 flex-grow">{product.description}</p>
                  
                  <div className="flex gap-3 mt-auto">
                    <Link to={`/product/${product._id}`} className="w-1/2 flex items-center justify-center py-2.5 rounded-lg border border-slate-700 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
                      Details
                    </Link>
                    <button 
                      onClick={() => addToCart(product)} 
                      disabled={product.stock <= 0} 
                      className="w-1/2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.stock <= 0 ? 'Unavailable' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-[#0b1021]/30 border border-slate-800/50 rounded-2xl">
              <Search className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategories([]); setPriceRange(5000); }}
                className="mt-6 text-sm text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;