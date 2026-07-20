import { Phone, Mail, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa'
import 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* 1. Main Grid: Responsive column mapping for Mobile, Tablet, and Desktop */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand Info & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-500">
              <ShoppingBag size={24} />
              <span>Shopping Hub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              We build fast, modern e-commerce experiences with polished design, secure operations, and smooth interactions.
            </p>
          </div>

          {/* Column 2: Quick Links (New feature added for best UX) */}
          <div className="space-y-4">
            <h3 className=" font-semibold text-slate-200 tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Home <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Products <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  About Us <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Contact Us <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h3 className=" font-semibold text-slate-200 tracking-wider uppercase text-sm">Contact Us</h3>
            <p className="text-gray-400 text-sm">
              Need help or want to collaborate? Reach out to our tech agency support channel.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <a href="tel:+94759598913" className="flex items-center gap-2 hover:text-blue-400 transition-colors w-fit">
                <Phone size={16} className="text-blue-500" />
                <span>+94 759 598 913</span>
              </a>
              <a href="mailto:aasik@example.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors w-fit">
                <Mail size={16} className="text-blue-500" />
                <span>aasik@example.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: Social Connections & Community */}
          <div className="space-y-4">
            <h3 className=" font-semibold text-slate-200 tracking-wider uppercase text-sm">Follow Us</h3>
            <p className="text-gray-400 text-sm">Connect with us on social media profiles for instant tech updates.</p>
            <div className="flex items-center gap-4 pt-1">
              <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-slate-900 p-2 rounded-md border border-slate-800 hover:border-slate-700 transition-all">
                <Github className="w-5 h-5 text-gray-400 transition-colors hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-slate-900 p-2 rounded-md border border-slate-800 hover:border-slate-700 transition-all">
                <Linkedin className="w-5 h-5 text-gray-400 transition-colors hover:text-blue-500" />
              </a>
              <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-slate-900 p-2 rounded-md border border-slate-800 hover:border-slate-700 transition-all">
                <Instagram className="w-5 h-5 text-gray-400 transition-colors hover:text-pink-500" />
              </a>
              <a href="https://www.youtube.com/@your-channel" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="bg-slate-900 p-2 rounded-md border border-slate-800 hover:border-slate-700 transition-all">
                <Youtube className="w-5 h-5 text-gray-400 transition-colors hover:text-red-500" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Bottom Copyright Area: Clean alignment mapping */}
        <div className="mt-12 border-t border-slate-900 pt-8 text-xs text-gray-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © 2026 <span className="text-gray-400 font-medium">Shopping Hub</span>. All rights reserved. Designed & Developed by Aasik.
          </p>
          <p className="text-center sm:text-right text-gray-600">
            Built with React, Vite, and Tailwind CSS framework.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer