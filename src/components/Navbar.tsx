import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { CONTACT_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenRegister: (programId?: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Kenapa Kami', href: '#why-us' },
    { name: 'Programs', href: '#programs' },
    { name: 'Cara Belajar', href: '#learning-process' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="group focus:outline-none" aria-label="English Join Indonesia Home">
            <Logo variant="light" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#F7B425] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3.5">
            {/* Quick Assessment Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200"
              title="Cek level Bahasa Inggrismu dalam 60 detik"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F7B425]" />
              <span>Tes Level Gratis</span>
            </button>

            {/* Primary CTA Button */}
            <button
              id="nav-cta-button"
              onClick={() => onOpenRegister()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full font-bold text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-md shadow-[#F7B425]/20 hover:shadow-lg hover:shadow-[#F7B425]/30 transition-all duration-300 transform active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Daftar Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform ease-in-out" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenRegister()}
              className="px-3.5 py-1.5 text-xs font-bold text-black bg-[#F7B425] rounded-full"
            >
              Daftar
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0A0A0A] border-b border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-200 hover:text-[#F7B425] py-1 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-[#F7B425]" />
                Tes Level & Rekomendasi Program
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-[#F7B425] flex items-center justify-center gap-2 shadow-lg shadow-[#F7B425]/25"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs text-slate-400 py-1 flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F7B425]" />
                WhatsApp: {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
