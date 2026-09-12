import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '',
  size = 'md' 
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full bg-[#272727] border border-[#484848] p-1 shadow-inner select-none transition-all duration-200 ${className}`}
    >
      {/* Option ID (Indonesia) */}
      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-xs sm:text-sm'
        } ${
          language === 'id'
            ? 'bg-[#F7B425] text-black font-black shadow-[0_2px_10px_rgba(247,180,37,0.5)] scale-100'
            : 'text-slate-200 hover:text-white font-bold opacity-90 hover:opacity-100'
        }`}
        aria-pressed={language === 'id'}
        aria-label="Bahasa Indonesia"
      >
        <span className="text-sm sm:text-base leading-none">🇮🇩</span>
        <span className="font-extrabold tracking-wide">ID</span>
      </button>

      {/* Option EN (English) */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-xs sm:text-sm'
        } ${
          language === 'en'
            ? 'bg-[#F7B425] text-black font-black shadow-[0_2px_10px_rgba(247,180,37,0.5)] scale-100'
            : 'text-slate-200 hover:text-white font-bold opacity-90 hover:opacity-100'
        }`}
        aria-pressed={language === 'en'}
        aria-label="English"
      >
        <span className="text-sm sm:text-base leading-none">🇬🇧</span>
        <span className="font-extrabold tracking-wide">EN</span>
      </button>
    </div>
  );
};
