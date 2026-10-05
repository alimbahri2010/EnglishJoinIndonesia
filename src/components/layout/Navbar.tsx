import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Logo } from '../common/Logo';
import { LanguageToggle } from '../common/LanguageToggle';
import { CONTACT_INFO } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onOpenRegister: (programId?: string) => void;
  onOpenQuiz: () => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenQuiz, onOpenLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
    { name: t.nav.home, href: '#home' },
    { name: t.nav.whyUs, href: '#why-us' },
    { name: t.nav.programs, href: '#programs' },
    { name: t.nav.learningProcess, href: '#learning-process' },
    { name: t.nav.testimonials, href: '#testimonials' },
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
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Login Entry Button with Shiny / Glossy Shimmer Hover Effect */}
            {onOpenLogin && (
              <button
                id="nav-login-button"
                onClick={onOpenLogin}
                className="relative group overflow-hidden inline-flex items-center justify-center font-black text-black bg-[#F7B425] hover:bg-[#ffbe33] rounded-full transition-all duration-300 shadow-md shadow-[#F7B425]/20 hover:shadow-xl hover:shadow-[#F7B425]/40 hover:-translate-y-0.5 active:scale-95 px-6 py-2.5 cursor-pointer"
                title="Daftar Sekarang / Masuk ke Portal Login"
              >
                <span className="relative z-10 text-sm font-black tracking-wide flex items-center gap-1.5">
                  <span>{t.nav.register}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>

                {/* Glossy / Mengkilap Shimmer Reflection Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform ease-out pointer-events-none" />

                {/* Ambient Top Glow Reflection */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            )}

            {/* Language Toggle EN - ID Button matching screenshot */}
            <div id="nav-cta-button">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Toggle */}
            <LanguageToggle size="sm" />

            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="relative group overflow-hidden px-3.5 py-1.5 text-xs font-black text-black bg-[#F7B425] rounded-full shadow-sm flex items-center gap-1"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>{t.nav.register}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform ease-out" />
              </button>
            )}

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
              {/* Language Switcher in Drawer */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                  <Globe className="w-4 h-4 text-[#F7B425]" />
                  Bahasa / Language:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLanguage('id')}
                    className={`px-3 py-1 rounded-lg font-bold text-xs ${
                      language === 'id' ? 'bg-[#F7B425] text-black' : 'text-slate-400'
                    }`}
                  >
                    🇮🇩 Indonesia
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg font-bold text-xs ${
                      language === 'en' ? 'bg-[#F7B425] text-black' : 'text-slate-400'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {onOpenLogin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="relative group overflow-hidden w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-black bg-[#F7B425] border border-[#F7B425] shadow-md shadow-[#F7B425]/25"
                >
                  <span className="relative z-10">Login (Admin &amp; Student Portal)</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform ease-out" />
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-[#F7B425]" />
                {t.nav.quickTest}
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-[#F7B425] flex items-center justify-center gap-2 shadow-lg shadow-[#F7B425]/25"
              >
                {t.nav.register}
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

