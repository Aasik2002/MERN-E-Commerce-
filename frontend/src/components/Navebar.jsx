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
    <nav className="sticky top-0 w-full bg-blue-950/90 backdrop-blur-xl border-b border-blue-900/60 z-50 text-blue-100 shadow-xl shadow-blue-950/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        
        {/* Left Section: Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold text-white tracking-tight shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40 text-white transition-transform group-hover:scale-105">
            <ShoppingBag size={20} />
          </div>
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
            Shopping Hub
          </span>
        </Link>

        {/* Center Section: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-200/80">
          <Link to="/" className="hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-white transition-colors duration-300">
            Products
          </Link>
          <Link to="/about" className="hover:text-white transition-colors duration-300">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors duration-300">
            Contact Us
          </Link>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Desktop Search Box */}
          <form className="hidden lg:flex items-center border border-blue-800/80 rounded-xl overflow-hidden bg-blue-900/40 px-3.5 py-2 focus-within:border-cyan-400 transition-all shadow-inner">
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-transparent text-sm focus:outline-none w-36 xl:w-44 text-blue-100 placeholder-blue-300/50"
            />
            <button type="submit" className="text-blue-300/70 hover:text-white transition-colors">
              <Search size={16} />
            </button>
          </form>

          {/* Floating Badge Cart Element */}
          <Link to="/cart" className="relative text-blue-200 hover:text-white transition-colors duration-300 p-2.5 rounded-xl bg-blue-900/40 border border-blue-800/80 shadow-inner">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Authentication Actions */}
          {!user ? (
            <Link to="/login" className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold py-2.5 px-5 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30">
              <UserPlus size={16} />
              <span>Login</span>
            </Link>
          ) : (
            <button onClick={logout} className="hidden sm:inline-flex items-center gap-2 bg-blue-900/60 border border-blue-800 text-blue-200 text-sm font-semibold py-2.5 px-5 rounded-xl hover:bg-blue-800 hover:text-white transition-all shadow-inner">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )} 
          
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-blue-900/60 border border-blue-800 text-blue-200 hover:text-white md:hidden focus:outline-none transition-all shadow-inner"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* --- Mobile Dropdown Menu Panel --- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-blue-950/95 backdrop-blur-2xl border-t border-blue-900 ${
          isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 gap-4 font-medium text-blue-200">
          
          {/* Mobile Search Bar */}
          <form className="flex lg:hidden items-center border border-blue-800 rounded-xl overflow-hidden bg-blue-950 px-3.5 py-2.5 focus-within:border-cyan-400 transition-all w-full shadow-inner">
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-transparent text-sm focus:outline-none w-full text-blue-100 placeholder-blue-300/50"
            />
            <button type="submit" className="text-blue-300/70 hover:text-white transition-colors">
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Menu Links */}
          <Link to="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-white transition-colors border-b border-blue-900/50">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="py-2 hover:text-white transition-colors border-b border-blue-900/50">
            Products
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-white transition-colors border-b border-blue-900/50">
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-2 hover:text-white transition-colors border-b border-blue-900/50">
            Contact Us
          </Link>

          {/* Mobile Registration Button */}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="sm:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all w-full shadow-lg shadow-blue-600/30 mt-2"
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