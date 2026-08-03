import { useState, useContext } from "react";
import { Search, ShoppingBag, ShoppingCart, UserPlus, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        
        {/* Left Section: Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 shrink-0">
          <ShoppingBag size={26} />
          <span>Shopping Hub</span>
        </Link>

        {/* Center Section: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-600 transition-colors duration-300">
            Products
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors duration-300">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors duration-300">
            Contact Us
          </Link>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Desktop Search Box */}
          <form className="hidden lg:flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 px-3 py-1.5 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-transparent text-sm focus:outline-none w-40 xl:w-48 text-gray-700"
            />
            <button type="submit" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Search size={16} />
            </button>
          </form>

          {/* Floating Badge Cart Element */}
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Authentication Actions */}
          {!user ? (
            <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-sm">
              <UserPlus size={16} />
              <span>Login</span>
            </Link>
          ) : (
            <button onClick={logout} className="hidden sm:inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 shadow-sm">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )} 
          
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-blue-600 md:hidden focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* --- Mobile Dropdown Menu Panel --- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 border-t border-gray-100 ${
          isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 gap-4 font-medium text-gray-700">
          
          {/* Mobile Search Bar (Only visible on mobile screens) */}
          <form className="flex lg:hidden items-center border border-gray-300 rounded-md overflow-hidden bg-white px-3 py-2 focus-within:border-blue-500 transition-colors w-full">
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-transparent text-sm focus:outline-none w-full text-gray-700"
            />
            <button type="submit" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Menu Links */}
          <Link to="/" onClick={() => setIsOpen(false)} className="py-1 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="py-1 hover:text-blue-600 transition-colors">
            Products
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-1 hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-1 hover:text-blue-600 transition-colors">
            Contact Us
          </Link>

          {/* Mobile Registration Button (Only visible on small mobile screens) */}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="sm:hidden flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors w-full shadow-sm mt-2"
          >
            <UserPlus size={16} />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;