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

  // 1. Add to Cart Function (Updated to handle custom quantities and stock limits)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      // Get the requested quantity (default is 1 if not specified)
      const requestedQuantity = product.quantity || 1;

      if (existingItem) {
        // Calculate new quantity but ensure it doesn't exceed available stock
        let newQuantity = existingItem.quantity + requestedQuantity;
        if (product.stock && newQuantity > product.stock) {
          newQuantity = product.stock;
          toast.error(`Only ${product.stock} items available in stock`, {
            style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
          });
        } else {
          toast.success(`Updated quantity for ${product.name}`, {
            style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
          });
        }

        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        toast.success(`${product.name} added to cart!`, {
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
        });
        return [...prevCart, { ...product, quantity: requestedQuantity }];
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

  // 3. Update Quantity Function (Ensures quantity is valid and within stock)
  const updateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity < 1) return;
    
    if (stock && newQuantity > stock) {
      toast.error(`Maximum stock reached`, {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 4. Clear Cart (Useful for after a successful checkout)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('nexDigitalCart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};