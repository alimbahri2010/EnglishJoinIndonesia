import React, { useRef } from 'react';
import { useCampusLogos } from '../../context/CampusLogosContext';
import { useLanguage } from '../../context/LanguageContext';
import { CampusLogoItem } from '../common/CampusLogoItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CampusCarouselSection: React.FC = () => {
  const { activeCampusLogos } = useCampusLogos();
  const { tr } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (activeCampusLogos.length === 0) {
    return null;
  }

  // Duplicate logos array so the marquee loops seamlessly without blank gaps
  const displayLogos = [...activeCampusLogos, ...activeCampusLogos];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="campus-alumni"
      className="relative w-full bg-[#f7b425] text-slate-900 border-y border-amber-500/30 py-7 sm:py-9 overflow-hidden select-none transition-colors"
      style={{ backgroundColor: '#f7b425' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
        {/* Header Title matching the exact user screenshot */}
        <div className="flex items-center justify-center relative">
          <p 
            className="font-bold tracking-[0.22em] text-xs sm:text-sm text-black uppercase text-center font-['Poppins',sans-serif]"
            style={{ color: '#000000', fontFamily: 'Poppins, sans-serif' }}
          >
            {tr('ALUMNI KAMI SEKARANG KULIAH DI', 'OUR ALUMNI ARE CURRENTLY STUDYING AT')}
          </p>
        </div>
      </div>

      {/* Marquee & Manual Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f7b425] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f7b425] to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none py-1.5 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="animate-marquee flex items-center gap-8 sm:gap-14 px-4">
            {displayLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/70 hover:border-[#F7B425]/70 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
                title={`${logo.name} (${logo.country})`}
              >
                <CampusLogoItem logo={logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
