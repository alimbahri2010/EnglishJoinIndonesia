import React, { useState } from 'react';
import { Sparkles, MessageSquareText, Award, CheckCircle2, Clock, Calendar, ArrowRight, Star } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import { Program } from '../types';

interface ProgramsSectionProps {
  onOpenRegister: (programId?: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenRegister }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const getProgramIcon = (iconName: string, isFeatured?: boolean) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="programs" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F7B425]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4">
            Kurikulum Terstruktur & Teruji
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            Choose Your <span className="text-[#F7B425]">English Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Pilih program yang paling sesuai dengan kebutuhanmu, mulai dari dasar, speaking aktif, hingga persiapan ujian TOEFL.
          </p>
        </div>

        {/* 3 Modern Program Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROGRAMS.map((program) => {
            const isFeatured = program.isFeatured;

            return (
              <div
                key={program.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#1C1A14] to-[#121212] border-2 border-[#F7B425] shadow-2xl shadow-[#F7B425]/20 lg:-translate-y-3'
                    : 'bg-[#141414] border border-white/10 hover:border-white/25 hover:shadow-xl hover:shadow-black/60'
                } p-7 sm:p-8`}
              >
                {/* Featured Badge Ribbon if TOEFL */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F7B425] text-black text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span>Featured • Skor 500+ Guaranteed</span>
                  </div>
                )}

                <div>
                  {/* Card Header: Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                        isFeatured
                          ? 'bg-[#F7B425] text-black shadow-lg shadow-[#F7B425]/30'
                          : 'bg-white/5 border border-white/10 text-[#F7B425]'
                      }`}
                    >
                      {getProgramIcon(program.iconName, isFeatured)}
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isFeatured
                          ? 'bg-[#F7B425]/20 text-[#F7B425] border border-[#F7B425]/40'
                          : 'bg-white/5 text-slate-300 border border-white/10'
                      }`}
                    >
                      {program.level}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-2xl font-black font-heading text-white mb-2">
                    {program.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {program.shortDesc}
                  </p>

                  {/* Price & Meta info */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black font-heading text-white">
                        {program.priceFormatted}
                      </span>
                      {program.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {program.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#F7B425]" />
                        {program.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F7B425]" />
                        {program.sessionCount}
                      </span>
                    </div>
                  </div>

                  {/* Key Highlights List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Yang Kamu Dapatkan:
                    </p>
                    {program.highlights.slice(0, 4).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isFeatured ? 'text-[#F7B425]' : 'text-emerald-400'
                          }`}
                        />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onOpenRegister(program.id)}
                    className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      isFeatured
                        ? 'bg-[#F7B425] text-black hover:bg-[#ffbe33] shadow-[#F7B425]/30'
                        : 'bg-white text-black hover:bg-slate-200'
                    }`}
                  >
                    <span>Daftar Program Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#141414] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7B425] text-black flex items-center justify-center">
                {getProgramIcon(selectedProgram.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#F7B425] uppercase tracking-wider">
                  {selectedProgram.category}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedProgram.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedProgram.fullDesc}
            </p>

            <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Target Peserta:</span>
                <span className="text-white font-medium text-right max-w-[200px]">{selectedProgram.targetAudience}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Durasi & Sesi:</span>
                <span className="text-white font-medium">{selectedProgram.sessionCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Biaya Investasi:</span>
                <span className="text-[#F7B425] font-bold text-sm">{selectedProgram.priceFormatted}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Silabus & Fasilitas Lengkap:
              </h4>
              <ul className="space-y-2.5">
                {selectedProgram.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const id = selectedProgram.id;
                  setSelectedProgram(null);
                  onOpenRegister(id);
                }}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] transition-colors flex items-center justify-center gap-2"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
