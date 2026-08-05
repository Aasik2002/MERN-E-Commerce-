/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('nexDigitalCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('nexDigitalCart', JSON.stringify(cart));
  }, [cart]);

  // 1. Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        toast.success(`Increased quantity for ${product.name}`, {
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
        });
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`${product.name} added to cart!`, {
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
        });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 2. Remove from Cart Function
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    toast.error('Item removed from cart', {
      style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
    });
  };

  // 3. Update Quantity Function
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};