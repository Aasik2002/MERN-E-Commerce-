import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const DUMMY_PRODUCTS = [
  { _id: '1', name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.' },
  { _id: '2', name: 'Mechanical Keyboard', price: 149, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60', description: 'Tactile mechanical keyboard designed for gamers and typists.' },
  { _id: '3', name: 'Gaming Mouse', price: 79, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&w=500&q=60', description: 'Ergonomic gaming mouse with customizable RGB lighting and 16000 DPI sensor.' },
  { _id: '4', name: '4K Monitor', price: 499, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60', description: 'Crisp and clear 4K monitor for content creation and gaming.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const product = DUMMY_PRODUCTS.find(p => p._id === id);

  if (!product) {
    return <div className="text-center py-20 text-2xl font-bold">Product Not Found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2"
        >
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-2xl shadow-lg object-cover" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl text-blue-600 font-bold mb-6">${product.price}</p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg active:transform active:scale-95 flex-1"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
