import React from 'react';
import { PhoneCall, Instagram, Mail, MapPin, Heart, Shield, Award, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { CONTACT_INFO, PROGRAMS } from '../data/mockData';

interface FooterProps {
  onOpenRegister: (programId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" className="mb-4" />
            
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-sm">
              English Join Indonesia adalah platform bimbingan belajar Bahasa Inggris modern yang berfokus pada pembangunan rasa percaya diri, penguasaan conversation aktif, dan peningkatan skor TOEFL untuk pendidikan dan karier masa depan.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#F7B425] text-slate-300 hover:text-black border border-white/10 hover:border-[#F7B425] flex items-center justify-center transition-all duration-200"
                aria-label="Instagram English Join Indonesia"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#F7B425] text-slate-300 hover:text-black border border-white/10 hover:border-[#F7B425] flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp English Join Indonesia"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7B425] mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#home" className="hover:text-[#F7B425] transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#F7B425] transition-colors">Kenapa Kami</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#F7B425] transition-colors">Pilihan Program</a>
              </li>
              <li>
                <a href="#learning-process" className="hover:text-[#F7B425] transition-colors">Metode Belajar</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#F7B425] transition-colors">Testimoni Alumni</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F7B425] transition-colors">Tanya Jawab (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Programs Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7B425] mb-4">
              Program Kursus
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <button
                    onClick={() => onOpenRegister(prog.id)}
                    className="text-left hover:text-[#F7B425] transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-white hover:text-[#F7B425]">{prog.title}</span>
                    <span className="text-[11px] text-slate-400">{prog.level}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7B425] mb-4">
              Kontak Resmi
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#F7B425] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">WhatsApp (Sir Alwi)</span>
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#F7B425] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Instagram</span>
                  <span>{CONTACT_INFO.instagram}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Sistem Pembelajaran</span>
                  <span>{CONTACT_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} English Join Indonesia. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indonesian Learners
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#F7B425] text-slate-300 hover:text-black transition-colors"
              aria-label="Kembali ke atas"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
