import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Key, ArrowRight } from 'lucide-react';
import { useForgotPasswordMutation } from '../redux/api/authApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // RTK Query Hook
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address", { 
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' } 
      });
      return;
    }

    try {
      // Backend API-க்கு Request அனுப்புதல்
      const result = await forgotPassword({ email }).unwrap();
      
      if (result.success) {
        toast.success(result.message || "Recovery link sent successfully!", { 
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' } 
        });
        setIsSubmitted(true); // வெற்றி பெற்றால் Success UI-ஐக் காட்டும்
      }
    } catch (err) {
      console.error("Password Reset Request Failed:", err);
      toast.error(err?.data?.message || "User not found or Server error", { 
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' } 
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/60 my-8"
      >
        {isSubmitted ? (
          /* ================= SUCCESS STATE UI ================= */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center space-y-6"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Recovery Link Sent!</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We have sent a secure password recovery protocol to <br/>
              <span className="font-semibold text-white">{email}</span>. <br/>
              Please check your inbox and spam folder.
            </p>
            <div className="pt-4">
              <Link 
                to="/login" 
                className="w-full flex items-center justify-center py-4 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
              >
                Return to Login
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ================= FORM STATE UI ================= */
          <>
            <div className="text-center space-y-4">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-14 h-14 rounded-2xl bg-[#060913] border border-slate-700/80 flex items-center justify-center shadow-inner mb-2 group"
              >
                <Key className="h-7 w-7 text-blue-500 group-hover:text-blue-400 transition-colors transform group-hover:rotate-12" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Password Recovery
              </h2>
              <p className="text-sm text-slate-400">
                Enter your registered email address to initialize the reset protocol.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-[#060913] border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Recovery Link <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-2 text-[12px] font-semibold text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-3 h-3" /> Back to System Access
                </Link>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;