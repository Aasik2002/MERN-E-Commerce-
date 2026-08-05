import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, Cpu, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-slate-300 font-sans relative overflow-hidden pb-10">
      
      {/* 🌟 Tech Grid Background (Luxury Tech Aesthetic) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Ambient Blue Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 space-y-32">
        
        {/* ============================================================
            1. HERO SECTION & TEAM
        ============================================================ */}
        <section className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h4 className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">ABOUT OUR MISSION & TEAM</h4>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Systems Online
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Defining the Echelon of <br /> Performance
              </h1>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                We engineer the architecture of tomorrow. NexDigital Elite pioneers quantum-grade thermal solutions and synaptic compute frameworks for those who demand absolute precision.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-6 py-3 rounded-lg border border-slate-700 bg-[#0a0f25]/50 text-white text-sm font-semibold hover:bg-slate-800 hover:border-blue-500/50 transition-all shadow-inner">
                  Initialize Protocol
                </button>
                <button className="px-6 py-3 rounded-lg border border-slate-700 bg-transparent text-slate-300 text-sm font-semibold hover:text-white hover:border-slate-500 transition-all">
                  View Telemetry
                </button>
              </div>
            </motion.div>

            {/* Right Team List */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-4 border-l border-slate-800/80 pl-8 space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-500 tracking-wide">Meet Our Team</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-slate-200 font-semibold text-base">Dr. Evelyn Reed</h4>
                  <p className="text-slate-500 text-sm">(Founder/CTO)</p>
                </div>
                <div>
                  <h4 className="text-slate-200 font-semibold text-base">Alex Chen</h4>
                  <p className="text-slate-500 text-sm">(Lead Architect)</p>
                </div>
                <div>
                  <h4 className="text-slate-200 font-semibold text-base">Sarah Jenkins</h4>
                  <p className="text-slate-500 text-sm">(Head of Strategy)</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Values Bottom Center */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center pt-10"
          >
            <h4 className="text-slate-600 font-semibold tracking-wider text-sm mb-2">Core Values</h4>
            <p className="text-slate-400 font-medium tracking-wide">Innovation <span className="mx-2 text-slate-700">|</span> Integrity <span className="mx-2 text-slate-700">|</span> Collaboration <span className="mx-2 text-slate-700">|</span> Vision</p>
          </motion.div>
        </section>

        {/* ============================================================
            2. CORE DIRECTIVES (3 Cards)
        ============================================================ */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">Core Directives</h2>
            <p className="text-slate-400 text-sm">Precision, Power, Performance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="bg-[#0b1021]/60 border border-slate-800/80 p-8 rounded-xl backdrop-blur-sm shadow-2xl hover:border-slate-700 transition-colors">
              <Target className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Precision</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Micron-level engineering for thermal plates and routing traces. Every component is analyzed for optimal thermal dynamics and structural integrity.</p>
            </motion.div>

            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="bg-[#0b1021]/60 border border-slate-800/80 p-8 rounded-xl backdrop-blur-sm shadow-2xl hover:border-slate-700 transition-colors">
              <Zap className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Power</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Unrestricted current delivery. Our power phase designs utilize mil-spec capacitors and chokes to ensure stability under extreme computational loads.</p>
            </motion.div>

            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="bg-[#0b1021]/60 border border-slate-800/80 p-8 rounded-xl backdrop-blur-sm shadow-2xl hover:border-slate-700 transition-colors">
              <Activity className="w-8 h-8 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Performance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Zero-latency pathways. We optimize the physical distance between compute units and memory architectures to shatter theoretical limits.</p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            3. DEPLOYMENT HERITAGE (Timeline)
        ============================================================ */}
        <section className="max-w-4xl space-y-10">
          <h2 className="text-2xl font-bold text-blue-200 tracking-tight">Deployment Heritage</h2>
          
          <div className="relative border-l border-slate-800 ml-3 space-y-12 pb-4">
            
            {/* Timeline Item 1 */}
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#050814] border-2 border-slate-600" />
              <span className="text-xs font-bold text-slate-500 tracking-wider">2018</span>
              <h3 className="text-lg font-bold text-slate-200 mt-1 mb-2">Inception</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">NexDigital Elite is formed by a collective of aerospace thermal engineers and silicon architects. Initial R&D focuses on phase-change cooling for consumer applications.</p>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#050814] border-2 border-slate-600" />
              <span className="text-xs font-bold text-slate-500 tracking-wider">2021</span>
              <h3 className="text-lg font-bold text-slate-200 mt-1 mb-2">Quantum Arch Deployment</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">Launch of the proprietary Quantum Architecture. A radical redesign of motherboard trace layouts reducing signal degradation by 40%.</p>
            </motion.div>

            {/* Timeline Item 3 (Active) */}
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-xs font-bold text-slate-500 tracking-wider">2024</span>
              <div className="mt-2 bg-[#0b1021]/80 border border-slate-700/80 p-5 rounded-xl max-w-2xl shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Global Ecosystem Expansion</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Current iteration. Full integration of Synaptic Architecture across all product lines, establishing the standard for high-frequency computing worldwide.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            4. SYNAPTIC ARCHITECTURE (Split Section)
        ============================================================ */}
        <section className="bg-[#0b1021]/40 border border-slate-800/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} viewport={{ once: true }} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400 text-[10px] font-semibold tracking-widest uppercase">
                <Cpu size={12} /> Advanced R&D
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Synaptic Architecture</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Our flagship innovation, Quantum Thermal technology, redefines heat dissipation. By manipulating fluid dynamics at a micro-level, we ensure sustained boost clocks under the most grueling computational loads.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> Sub-ambient cooling potential
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> Graphene-infused thermal interfaces
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> Predictive thermal load balancing
                </li>
              </ul>
            </motion.div>

            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} viewport={{ once: true }} className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80" 
                alt="Synaptic Motherboard Architecture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-slate-800 p-3 rounded font-mono text-[10px] text-slate-300 tracking-wider space-y-1">
                <div className="flex justify-between gap-6"><span>TEMP:</span> <span className="text-white">32°C</span></div>
                <div className="flex justify-between gap-6"><span>LOAD:</span> <span className="text-blue-400">OPTIMAL</span></div>
              </div>
            </motion.div>
            
          </div>
        </section>

      </div>

      {/* ============================================================
          5. FOOTER
      ============================================================ */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-medium tracking-wide">
        <p>© 2024 NexDigital Elite. All Systems Operational.</p>
        <div className="flex items-center gap-6">
          <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Protocol</Link>
          <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-slate-300 transition-colors">API Documentation</Link>
          <Link to="#" className="hover:text-slate-300 transition-colors">Global Support</Link>
        </div>
      </footer>
    </div>
  );
};

export default About;