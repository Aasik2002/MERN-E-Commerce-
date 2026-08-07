import { useState, useContext } from "react";
import { ShoppingCart, User, Menu, X, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useGetProfileQuery, useLogoutUserMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";

const Navbar = () => {
  // State for mobile menu dropdown toggle
  const [isOpen, setIsOpen] = useState(false);
  
  // Cart context to access cart items count
  const { cart } = useContext(CartContext);

  // RTK Query hooks for profile management and user logout
  const { data: userData, refetch } = useGetProfileQuery();
  const [logoutUser] = useLogoutUserMutation();

  // Extract user info and compute total quantity of cart items
  const user = userData?.user || null;
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle user logout action
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logged out successfully", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
      refetch();
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#060913]/70 backdrop-blur-md border-b border-slate-800/60 z-50 text-slate-200">
      <div className="max-w-full mx-auto flex items-center justify-between py-4 px-6 sm:px-10 lg:px-14">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          NexDigital
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Right Side Icons & Profile Actions */}
        <div className="flex items-center gap-4">
          
          {/* Shopping Cart Icon with Counter Badge */}
          <Link to="/cart" className="relative text-slate-300 hover:text-white transition-colors p-2 bg-slate-900/50 border border-slate-800/80 rounded-xl">
            <ShoppingCart size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-blue-600/50">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Conditional Rendering based on User Authentication State */}
          {!user ? (
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center gap-1.5 px-3 text-xs font-semibold">
              <User size={16} /> <span>Sign In</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              
              {/* Profile Link with Avatar Image and Name */}
              <Link to="/profile" className="flex items-center gap-2.5 bg-slate-900/50 border border-slate-800/80 px-3 py-1.5 rounded-xl hover:border-slate-700 transition-all">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold overflow-hidden text-white border border-slate-700">
                  {user?.avatar?.url ? (
                    // Appended timestamp parameter prevents caching issues when avatar is updated
                    <img src={`${user.avatar.url}?t=${new Date().getTime()}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
                  {user?.name || 'Profile'}
                </span>
              </Link>

              {/* Admin Dashboard Badge (Displays only if role is admin) */}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="hidden sm:flex items-center gap-1 text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1.5 rounded-xl font-bold">
                  <ShieldCheck size={14} /> Admin
                </Link>
              )}

              {/* Logout Action Button */}
              <button 
                onClick={handleLogout} 
                title="Logout"
                className="text-slate-300 hover:text-red-400 transition-colors p-2.5 bg-slate-900/50 border border-slate-800/80 rounded-xl cursor-pointer"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white md:hidden focus:outline-none bg-slate-900/50 border border-slate-800/80 rounded-xl"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#060913]/95 backdrop-blur-xl border-t border-slate-800 ${
          isOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 gap-3 font-medium text-slate-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-1 hover:text-white">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="py-1 hover:text-white">Products</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-1 hover:text-white">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-1 hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;