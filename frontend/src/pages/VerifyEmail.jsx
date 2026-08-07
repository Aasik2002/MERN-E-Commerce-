import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { useVerifyEmailMutation } from '../redux/api/authApi';
import toast from 'react-hot-toast'; // 🌟 Added Toast for professional alerts

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email passed from registration page
  const email = location.state?.email || '';

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email not found. Please register again.", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
      navigate('/register');
      return;
    }

    try {
      const result = await verifyEmail({ email, otp }).unwrap();
      if (result.success) {
        toast.success(result.message || 'Email verified successfully!', {
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
        });
        navigate('/'); 
      }
    } catch (err) {
      console.error("Verification Failed:", err);
      toast.error(err?.data?.message || 'Verification failed. Please check your OTP code.', {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060913] px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* 🌟 Background Decorative Glowing Blobs (NexDigital Theme) */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 🌟 Main Card with Luxury Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/60"
      >
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-14 h-14 rounded-2xl bg-[#060913] border border-slate-700/80 flex items-center justify-center shadow-inner mb-2 group"
          >
            <ShieldCheck className="h-7 w-7 text-blue-500" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Verify Your Email
          </h2>
          <p className="text-sm text-slate-400">
            We have sent a 6-digit verification code to <br />
            <span className="font-semibold text-blue-400">{email || "your email"}</span>
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Enter OTP Code</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="text"
                maxLength="6"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-[#060913] border border-slate-800 rounded-xl text-white placeholder-slate-600 text-center tracking-widest text-lg font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
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
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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