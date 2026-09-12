import React from 'react';
import { Quote, Globe, TrendingUp, MessageCircle, Sparkles } from 'lucide-react';
import graduatesImg from '../../assets/images/graduates_london_success_1787218234817.jpg';
import { useLanguage } from '../../context/LanguageContext';

export const MotivationQuote: React.FC = () => {
  const { tr, language } = useLanguage();

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
          
          {/* Left Column: Big Motivational Quote */}
          <div className="lg:col-span-7">
            {/* Oversized Quote Headline */}
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-[1.18] mb-6 uppercase">
              {language === 'id' ? (
                <>
                  “BAHASA INGGRIS BUKAN HANYA SEKADAR BAHASA, TAPI{' '}
                  <span className="text-[#F7B425] relative inline-block">PASPOR</span> MENUJU{' '}
                  <span className="text-[#F7B425]">PELUANG LEBIH BESAR</span>.”
                </>
              ) : (
                <>
                  “ENGLISH IS NOT JUST A LANGUAGE, BUT A{' '}
                  <span className="text-[#F7B425] relative inline-block">PASSPORT</span> TO{' '}
                  <span className="text-[#F7B425]">BIGGER OPPORTUNITIES</span>.”
                </>
              )}
            </blockquote>

            {/* Supporting Sub-quote */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-8">
              {tr(
                '“Belajar Bahasa Inggris Hari Ini, Raih Masa Depan Tanpa Batas Esok Hari.”',
                '“Learn English Today, Seize Boundless Opportunities Tomorrow.”'
              )}
            </p>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <TrendingUp className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">{tr('Pembelajaran Interaktif & Seru', 'Interactive & Fun Learning')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <MessageCircle className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">{tr('Komunikasi Skala Global', 'Global Communication')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-white bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#F7B425]/40 transition-colors">
                <Globe className="w-4 h-4 text-[#F7B425] flex-shrink-0" />
                <span className="leading-snug">{tr('Masa Depan Lebih Cerah', 'Brighter Future Ahead')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src={graduatesImg}
                  alt={tr(
                    'Wisudawan alumni sukses meraih peluang global bersama English Join Indonesia dengan latar London Big Ben',
                    'Successful alumni graduating and seizing global opportunities with English Join Indonesia'
                  )}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-left z-10 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-xs text-[#F7B425] font-extrabold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tr('Paspor Menuju Masa Depanmu', 'Passport to Your Future')}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {tr(
                      'Raih impian beasiswa luar negeri, wisuda tepat waktu, dan karier impian bersama bimbingan intensif English Join Indonesia.',
                      'Achieve international scholarship dreams, graduate on time, and build your dream career with English Join Indonesia.'
                    )}
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
