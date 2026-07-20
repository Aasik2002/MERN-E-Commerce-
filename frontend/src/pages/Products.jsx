import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DUMMY_PRODUCTS = [
  { _id: '1', name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60' },
  { _id: '2', name: 'Mechanical Keyboard', price: 149, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60' },
  { _id: '3', name: 'Gaming Mouse', price: 79, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&w=500&q=60' },
  { _id: '4', name: '4K Monitor', price: 499, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60' },
];

const Products = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {DUMMY_PRODUCTS.map((product) => (
          <motion.div 
            key={product._id} 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
          >
            <Link to={`/product/${product._id}`} className="block relative h-64 overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
              </Link>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md active:transform active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
