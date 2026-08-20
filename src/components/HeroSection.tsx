import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import heroStudentImg from '../assets/images/regenerated_image_1787222184652.png';
import { CONTACT_INFO } from '../data/mockData';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister, onOpenQuiz }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0A0A0A] flex items-center"
    >
      {/* Background Decorative Lighting & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F7B425]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#F7B425]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Hero Content directly from feed11.png */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs sm:text-sm font-semibold text-slate-200 mb-[10px] backdrop-blur-sm shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#F7B425] animate-ping" />
              <span className="text-[#F7B425] font-bold">English Join Indonesia</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">Kursus Bahasa Inggris Terpercaya</span>
            </div>

            {/* Main Headline */}
            <div className="mb-5 space-y-1">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                Masih Bingung
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight">
                <span className="text-[#F7B425]">
                  Cari Tempat Kursus Bahasa Inggris
                </span>
              </h1>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                Dari Nol ?
              </span>
            </div>

            {/* Sub-heading from feed11.png */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-[10px] font-normal">
              Atau ingin meningkatkan skor <strong className="text-[#F7B425] font-extrabold">TOEFL</strong> untuk lanjut studi, <strong className="text-white font-bold">CPNS</strong>, <strong className="text-white font-bold">BUMN</strong>, <strong className="text-white font-bold">Perusahaan Swasta</strong>, dan berbagai kebutuhan lainnya?
            </p>

            {/* Callout with Handwritten 'Yuk,' accent */}
            <div className="flex items-baseline gap-2 mb-8 text-slate-200 text-sm sm:text-base">
              <span className="font-handwriting text-3xl sm:text-4xl text-[#F7B425] font-bold -rotate-6 transform inline-block">
                Yuk,
              </span>
              <span>
                Tingkatkan kemampuan Bahasa Inggrismu bersama kami di <strong className="text-[#F7B425] font-extrabold">English Join Indonesia.</strong>
              </span>
            </div>

            {/* CTA Buttons Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-primary-cta"
                onClick={onOpenRegister}
                className="group px-8 py-4 rounded-full font-black text-base text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-xl shadow-[#F7B425]/25 hover:shadow-2xl hover:shadow-[#F7B425]/40 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-wa-cta"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full font-bold text-base text-white bg-white/5 hover:bg-white/10 border border-[#F7B425]/40 hover:border-[#F7B425] transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 text-[#F7B425]" />
                <span>Konsultasi WA (Sir Alwi)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visuals */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              
              {/* Glow backdrop ring */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#F7B425]/30 via-amber-500/15 to-transparent rounded-3xl blur-3xl opacity-80" />

              {/* Student Image Container */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden bg-transparent">
                  <img
                    src={heroStudentImg}
                    alt="Siswa English Join Indonesia belajar bahasa inggris dari nol"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                  />
                </div>

                {/* Micro Stats Strip */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-base sm:text-lg font-black text-[#F7B425]">1,500+</span>
                    <p className="text-xs font-medium text-slate-300">Alumni Terbantu</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-base sm:text-lg font-black text-[#F7B425]">4.9 / 5.0 ⭐</span>
                    <p className="text-xs font-medium text-slate-300">Rating Kepuasan</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

