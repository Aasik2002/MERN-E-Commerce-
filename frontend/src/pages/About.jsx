import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headphones, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 🌟 Background Glowing Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* 🌟 Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <Award size={14} /> About Shopping Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Redefining Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">E-Commerce Experience</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We are dedicated to bringing you the highest quality products with seamless navigation, lightning-fast performance, and secure, trustworthy transactions.
          </p>
        </motion.div>

        {/* 🌟 Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Active Customers", value: "10K+" },
            { label: "Products Listed", value: "500+" },
            { label: "Countrywide Shipping", value: "100%" },
            { label: "Customer Satisfaction", value: "99%" },
          ].map((stat, index) => (
            <div key={index} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl text-center shadow-lg shadow-black/30">
              <h3 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* 🌟 Core Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl shadow-black/40">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Secure Payments</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Shop with absolute peace of mind using our encrypted payment gateways and protected checkout procedures.
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl shadow-black/40">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Fast Delivery</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We partner with elite logistics services to ensure your orders reach your doorstep safely and swiftly.
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl shadow-black/40">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Headphones size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">24/7 Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Have questions or need assistance? Our support channel is always ready to guide you at any time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;