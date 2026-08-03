import { Phone, Mail, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 relative overflow-hidden">
      {/* 🌟 Background Subtle Glow Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* 1. Main Grid: Responsive layout matching Neumorphic containers */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand Info & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold text-white group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white transition-transform group-hover:scale-105">
                <ShoppingBag size={20} />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Shopping Hub
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              We build fast, modern e-commerce experiences with polished design, secure operations, and smooth interactions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-200 tracking-wider uppercase text-xs">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  Home <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  Products <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  About Us <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1 group w-fit">
                  Contact Us <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-200 tracking-wider uppercase text-xs">Contact Us</h3>
            <p className="text-slate-400 text-sm">
              Need help or want to collaborate? Reach out to our support channel.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <a href="tel:+94759598913" className="flex items-center gap-2.5 hover:text-white transition-colors w-fit p-2 rounded-xl bg-slate-900/60 border border-slate-800 shadow-inner">
                <Phone size={15} className="text-blue-500" />
                <span>+94 759 598 913</span>
              </a>
              <a href="mailto:ahamadaasik77@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors w-fit p-2 rounded-xl bg-slate-900/60 border border-slate-800 shadow-inner">
                <Mail size={15} className="text-blue-500" />
                <span>ahamadaasik77@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: Social Connections & Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-200 tracking-wider uppercase text-xs">Follow Us</h3>
            <p className="text-slate-400 text-sm">Connect with us on social media profiles for instant tech updates.</p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://github.com/Aasik2002" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:scale-105 transition-all shadow-inner">
                <Github className="w-5 h-5 text-slate-400 transition-colors hover:text-white" />
              </a>
              <a href="https://linkedin.com/in/aasik2002" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:scale-105 transition-all shadow-inner">
                <Linkedin className="w-5 h-5 text-slate-400 transition-colors hover:text-blue-400" />
              </a>
              <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:scale-105 transition-all shadow-inner">
                <Instagram className="w-5 h-5 text-slate-400 transition-colors hover:text-pink-400" />
              </a>
              <a href="https://www.youtube.com/@your-channel" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:scale-105 transition-all shadow-inner">
                <Youtube className="w-5 h-5 text-slate-400 transition-colors hover:text-red-400" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Bottom Copyright Area */}
        <div className="mt-12 border-t border-slate-900/80 pt-8 text-xs text-slate-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © 2026 <span className="text-slate-300 font-medium">Shopping Hub</span>. All rights reserved. Designed & Developed by Aasik.
          </p>
          <p className="text-center sm:text-right text-slate-600">
            Built with React, Vite, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer