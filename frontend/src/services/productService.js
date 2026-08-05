import API from '../utils/axios.js';

// Get All Products API
export const fetchAllProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};