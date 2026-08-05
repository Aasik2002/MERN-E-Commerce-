import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // 'mt-24' நீக்கப்பட்டு வெள்ளை இடைவெளி சரிசெய்யப்பட்டுள்ளது
    <footer className="bg-[#050814] text-slate-300 border-t border-slate-800/60 relative overflow-hidden font-sans">
      
      {/* 🌟 Background Subtle Tech Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-blue-600/5 blur-[100px] pointer-events-none z-0" />

      {/* Reduced padding from py-16 to py-10 for a shorter footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="text-xl font-extrabold text-white tracking-tight hover:text-blue-400 transition-colors">
              NexDigital
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Elevating technical luxury through uncompromising hardware design and performance.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 tracking-widest uppercase text-[10px]">Quick Links</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  Home <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  Products <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  About Us <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 tracking-widest uppercase text-[10px]">Global Support</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <a href="tel:+94759598913" className="flex items-center gap-2 hover:text-white transition-colors w-fit p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80 shadow-inner group">
                <Phone size={12} className="text-blue-500 group-hover:text-blue-400" />
                <span>+94 759 598 913</span>
              </a>
              <a href="mailto:ahamadaasik77@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors w-fit p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80 shadow-inner group">
                <Mail size={12} className="text-blue-500 group-hover:text-blue-400" />
                <span>ahamadaasik77@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: Social Connections */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 tracking-widest uppercase text-[10px]">Telemetry</h3>
            <div className="flex items-center gap-2.5">
              <a href="https://github.com/Aasik2002" target="_blank" rel="noopener noreferrer" className="bg-[#0b1021]/80 p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all shadow-inner">
                <Github className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a href="https://linkedin.com/in/aasik2002" target="_blank" rel="noopener noreferrer" className="bg-[#0b1021]/80 p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all shadow-inner">
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-blue-400" />
              </a>
              <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="bg-[#0b1021]/80 p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all shadow-inner">
                <Instagram className="w-4 h-4 text-slate-400 hover:text-pink-400" />
              </a>
              <a href="https://www.youtube.com/@your-channel" target="_blank" rel="noopener noreferrer" className="bg-[#0b1021]/80 p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all shadow-inner">
                <Youtube className="w-4 h-4 text-slate-400 hover:text-red-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="mt-10 border-t border-slate-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 tracking-wide font-medium">
          <p className="text-center md:text-left">
            © 2026 <span className="text-slate-300">NexDigital Elite</span>. All Systems Operational.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Protocol</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;