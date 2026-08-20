import React from 'react';
import { Quote, Globe, Award, TrendingUp, MessageCircle, Sparkles } from 'lucide-react';
import graduatesImg from '../assets/images/graduates_london_success_1787218234817.jpg';

export const MotivationQuote: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-36 bg-black overflow-hidden border-y border-white/10">
      {/* Background Graphic Patterns & Atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F7B425]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Oversized English Watermark Typography */}
      <div className="absolute -bottom-10 -right-10 select-none pointer-events-none text-white/[0.03] font-black text-8xl lg:text-[180px] font-heading tracking-tighter leading-none whitespace-nowrap">
        OPPORTUNITY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Motivational Quote from X-Banner */}
          <div className="lg:col-span-7">
            
            {/* Top Quote Icon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7B425]/10 border border-[#F7B425]/30 text-[#F7B425] text-xs font-bold uppercase tracking-widest mb-6">
              <Quote className="w-3.5 h-3.5 fill-[#F7B425]" />
              <span>Official Motto</span>
            </div>

            {/* Oversized Quote Headline (Exact from X-Banner) */}
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-[1.18] mb-6 uppercase">
              “ENGLISH IS NOT JUST A LANGUAGE, BUT A{' '}
              <span className="text-[#F7B425] relative inline-block">
                PASSPORT
                {/* SVG curve line under passport */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" fill="none" stroke="#F7B425" strokeWidth="4" />
                </svg>
              </span>{' '}
              TO <span className="text-[#F7B425]">BIGGER OPPORTUNITIES</span>.”
            </blockquote>

            {/* Supporting Indonesian Sub-quote */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-8">
              “Belajar Bahasa Inggris Hari Ini, Raih Masa Depan Tanpa Batas Esok Hari.”
            </p>

            {/* 3 Core Highlights (From X-Banner right side) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <TrendingUp className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">Interactive & Fun Learning</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <MessageCircle className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">Global Communication</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <Globe className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">Brighter Future Ahead</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase with London Big Ben Graduation */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src={graduatesImg}
                  alt="Wisudawan alumni sukses meraih peluang global bersama English Join Indonesia dengan latar London Big Ben"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                
                {/* Floating Ribbon */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#F7B425] text-black text-xs font-black uppercase tracking-wider shadow-md">
                  Global Success & Achievements
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left z-10 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-xs text-[#F7B425] font-extrabold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Passport to Your Future</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Raih impian beasiswa luar negeri, wisuda tepat waktu, dan karier impian bersama bimbingan intensif English Join Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

