import React, { useState } from 'react';
import { Star, Quote, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import toeflSuccessImg from '../assets/images/toefl_success_cert_1787217497301.jpg';

export const StudentTestimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'TOEFL' | 'Conversation' | 'Beginner'>('All');

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.category === activeFilter);

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F7B425]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4">
            Kisah Sukses Alumni
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            Apa Kata <span className="text-[#F7B425]">Mereka?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Cerita nyata dari ratusan alumni yang telah membuktikan peningkatan kemampuan dan pencapaian target mereka.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(['All', 'TOEFL', 'Conversation', 'Beginner'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-[#F7B425] text-black shadow-md shadow-[#F7B425]/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {filter === 'All' ? 'Semua Cerita' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Student Proof Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-[#171510] via-[#1A1812] to-[#141414] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
            <img
              src={toeflSuccessImg}
              alt="Alumni holding official TOEFL certificate"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F7B425] text-black text-[11px] font-black uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Target Skor Terbukti</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              9 dari 10 Peserta Berhasil Menaikkan Skor TOEFL 80–120 Poin
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Dengan metode pembedahan rumus structure dan eliminasi cepat soal reading & listening tanpa tebak-tebakan.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
            <span className="text-3xl sm:text-4xl font-black font-heading text-[#F7B425]">580+</span>
            <span className="text-xs text-slate-400 font-medium">Rekor Skor Tertinggi Alumni</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testi) => (
            <div
              key={testi.id}
              className="group bg-[#141414] hover:bg-[#181818] border border-white/10 hover:border-[#F7B425]/40 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F7B425] text-[#F7B425]" />
                    ))}
                  </div>

                  {testi.scoreBadge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F7B425]/15 text-[#F7B425] border border-[#F7B425]/30">
                      {testi.scoreBadge}
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-slate-200 leading-relaxed italic mb-6 font-normal">
                  “{testi.text}”
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <img
                  src={testi.avatarUrl}
                  alt={testi.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#F7B425] transition-colors">
                    {testi.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {testi.role}
                  </p>
                  {testi.universityOrCompany && (
                    <p className="text-[10px] text-[#F7B425] font-semibold">
                      {testi.universityOrCompany}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
