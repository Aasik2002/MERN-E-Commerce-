import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useResetPasswordMutation } from '../redux/api/authApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // URL-ல் இருந்து Token-ஐ எடுக்கிறோம்
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { style: { background: '#0b1021', color: '#fff' } });
      return;
    }

    try {
      const result = await resetPassword({ token, passwords: { password, confirmPassword } }).unwrap();
      if (result.success) {
        toast.success("Password reset successful!", { style: { background: '#0b1021', color: '#fff' } });
        navigate('/login');
      }
    } catch (err) {
      console.error("Reset Failed:", err);
      toast.error(err?.data?.message || "Something went wrong", { style: { background: '#0b1021', color: '#fff' } });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060913] px-4 sm:px-6 lg:px-8 font-sans">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/60 my-8"
      >
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-14 h-14 rounded-2xl bg-[#060913] border border-slate-700/80 flex items-center justify-center shadow-inner mb-2"
          >
            <ShieldCheck className="h-7 w-7 text-blue-500" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Create New Password</h2>
          <p className="text-sm text-slate-400">Secure your NexDigital system access with a strong password.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500"><Lock className="h-4 w-4" /></span>
              <input type="password" required className="w-full pl-11 pr-4 py-3.5 bg-[#060913] border border-slate-800 rounded-xl text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-inner" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500"><Lock className="h-4 w-4" /></span>
              <input type="password" required className="w-full pl-11 pr-4 py-3.5 bg-[#060913] border border-slate-800 rounded-xl text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-inner" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 shadow-lg disabled:opacity-50">
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Update Security Protocol <ArrowRight className="h-4 w-4" /></>}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;