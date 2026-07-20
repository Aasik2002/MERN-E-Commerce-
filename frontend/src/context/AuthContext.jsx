import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Placeholder for real user fetch
          setUser({ name: 'Test User', email: 'test@example.com' });
        }
      } catch (error) {
        console.error('Error fetching user', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    // Placeholder login
    localStorage.setItem('token', 'dummy-token');
    setUser({ name: 'Test User', email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
