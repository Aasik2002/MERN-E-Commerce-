import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { useVerifyEmailMutation } from '../redux/api/authApi';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Register 
  const email = location.state?.email || '';

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email not found. Please register again.");
      navigate('/register');
      return;
    }

    try {
      const result = await verifyEmail({ email, otp }).unwrap();
      if (result.success) {
        navigate('/'); 
      }
    } catch (err) {
      console.error("Verification Failed:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-8">
      {/* 🌟 Background Decorative Glowing Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* 🌟 Main Card with Modern Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/50"
      >
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white mb-2"
          >
            <ShieldCheck className="h-7 w-7" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Verify Your Email
          </h2>
          <p className="text-sm text-slate-400">
            We have sent a 6-digit verification code to <br />
            <span className="font-semibold text-blue-400">{email || "your email"}</span>
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-400">Enter OTP Code</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="text"
                maxLength="6"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-center tracking-widest text-lg font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verify Code <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-xs text-slate-400 hover:text-white transition-colors">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;