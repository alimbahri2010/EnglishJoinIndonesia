import React from 'react';
import { Sparkles, Award, CheckCircle2, MessageCircle, ArrowRight, Star, GraduationCap } from 'lucide-react';
import { MENTORS, CONTACT_INFO } from '../data/mockData';

interface MentorsSectionProps {
  onOpenRegister: (programId?: string) => void;
}

export const MentorsSection: React.FC<MentorsSectionProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="mentors"
      className="py-24 bg-[#0F0F0F] relative overflow-hidden border-t border-white/10"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F7B425]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F7B425]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4" />
            <span>Dedicated Mentors &amp; Coaches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            Belajar Langsung Bersama <span className="text-[#F7B425]">Mentor Berpengalaman</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
            Dipandu oleh <strong className="text-white font-bold">Sir Alwi</strong> dan tim pengajar profesional yang siap membimbing langkah belajarmu dari nol hingga mahir dengan metode interaktif, ramah, dan bebas rasa takut salah.
          </p>

          {/* Highlighted Yellow-Bordered Card */}
          <div className="inline-block w-full sm:w-auto p-4 px-6 rounded-2xl bg-gradient-to-r from-[#1C1911] via-[#161616] to-[#1C1911] border-2 border-[#F7B425] shadow-lg shadow-[#F7B425]/15">
            <p className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F7B425] flex-shrink-0" />
              <span>Saatnya mempersiapkan diri dari sekarang untuk <span className="text-[#F7B425]">masa depan yang lebih cerah!</span> ⭐</span>
            </p>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="group relative bg-[#161616] hover:bg-[#1C1C1C] border border-white/10 hover:border-[#F7B425]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-2xl hover:shadow-[#F7B425]/10"
            >
              <div>
                {/* Mentor Photo Container */}
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square bg-transparent">
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Top Badge (Hidden) */}
                  {/* Experience Tag (Hidden) */}
                </div>

                {/* Mentor Header Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-2xl font-black font-heading text-white group-hover:text-[#F7B425] transition-colors">
                      {mentor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#F7B425] text-xs font-bold bg-[#F7B425]/10 px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-[#F7B425]" />
                      <span>5.0</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#F7B425] uppercase tracking-wider">
                    {mentor.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {mentor.educationOrCert}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {mentor.bio}
                </p>

                {/* Specialties Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Keahlian &amp; Fokus Bimbingan:
                  </span>
                  {mentor.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mentor Consultation Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1A1810] via-[#141414] to-[#1A1810] border border-[#F7B425]/40 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#F7B425] text-black flex items-center justify-center flex-shrink-0 font-black shadow-lg shadow-[#F7B425]/20">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black font-heading text-white">
                Bingung Menentukan Level &amp; Program yang Tepat?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal">
                Konsultasikan langsung tujuan belajarmu bersama Sir Alwi via WhatsApp. Bebas tanya materi, jadwal, hingga tips beasiswa &amp; TOEFL secara gratis!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <a
              id="mentor-direct-wa-btn"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm text-black bg-[#F7B425] hover:bg-amber-400 shadow-lg shadow-[#F7B425]/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WA Sir Alwi</span>
            </a>
            
            <button
              id="mentor-register-btn"
              onClick={() => onOpenRegister()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
