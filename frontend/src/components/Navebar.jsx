import { useState, useContext } from "react";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 text-slate-200">
      {/* max-w-full மற்றும் பக்கவாட்டு padding-ஐ அதிகரித்து அகலத்தைக் கூட்டுவது */}
      <div className="max-w-full mx-auto flex items-center justify-between py-6 px-6 sm:px-10 lg:px-14">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
          NexDigital
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <Link to="/" className="text-white font-semibold transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors p-2">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {!user ? (
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors p-2">
              <User size={20} />
            </Link>
          ) : (
            <button onClick={logout} className="text-slate-300 hover:text-white transition-colors p-2">
              <LogOut size={20} />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#060913]/95 backdrop-blur-md border-t border-slate-900 ${
          isOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 gap-3 font-medium text-slate-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-1 text-white">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="py-1">Products</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-1">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-1">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;