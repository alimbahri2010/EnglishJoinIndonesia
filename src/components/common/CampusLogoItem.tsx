import React, { useState } from 'react';
import { CampusLogo } from '../../types/campus';
import { School } from 'lucide-react';

interface CampusLogoItemProps {
  logo: CampusLogo;
  className?: string;
  isDark?: boolean;
}

export const CampusLogoItem: React.FC<CampusLogoItemProps> = ({
  logo,
  className = '',
  isDark = false
}) => {
  const [imgError, setImgError] = useState(false);

  // If user provided custom image (e.g. uploaded file data URL or external URL) and it didn't fail:
  if (logo.logoUrl && !imgError) {
    return (
      <div className={`flex items-center justify-center h-12 sm:h-14 px-3 py-1 ${className}`}>
        <img
          src={logo.logoUrl}
          alt={logo.name}
          className="max-h-10 sm:max-h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Otherwise render vector preset matching the reference image:
  switch (logo.svgPresetKey) {
    case 'unair':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* UNAIR Circular Seal */}
          <div className="w-10 h-10 rounded-full bg-[#0057B7] p-0.5 flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#FDB913" strokeWidth="4" fill="#0057B7" />
              <circle cx="50" cy="50" r="38" stroke="#FDB913" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Garuda / Mukti figure */}
              <path d="M50 20 L58 36 L74 38 L62 50 L66 66 L50 57 L34 66 L38 50 L26 38 L42 36 Z" fill="#FDB913" />
              <circle cx="50" cy="46" r="8" fill="#0057B7" stroke="#FDB913" strokeWidth="2" />
              <path d="M47 46 Q50 42 53 46 Q50 50 47 46" fill="#FDB913" />
            </svg>
          </div>
          {/* UNAIR Text */}
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-[#0057B7] leading-none font-sans">
              UNAIR
            </span>
            <span className="text-[9px] font-semibold text-slate-500 tracking-tight mt-0.5">
              Excellence with Morality
            </span>
          </div>
        </div>
      );

    case 'ui':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* UI Golden Makara Emblem */}
          <div className="w-9 h-10 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
              {/* Makara tree branches */}
              <path d="M50 15 C35 15 20 30 20 50 C20 75 35 95 50 105 C65 95 80 75 80 50 C80 30 65 15 50 15 Z" fill="#FBBF24" />
              <circle cx="50" cy="52" r="14" fill="#FEF08A" />
              <path d="M50 25 C45 35 45 45 50 52 C55 45 55 35 50 25 Z" fill="#D97706" />
              <path d="M25 45 Q35 55 42 52" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
              <path d="M75 45 Q65 55 58 52" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
              <path d="M30 70 Q40 75 45 65" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
              <path d="M70 70 Q60 75 55 65" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          {/* UI Text */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.25em] font-serif uppercase text-slate-800 leading-none">
              UNIVERSITAS
            </span>
            <span className="font-serif font-black text-base text-slate-900 leading-tight tracking-wide">
              INDONESIA
            </span>
            <span className="text-[8px] font-serif italic text-slate-500 leading-none mt-0.5">
              Veritas, Probitas, Iustitia | Est 1849
            </span>
          </div>
        </div>
      );

    case 'itb':
      return (
        <div className={`flex items-center justify-center h-12 select-none ${className}`}>
          {/* ITB Circular Seal with text */}
          <div className="w-12 h-12 rounded-full border-2 border-[#005696] p-0.5 flex items-center justify-center bg-white flex-shrink-0 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#005696" strokeWidth="4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#005696" strokeWidth="1" strokeDasharray="2 2" />
              <path
                id="itbTextPath"
                d="M 18,50 A 32,32 0 1,1 82,50 A 32,32 0 1,1 18,50"
                fill="none"
              />
              <text fontSize="8.5" fontWeight="bold" fill="#005696" letterSpacing="0.8">
                <textPath href="#itbTextPath" startOffset="5%">
                  INSTITUT TEKNOLOGI BANDUNG • 1920 •
                </textPath>
              </text>
              {/* Central Ganesha figure */}
              <circle cx="50" cy="50" r="18" fill="#005696" />
              <path d="M43 45 Q50 40 57 45 Q60 52 50 60 Q40 52 43 45" fill="#FFFFFF" />
              <circle cx="50" cy="46" r="3" fill="#005696" />
              <path d="M48 50 L52 50 L50 56 Z" fill="#005696" />
            </svg>
          </div>
        </div>
      );

    case 'ugm':
      return (
        <div className={`flex flex-col items-center justify-center h-12 select-none ${className}`}>
          {/* UGM Emblem Surya Alam */}
          <div className="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700" fill="currentColor">
              {/* 5-pointed lotus star */}
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M50 8 L54 36 L78 20 L62 44 L90 50 L62 56 L78 80 L54 64 L50 92 L46 64 L22 80 L38 56 L10 50 L38 44 L22 20 L46 36 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="12" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[9px] font-serif font-bold uppercase tracking-wider text-slate-800 mt-1 leading-none">
            UNIVERSITAS GADJAH MADA
          </span>
        </div>
      );

    case 'ipb':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* IPB Seal */}
          <div className="w-10 h-10 rounded-full bg-[#0D2E68] p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M50 20 C42 30 35 45 50 62 C65 45 58 30 50 20 Z" fill="#60A5FA" />
              <circle cx="50" cy="38" r="7" fill="#FFFFFF" />
              <path d="M36 48 Q44 56 50 56 Q56 56 64 48" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M38 72 L62 72 M44 78 L56 78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          {/* IPB University Wordmark */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-xl text-[#0D2E68] tracking-tight font-sans">
                IPB
              </span>
              <span className="font-serif font-bold text-base text-[#0D2E68]">
                University
              </span>
            </div>
            <span className="text-[8px] font-medium text-slate-500 tracking-wider -mt-0.5">
              — Bogor Indonesia —
            </span>
          </div>
        </div>
      );

    case 'unpad':
      return (
        <div className={`flex items-center gap-2 h-12 select-none ${className}`}>
          {/* Unpad Emblem */}
          <div className="w-8 h-9 rounded-md bg-[#D97706] p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
              <path d="M50 10 C25 20 15 45 15 75 C15 95 35 110 50 115 C65 110 85 95 85 75 C85 45 75 20 50 10 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="4" />
              <path d="M50 30 Q40 50 50 70 Q60 50 50 30" fill="#DC2626" />
              <circle cx="50" cy="85" r="8" fill="#FEF08A" />
            </svg>
          </div>
          {/* unpad text in bold lowercase */}
          <span className="font-black text-2xl tracking-tighter text-[#1E293B] font-sans">
            unpad
          </span>
        </div>
      );

    case 'its':
      return (
        <div className={`flex items-center gap-2 h-12 select-none ${className}`}>
          {/* ITS Emblem */}
          <div className="w-10 h-10 rounded-xl bg-[#004C97] p-1.5 flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <circle cx="50" cy="50" r="42" stroke="#FFFFFF" strokeWidth="4" />
              <path d="M50 25 L58 40 L72 40 L60 52 L66 68 L50 58 L34 68 L40 52 L28 40 L42 40 Z" fill="#60A5FA" />
              <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
            </svg>
          </div>
          {/* ITS Text */}
          <div className="flex flex-col">
            <span className="font-black text-lg text-[#004C97] leading-none tracking-tight">
              ITS
            </span>
            <span className="text-[7.5px] font-bold text-slate-600 leading-tight mt-0.5">
              Institut Teknologi<br />Sepuluh Nopember
            </span>
          </div>
        </div>
      );

    case 'undip':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* Undip Shield */}
          <div className="w-8 h-10 rounded-sm bg-[#111827] p-1 flex items-center justify-center flex-shrink-0 shadow-xs border border-amber-400">
            <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
              <path d="M50 10 L85 25 L85 70 C85 95 50 115 50 115 C50 115 15 95 15 70 L15 25 Z" fill="#1F2937" stroke="#F59E0B" strokeWidth="4" />
              <path d="M50 30 L60 55 L75 55 L62 65 L68 85 L50 72 L32 85 L38 65 L25 55 L40 55 Z" fill="#FBBF24" />
            </svg>
          </div>
          {/* Undip Text */}
          <div className="flex flex-col">
            <span className="font-serif font-black text-xs text-slate-900 tracking-wider uppercase leading-tight">
              UNIVERSITAS
            </span>
            <span className="font-serif font-black text-xs text-slate-900 tracking-wider uppercase leading-tight">
              DIPONEGORO
            </span>
            <span className="text-[7.5px] font-sans font-semibold text-slate-500 mt-0.5">
              The Excellent Research University
            </span>
          </div>
        </div>
      );

    case 'nottingham':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* Nottingham Castle Shield in Navy Box */}
          <div className="w-9 h-9 rounded bg-[#002F6C] flex items-center justify-center flex-shrink-0 text-white p-1">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              {/* Castle battlement and tower */}
              <rect x="25" y="35" width="50" height="50" rx="4" fill="currentColor" />
              <rect x="20" y="25" width="16" height="15" fill="currentColor" />
              <rect x="42" y="25" width="16" height="15" fill="currentColor" />
              <rect x="64" y="25" width="16" height="15" fill="currentColor" />
              <path d="M42 60 H58 V85 H42 Z" fill="#002F6C" />
            </svg>
          </div>
          {/* Nottingham Wordmark */}
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs text-[#002F6C] leading-tight">
              University of
            </span>
            <span className="font-serif font-bold text-sm text-[#002F6C] leading-tight">
              Nottingham
            </span>
            <span className="text-[7.5px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
              UK | CHINA | MALAYSIA
            </span>
          </div>
        </div>
      );

    case 'stuttgart':
      return (
        <div className={`flex items-center gap-2.5 h-12 select-none ${className}`}>
          {/* Stuttgart Dot Matrix Radial */}
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
              <circle cx="50" cy="50" r="4" />
              {/* Ring 1 */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                return <circle key={i} cx={50 + 12 * Math.cos(rad)} cy={50 + 12 * Math.sin(rad)} r="3" />;
              })}
              {/* Ring 2 */}
              {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                return <circle key={i} cx={50 + 24 * Math.cos(rad)} cy={50 + 24 * Math.sin(rad)} r="2.5" />;
              })}
              {/* Ring 3 */}
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                return <circle key={i} cx={50 + 36 * Math.cos(rad)} cy={50 + 36 * Math.sin(rad)} r="2" />;
              })}
            </svg>
          </div>
          {/* Stuttgart Text */}
          <span className="font-sans font-bold text-sm sm:text-base text-slate-800 tracking-tight">
            Universität Stuttgart
          </span>
        </div>
      );

    default:
      return (
        <div className={`flex items-center gap-2 h-12 select-none ${className}`}>
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-700">
            <School className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm text-slate-800 font-heading">
              {logo.shortName || logo.name}
            </span>
            {logo.tagline && (
              <span className="text-[9px] text-slate-500 truncate max-w-[140px]">
                {logo.tagline}
              </span>
            )}
          </div>
        </div>
      );
  }
};
