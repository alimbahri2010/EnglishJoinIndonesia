import React from 'react';
import { Clock, BookOpen, Users, Award, Check, ArrowRight, Sparkles } from 'lucide-react';
import { WHY_FEATURES } from '../data/mockData';

interface WhyChooseUsProps {
  onOpenRegister: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenRegister }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0F0F0F] relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#F7B425]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with exact X-Banner Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 Pilar Utama Keunggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4 uppercase">
            Why Choose <span className="text-[#F7B425]">Us?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Alasan mengapa ribuan siswa dan alumni mempercayakan peningkatan kemampuan Bahasa Inggris dan persiapan TOEFL mereka di English Join Indonesia.
          </p>
        </div>

        {/* 4 Modern Feature Cards (X-Banner Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {WHY_FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="group relative bg-[#161616] hover:bg-[#1C1C1C] border border-white/10 hover:border-[#F7B425]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[#F7B425]/10"
            >
              {/* Card Top: Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Bold Index Number with Brand Yellow Accent */}
                  <span className="text-3xl sm:text-4xl font-black font-heading text-[#F7B425] tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity">
                    {feature.number}
                  </span>
                  
                  {/* Clean Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[#F7B425] text-[#F7B425] group-hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:border-[#F7B425] shadow-inner">
                    {getIcon(feature.iconName)}
                  </div>
                </div>

                {/* Subtitle Tag */}
                <span className="text-[11px] font-bold text-[#F7B425] uppercase tracking-wider block mb-1">
                  {feature.subtitle}
                </span>

                {/* Feature Title (Exact X-Banner) */}
                <h3 className="text-lg sm:text-xl font-black font-heading text-white mb-3 group-hover:text-[#F7B425] transition-colors leading-snug uppercase">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Card Bottom: Bullet Benefits */}
              <div className="pt-4 border-t border-white/5">
                <ul className="space-y-2">
                  {feature.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-[#F7B425] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subtle top indicator bar on hover */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#F7B425] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F7B425] hover:text-white transition-colors group"
          >
            <span>Konsultasikan Kebutuhan Belajarmu Bersama Sir Alwi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

